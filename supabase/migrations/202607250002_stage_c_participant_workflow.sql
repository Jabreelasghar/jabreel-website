begin;

create table public.thinklab_template_versions (
  template_key text not null,
  template_version integer not null check (template_version > 0),
  primary key (template_key, template_version),
  check (length(trim(template_key)) between 3 and 100)
);

create table public.thinklab_template_moments (
  template_key text not null,
  template_version integer not null,
  moment_id text not null check (length(trim(moment_id)) between 1 and 100),
  position integer not null check (position > 0),
  locks_initial_response boolean not null default false,
  primary key (template_key, template_version, moment_id),
  unique (template_key, template_version, position),
  foreign key (template_key, template_version)
    references public.thinklab_template_versions(template_key, template_version)
    on delete restrict
);

insert into public.thinklab_template_versions (template_key, template_version)
values ('trust-lab-session-1', 1);

insert into public.thinklab_template_moments (
  template_key, template_version, moment_id, position, locks_initial_response
)
values
  ('trust-lab-session-1', 1, 'welcome', 1, false),
  ('trust-lab-session-1', 1, 'rules', 2, false),
  ('trust-lab-session-1', 1, 'trap', 3, true),
  ('trust-lab-session-1', 1, 'look-again', 4, false),
  ('trust-lab-session-1', 1, 'confidence-first', 5, true),
  ('trust-lab-session-1', 1, 'language', 6, false),
  ('trust-lab-session-1', 1, 'librarian', 7, false),
  ('trust-lab-session-1', 1, 'lecturer', 8, false),
  ('trust-lab-session-1', 1, 'context', 9, false),
  ('trust-lab-session-1', 1, 'direction', 10, false),
  ('trust-lab-session-1', 1, 'convincing', 11, false),
  ('trust-lab-session-1', 1, 'sentence', 12, false),
  ('trust-lab-session-1', 1, 'inspect', 13, false),
  ('trust-lab-session-1', 1, 'priority', 14, false),
  ('trust-lab-session-1', 1, 'three-change', 15, false),
  ('trust-lab-session-1', 1, 'defend', 16, false),
  ('trust-lab-session-1', 1, 'compare', 17, false),
  ('trust-lab-session-1', 1, 'claim', 18, false),
  ('trust-lab-session-1', 1, 'cards', 19, false),
  ('trust-lab-session-1', 1, 'bias', 20, false),
  ('trust-lab-session-1', 1, 'claims', 21, false),
  ('trust-lab-session-1', 1, 'conclusion', 22, false),
  ('trust-lab-session-1', 1, 'final-defence', 23, false),
  ('trust-lab-session-1', 1, 'reflection', 24, false);

alter table public.thinklab_sessions
  add constraint thinklab_sessions_template_version_fk
  foreign key (template_key, template_version)
  references public.thinklab_template_versions(template_key, template_version)
  on delete restrict;

alter table public.thinklab_template_versions enable row level security;
alter table public.thinklab_template_moments enable row level security;
revoke all on public.thinklab_template_versions from anon, authenticated;
revoke all on public.thinklab_template_moments from anon, authenticated;

create or replace function public.protect_thinklab_initial_locked_payload()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if old.initial_locked_payload is not null
     and (
       new.initial_locked_payload is distinct from old.initial_locked_payload
       or new.payload is distinct from old.payload
     ) then
    raise exception 'Initial locked payload is immutable'
      using errcode = '23514';
  end if;
  return new;
end;
$$;

drop trigger thinklab_responses_protect_initial_locked_payload
on public.thinklab_responses;

create trigger thinklab_responses_protect_initial_locked_payload
before update of initial_locked_payload, payload on public.thinklab_responses
for each row execute function public.protect_thinklab_initial_locked_payload();

create or replace function public.join_thinklab_session(code text, display_name text)
returns table (
  session_id uuid,
  participant_id uuid,
  template_key text,
  template_version integer,
  session_status text,
  current_moment_id text
)
language plpgsql
security definer
set search_path = ''
as $$
declare
  participant_profile_id uuid := (select auth.uid());
  normalized_code text := upper(regexp_replace(coalesce(code, ''), '[^A-Za-z0-9]', '', 'g'));
  normalized_name text := trim(coalesce(display_name, ''));
  matched_session public.thinklab_sessions%rowtype;
  matched_participant_id uuid;
  matched_participant_current_moment_id text;
