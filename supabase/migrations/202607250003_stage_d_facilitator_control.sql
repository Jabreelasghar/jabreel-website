begin;

alter table public.thinklab_template_moments
  add column max_choices integer check (max_choices is null or max_choices > 0),
  add column locks_at_choice_limit boolean not null default false;

update public.thinklab_template_moments
set max_choices = 2,
    locks_at_choice_limit = true,
    locks_initial_response = true
where template_key = 'trust-lab-session-1'
  and template_version = 1
  and moment_id = 'cards';

create or replace function public.enforce_thinklab_response_choice_limit()
returns trigger
language plpgsql
set search_path = ''
as $$
declare
  configured_max_choices integer;
  locks_at_limit boolean;
  payload_choice_count integer := 0;
  locked_choice_count integer := 0;
begin
  select
    template_moment.max_choices,
    template_moment.locks_at_choice_limit
  into
    configured_max_choices,
    locks_at_limit
  from public.thinklab_sessions session
  join public.thinklab_template_moments template_moment
    on template_moment.template_key = session.template_key
   and template_moment.template_version = session.template_version
   and template_moment.moment_id = new.moment_id
  where session.id = new.session_id;

  if configured_max_choices is null then
    return new;
  end if;

  if new.payload ? 'choices' then
    if jsonb_typeof(new.payload -> 'choices') <> 'array' then
      raise exception 'Response choices must be an array'
        using errcode = '22023';
    end if;
    payload_choice_count := jsonb_array_length(new.payload -> 'choices');
  end if;

  if payload_choice_count > configured_max_choices then
    raise exception 'Response exceeds the permitted choice limit'
      using errcode = '23514';
  end if;

  if locks_at_limit and new.initial_locked_payload is not null then
    if jsonb_typeof(new.initial_locked_payload -> 'choices') = 'array' then
      locked_choice_count := jsonb_array_length(new.initial_locked_payload -> 'choices');
    end if;
    if locked_choice_count <> configured_max_choices then
      raise exception 'Select exactly the required number of choices before locking'
        using errcode = '23514';
    end if;
  end if;

  return new;
end;
$$;

create trigger thinklab_responses_enforce_choice_limit
before insert or update of payload, initial_locked_payload
on public.thinklab_responses
for each row execute function public.enforce_thinklab_response_choice_limit();

create or replace function public.advance_thinklab_session(target_session_id uuid)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_moment text;
  next_moment text;
begin
  select session.current_moment_id
  into current_moment
  from public.thinklab_sessions session
  where session.id = target_session_id
    and session.status = 'live'
    and public.can_facilitate_thinklab_session(session.id)
  for update;

  if current_moment is null then
    raise exception 'Session cannot advance' using errcode = 'P0001';
  end if;

  select next_template_moment.moment_id
  into next_moment
  from public.thinklab_sessions session
  join public.thinklab_template_moments current_template_moment
    on current_template_moment.template_key = session.template_key
   and current_template_moment.template_version = session.template_version
   and current_template_moment.moment_id = current_moment
  join public.thinklab_template_moments next_template_moment
    on next_template_moment.template_key = current_template_moment.template_key
   and next_template_moment.template_version = current_template_moment.template_version
   and next_template_moment.position = current_template_moment.position + 1
  where session.id = target_session_id;

  if next_moment is null then
    raise exception 'No next moment is available' using errcode = '22023';
  end if;

  update public.thinklab_moment_releases moment_release
  set status = 'closed'
  where moment_release.session_id = target_session_id
    and moment_release.moment_id = current_moment
    and moment_release.status in ('released', 'reopened');

  insert into public.thinklab_moment_releases (
    session_id, moment_id, status, released_by, released_at
  )
  values (
    target_session_id, next_moment, 'released', (select auth.uid()), now()
  )
  on conflict (session_id, moment_id)
  do update set
    status = 'released',
    released_by = excluded.released_by,
    released_at = now();

  update public.thinklab_sessions session
  set current_moment_id = next_moment
  where session.id = target_session_id;

  update public.thinklab_participants participant
  set current_moment_id = next_moment,
      last_seen_at = now()
  where participant.session_id = target_session_id
    and participant.status = 'active';

  return next_moment;
end;
$$;

create or replace function public.return_to_previous_thinklab_moment(target_session_id uuid)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_moment text;
  previous_moment text;
begin
  select session.current_moment_id
  into current_moment
  from public.thinklab_sessions session
  where session.id = target_session_id
    and session.status in ('live', 'paused')
    and public.can_facilitate_thinklab_session(session.id)
  for update;

  if current_moment is null then
    raise exception 'Session cannot move backwards' using errcode = 'P0001';
  end if;

  select previous_template_moment.moment_id
  into previous_moment
  from public.thinklab_sessions session
  join public.thinklab_template_moments current_template_moment
    on current_template_moment.template_key = session.template_key
   and current_template_moment.template_version = session.template_version
   and current_template_moment.moment_id = current_moment
  join public.thinklab_template_moments previous_template_moment
    on previous_template_moment.template_key = current_template_moment.template_key
   and previous_template_moment.template_version = current_template_moment.template_version
   and previous_template_moment.position = current_template_moment.position - 1
  where session.id = target_session_id;

  if previous_moment is null then
    raise exception 'No previous moment is available' using errcode = '22023';
  end if;

  insert into public.thinklab_moment_releases (
    session_id, moment_id, status, released_by, released_at, reopened_at
  )
  values (
    target_session_id, previous_moment, 'reopened', (select auth.uid()), now(), now()
  )
  on conflict (session_id, moment_id)
  do update set
    status = 'reopened',
    released_by = excluded.released_by,
    reopened_at = now();

  update public.thinklab_sessions session
  set current_moment_id = previous_moment
  where session.id = target_session_id;

  update public.thinklab_participants participant
  set current_moment_id = previous_moment,
      last_seen_at = now()
  where participant.session_id = target_session_id
    and participant.status = 'active';

  return previous_moment;