begin
  if participant_profile_id is null then
    raise exception 'Session is not available' using errcode = 'P0001';
  end if;
  if length(normalized_name) not between 1 and 100 then
    raise exception 'Enter a display name' using errcode = '22023';
  end if;

  select *
  into matched_session
  from public.thinklab_sessions
  where join_code = normalized_code
    and status in ('live', 'paused')
  for update;

  if not found then
    raise exception 'Session is not available' using errcode = 'P0001';
  end if;

  insert into public.organisation_memberships (
    organisation_id, profile_id, role, status, joined_at
  )
  values (
    matched_session.organisation_id, participant_profile_id,
    'participant'::public.organisation_role,
    'active'::public.membership_status, now()
  )
  on conflict (organisation_id, profile_id, role)
  do update set
    status = 'active'::public.membership_status,
    joined_at = coalesce(public.organisation_memberships.joined_at, now());

  update public.profiles
  set display_name = normalized_name
  where id = participant_profile_id;

  insert into public.thinklab_participants (
    session_id, organisation_id, profile_id, display_name, current_moment_id
  )
  values (
    matched_session.id, matched_session.organisation_id, participant_profile_id,
    normalized_name, matched_session.current_moment_id
  )
  on conflict on constraint thinklab_participants_session_id_profile_id_key
  do update set
    display_name = excluded.display_name,
    status = case
      when public.thinklab_participants.status = 'left' then 'active'
      else public.thinklab_participants.status
    end,
    last_seen_at = now()
  returning
    thinklab_participants.id,
    thinklab_participants.current_moment_id
  into
    matched_participant_id,
    matched_participant_current_moment_id;

  return query select
    matched_session.id,
    matched_participant_id,
    matched_session.template_key,
    matched_session.template_version,
    matched_session.status,
    matched_participant_current_moment_id;
end;
$$;

create or replace function public.save_thinklab_response(
  target_session_id uuid,
  target_moment_id text,
  response_payload jsonb,
  expected_version integer
)
returns table (
  response_id uuid,
  response_version integer,
  response_status text,
  response_updated_at timestamptz
)
language plpgsql
security definer
set search_path = ''
as $$
declare
  participant_profile_id uuid := (select auth.uid());
  matched_participant_id uuid;
  matched_response_id uuid;
  matched_response_version integer;
  matched_response_status text;
  matched_response_updated_at timestamptz;
  affected_rows integer;
begin
  select participant.id
  into matched_participant_id
  from public.thinklab_participants participant
  join public.thinklab_sessions session on session.id = participant.session_id
  join public.thinklab_template_versions template
    on template.template_key = session.template_key
   and template.template_version = session.template_version
  join public.thinklab_template_moments moment
    on moment.template_key = template.template_key
   and moment.template_version = template.template_version
   and moment.moment_id = target_moment_id
  join public.thinklab_moment_releases moment_release
    on moment_release.session_id = session.id
   and moment_release.moment_id = moment.moment_id
   and moment_release.status in ('released', 'reopened')
  where participant.session_id = target_session_id
    and participant.profile_id = participant_profile_id
    and participant.status = 'active'
    and session.status in ('live', 'paused');

  if not found then
    raise exception 'Session is not available' using errcode = 'P0001';
  end if;
  if length(trim(coalesce(target_moment_id, ''))) not between 1 and 100
     or jsonb_typeof(response_payload) <> 'object' then
    raise exception 'Invalid response' using errcode = '22023';
  end if;

  if expected_version = 0 then
    insert into public.thinklab_responses (
      session_id, participant_id, moment_id, payload
    )
    values (
      target_session_id, matched_participant_id, target_moment_id, response_payload
    )
    on conflict (participant_id, moment_id) do nothing
    returning
      thinklab_responses.id,
      thinklab_responses.version,
      thinklab_responses.status,
      thinklab_responses.updated_at
    into
      matched_response_id,
      matched_response_version,
      matched_response_status,
      matched_response_updated_at;
    if not found then
      raise exception 'Response version conflict' using errcode = '40001';
    end if;
  else
    update public.thinklab_responses
    set payload = response_payload,
        version = thinklab_responses.version + 1
    where thinklab_responses.participant_id = matched_participant_id
      and thinklab_responses.moment_id = target_moment_id
      and thinklab_responses.version = expected_version
      and thinklab_responses.status in ('draft', 'reopened')
    returning
      thinklab_responses.id,
      thinklab_responses.version,
      thinklab_responses.status,
      thinklab_responses.updated_at
    into
      matched_response_id,
      matched_response_version,
      matched_response_status,
      matched_response_updated_at;
    get diagnostics affected_rows = row_count;
    if affected_rows = 0 then
      raise exception 'Response version conflict or response is locked' using errcode = '40001';
    end if;
  end if;

  update public.thinklab_participants
  set last_seen_at = now()
  where thinklab_participants.id = matched_participant_id;

  return query select
    matched_response_id,
    matched_response_version,
    matched_response_status,
    matched_response_updated_at;
end;
$$;

create or replace function public.submit_thinklab_response(
  target_session_id uuid,
  target_moment_id text,
  response_payload jsonb,
  expected_version integer
)
returns table (
  response_id uuid,
  response_version integer,
  response_status text,
  response_locked_at timestamptz
)
language plpgsql
security definer
set search_path = ''
as $$
declare
  participant_profile_id uuid := (select auth.uid());
  matched_participant_id uuid;
  matched_response_id uuid;
  matched_response_version integer;
  matched_response_status text;
  matched_response_locked_at timestamptz;
  is_locked_initial boolean := false;
begin
  select participant.id, moment.locks_initial_response
  into matched_participant_id, is_locked_initial
  from public.thinklab_participants participant
  join public.thinklab_sessions session on session.id = participant.session_id
  join public.thinklab_template_versions template
    on template.template_key = session.template_key
   and template.template_version = session.template_version
  join public.thinklab_template_moments moment
    on moment.template_key = template.template_key
   and moment.template_version = template.template_version
   and moment.moment_id = target_moment_id
  join public.thinklab_moment_releases moment_release
    on moment_release.session_id = session.id
   and moment_release.moment_id = moment.moment_id
   and moment_release.status in ('released', 'reopened')
  where participant.session_id = target_session_id
    and participant.profile_id = participant_profile_id
    and participant.status = 'active'
    and session.status in ('live', 'paused');
  if not found then
    raise exception 'Session is not available' using errcode = 'P0001';
  end if;
  if jsonb_typeof(response_payload) <> 'object' then
    raise exception 'Invalid response' using errcode = '22023';
  end if;

  if expected_version = 0 then
    insert into public.thinklab_responses (
      session_id, participant_id, moment_id, payload, initial_locked_payload,
      status, submitted_at, locked_at
    )
    values (
      target_session_id, matched_participant_id, target_moment_id, response_payload,
      case when is_locked_initial then response_payload else null end,
      case when is_locked_initial then 'locked' else 'submitted' end,
      now(), case when is_locked_initial then now() else null end
    )
    on conflict (participant_id, moment_id) do nothing
    returning
      thinklab_responses.id,
      thinklab_responses.version,
      thinklab_responses.status,
      thinklab_responses.locked_at
    into
      matched_response_id,
      matched_response_version,
      matched_response_status,
      matched_response_locked_at;
  else
    update public.thinklab_responses
    set payload = response_payload,
        initial_locked_payload = case
          when is_locked_initial then response_payload
          else thinklab_responses.initial_locked_payload
        end,
        status = case when is_locked_initial then 'locked' else 'submitted' end,
        submitted_at = now(),
        locked_at = case
          when is_locked_initial then now()
          else thinklab_responses.locked_at
        end,
        version = thinklab_responses.version + 1
    where thinklab_responses.participant_id = matched_participant_id
      and thinklab_responses.moment_id = target_moment_id
      and thinklab_responses.version = expected_version
      and thinklab_responses.initial_locked_payload is null
      and thinklab_responses.status in ('draft', 'reopened')
    returning
      thinklab_responses.id,
      thinklab_responses.version,
      thinklab_responses.status,
      thinklab_responses.locked_at
    into
      matched_response_id,
      matched_response_version,
      matched_response_status,
      matched_response_locked_at;
  end if;

  if not found then
    raise exception 'Response version conflict or response is locked' using errcode = '40001';
  end if;

  return query select
    matched_response_id,
    matched_response_version,
    matched_response_status,
    matched_response_locked_at;