end;
$$;

create or replace function public.release_current_thinklab_moment(target_session_id uuid)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_moment text;
begin
  select session.current_moment_id
  into current_moment
  from public.thinklab_sessions session
  join public.thinklab_template_moments template_moment
    on template_moment.template_key = session.template_key
   and template_moment.template_version = session.template_version
   and template_moment.moment_id = session.current_moment_id
  where session.id = target_session_id
    and session.status in ('live', 'paused')
    and public.can_facilitate_thinklab_session(session.id)
  for update of session;

  if current_moment is null then
    raise exception 'Moment cannot be released' using errcode = 'P0001';
  end if;

  insert into public.thinklab_moment_releases (
    session_id, moment_id, status, released_by, released_at
  )
  values (
    target_session_id, current_moment, 'released', (select auth.uid()), now()
  )
  on conflict (session_id, moment_id)
  do update set
    status = 'released',
    released_by = excluded.released_by,
    released_at = now();

  update public.thinklab_participants participant
  set current_moment_id = current_moment,
      last_seen_at = now()
  where participant.session_id = target_session_id
    and participant.status = 'active';

  return current_moment;
end;
$$;

create or replace function public.close_current_thinklab_moment(target_session_id uuid)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_moment text;
begin
  select session.current_moment_id
  into current_moment
  from public.thinklab_sessions session
  where session.id = target_session_id
    and session.status in ('live', 'paused')
    and public.can_facilitate_thinklab_session(session.id)
  for update;

  if current_moment is null then
    raise exception 'Moment cannot be closed' using errcode = 'P0001';
  end if;

  update public.thinklab_moment_releases moment_release
  set status = 'closed'
  where moment_release.session_id = target_session_id
    and moment_release.moment_id = current_moment
    and moment_release.status in ('released', 'reopened');

  if not found then
    raise exception 'Moment is not open' using errcode = '22023';
  end if;

  return current_moment;
end;
$$;

create or replace function public.pause_thinklab_session(target_session_id uuid)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  persisted_status text;
begin
  update public.thinklab_sessions session
  set status = 'paused'
  where session.id = target_session_id
    and session.status = 'live'
    and public.can_facilitate_thinklab_session(session.id)
  returning session.status into persisted_status;

  if persisted_status is null then
    raise exception 'Session cannot be paused' using errcode = 'P0001';
  end if;
  return persisted_status;
end;
$$;

create or replace function public.resume_thinklab_session(target_session_id uuid)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  persisted_status text;
begin
  update public.thinklab_sessions session
  set status = 'live'
  where session.id = target_session_id
    and session.status = 'paused'
    and public.can_facilitate_thinklab_session(session.id)
  returning session.status into persisted_status;

  if persisted_status is null then
    raise exception 'Session cannot be resumed' using errcode = 'P0001';
  end if;
  return persisted_status;
end;
$$;

create or replace function public.end_thinklab_session(target_session_id uuid)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  persisted_status text;
begin
  update public.thinklab_sessions session
  set status = 'ended',
      ended_at = now()
  where session.id = target_session_id
    and session.status in ('live', 'paused')
    and public.can_facilitate_thinklab_session(session.id)
  returning session.status into persisted_status;

  if persisted_status is null then
    raise exception 'Session cannot be ended' using errcode = 'P0001';
  end if;

  update public.thinklab_moment_releases moment_release
  set status = 'closed'
  where moment_release.session_id = target_session_id
    and moment_release.status in ('released', 'reopened');

  update public.thinklab_participants participant
  set status = 'completed',
      last_seen_at = now()
  where participant.session_id = target_session_id
    and participant.status = 'active';

  return persisted_status;
end;
$$;

revoke all on function public.enforce_thinklab_response_choice_limit() from public;
revoke all on function public.advance_thinklab_session(uuid) from public;
revoke all on function public.return_to_previous_thinklab_moment(uuid) from public;
revoke all on function public.release_current_thinklab_moment(uuid) from public;
revoke all on function public.close_current_thinklab_moment(uuid) from public;
revoke all on function public.pause_thinklab_session(uuid) from public;
revoke all on function public.resume_thinklab_session(uuid) from public;
revoke all on function public.end_thinklab_session(uuid) from public;

grant execute on function public.advance_thinklab_session(uuid) to authenticated;
grant execute on function public.return_to_previous_thinklab_moment(uuid) to authenticated;
grant execute on function public.release_current_thinklab_moment(uuid) to authenticated;
grant execute on function public.close_current_thinklab_moment(uuid) to authenticated;
grant execute on function public.pause_thinklab_session(uuid) to authenticated;
grant execute on function public.resume_thinklab_session(uuid) to authenticated;
grant execute on function public.end_thinklab_session(uuid) to authenticated;

comment on function public.advance_thinklab_session(uuid) is
  'Advances an authorised live facilitator session by exactly one registered template moment.';
comment on function public.return_to_previous_thinklab_moment(uuid) is
  'Returns an authorised facilitator session to exactly the preceding registered moment.';
comment on function public.release_current_thinklab_moment(uuid) is
  'Releases the registered current moment without accepting an arbitrary state update.';
comment on function public.close_current_thinklab_moment(uuid) is
  'Closes the currently released moment so ordinary participant writes stop.';
comment on function public.pause_thinklab_session(uuid) is
  'Pauses an authorised live facilitator session.';
comment on function public.resume_thinklab_session(uuid) is
  'Resumes an authorised paused facilitator session.';
comment on function public.end_thinklab_session(uuid) is
  'Irreversibly ends an authorised active facilitator session and completes its participants.';

commit;