end;
$$;

create or replace function public.set_thinklab_participant_current_moment(
  target_session_id uuid,
  target_moment_id text
)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  persisted_moment_id text;
begin
  update public.thinklab_participants participant
  set current_moment_id = target_moment_id,
      last_seen_at = now()
  from public.thinklab_sessions session
  join public.thinklab_template_moments moment
    on moment.template_key = session.template_key
   and moment.template_version = session.template_version
   and moment.moment_id = target_moment_id
  join public.thinklab_moment_releases moment_release
    on moment_release.session_id = session.id
   and moment_release.moment_id = moment.moment_id
   and moment_release.status in ('released', 'closed', 'reopened')
  where participant.session_id = session.id
    and session.id = target_session_id
    and session.status in ('live', 'paused')
    and participant.profile_id = (select auth.uid())
    and participant.status = 'active'
    and participant.current_moment_id is distinct from target_moment_id
  returning participant.current_moment_id into persisted_moment_id;

  if persisted_moment_id is null then
    select participant.current_moment_id
    into persisted_moment_id
    from public.thinklab_participants participant
    join public.thinklab_sessions session on session.id = participant.session_id
    join public.thinklab_template_moments moment
      on moment.template_key = session.template_key
     and moment.template_version = session.template_version
     and moment.moment_id = target_moment_id
    join public.thinklab_moment_releases moment_release
      on moment_release.session_id = session.id
     and moment_release.moment_id = moment.moment_id
     and moment_release.status in ('released', 'closed', 'reopened')
    where participant.session_id = target_session_id
      and participant.profile_id = (select auth.uid())
      and participant.status = 'active'
      and session.status in ('live', 'paused')
      and participant.current_moment_id = target_moment_id;
  end if;

  if persisted_moment_id is null then
    raise exception 'Moment is not available' using errcode = 'P0001';
  end if;
  return persisted_moment_id;
end;
$$;

create or replace function public.touch_thinklab_participant_presence(target_session_id uuid)
returns timestamptz
language plpgsql
security definer
set search_path = ''
as $$
declare
  touched_at timestamptz;
begin
  update public.thinklab_participants participant
  set last_seen_at = now()
  where participant.session_id = target_session_id
    and participant.profile_id = (select auth.uid())
    and participant.status = 'active'
    and participant.last_seen_at < now() - interval '30 seconds'
  returning participant.last_seen_at into touched_at;
  return touched_at;
end;
$$;

revoke all on function public.join_thinklab_session(text, text) from public;
revoke all on function public.save_thinklab_response(uuid, text, jsonb, integer) from public;
revoke all on function public.submit_thinklab_response(uuid, text, jsonb, integer) from public;
revoke all on function public.set_thinklab_participant_current_moment(uuid, text) from public;
revoke all on function public.touch_thinklab_participant_presence(uuid) from public;

grant execute on function public.join_thinklab_session(text, text) to authenticated;
grant execute on function public.save_thinklab_response(uuid, text, jsonb, integer) to authenticated;
grant execute on function public.submit_thinklab_response(uuid, text, jsonb, integer) to authenticated;
grant execute on function public.set_thinklab_participant_current_moment(uuid, text) to authenticated;
grant execute on function public.touch_thinklab_participant_presence(uuid) to authenticated;

comment on function public.join_thinklab_session(text, text) is
  'Atomically validates a join code and creates or recovers the authenticated participant.';
comment on function public.save_thinklab_response(uuid, text, jsonb, integer) is
  'Optimistically saves one joined participant response without direct table write access.';
comment on function public.submit_thinklab_response(uuid, text, jsonb, integer) is
  'Submits a response and immutably locks the two Session 1 initial judgements.';
comment on function public.set_thinklab_participant_current_moment(uuid, text) is
  'Persists an authenticated participant navigation change to an authorised visible moment.';
comment on function public.touch_thinklab_participant_presence(uuid) is
  'Throttled participant presence acknowledgement.';

commit;
