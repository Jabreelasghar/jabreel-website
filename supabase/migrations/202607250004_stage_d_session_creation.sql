begin;

create or replace function public.create_thinklab_session(
  p_organisation_id uuid
)
returns table (
  session_id uuid,
  join_code text
)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_facilitator_id uuid := (select auth.uid());
  v_session_id uuid;
  v_join_code text;
  v_random_bytes bytea;
  v_attempt integer := 0;
  v_alphabet constant text := 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
begin
  if v_facilitator_id is null then
    raise exception 'Authentication required'
      using errcode = '28000';
  end if;

  if not exists (
    select 1
    from public.organisation_memberships membership
    join public.organisations organisation
      on organisation.id = membership.organisation_id
    where membership.organisation_id = p_organisation_id
      and membership.profile_id = v_facilitator_id
      and membership.status = 'active'
      and membership.role in ('facilitator', 'organisation_administrator')
      and organisation.status = 'active'
  ) then
    raise exception 'Organisation is not available'
      using errcode = '42501';
  end if;

  perform pg_catalog.pg_advisory_xact_lock(
    pg_catalog.hashtextextended(v_facilitator_id::text, 0)
  );

  if exists (
    select 1
    from public.thinklab_sessions session
    where session.facilitator_id = v_facilitator_id
      and session.status in ('live', 'paused')
  ) then
    raise exception 'An active session already exists'
      using errcode = 'P0001';
  end if;

  loop
    v_attempt := v_attempt + 1;
    v_random_bytes := extensions.gen_random_bytes(6);
    v_join_code := '';

    for v_index in 0..5 loop
      v_join_code := v_join_code || substr(
        v_alphabet,
        (pg_catalog.get_byte(v_random_bytes, v_index) % 36) + 1,
        1
      );
    end loop;

    begin
      insert into public.thinklab_sessions (
        organisation_id,
        facilitator_id,
        template_key,
        template_version,
        join_code,
        delivery_mode,
        status,
        current_moment_id,
        started_at
      )
      values (
        p_organisation_id,
        v_facilitator_id,
        'trust-lab-session-1',
        1,
        v_join_code,
        'individual_devices',
        'live',
        'welcome',
        now()
      )
      returning id into v_session_id;

      exit;
    exception
      when unique_violation then
        if v_attempt >= 10 then
          raise exception 'A unique join code could not be generated'
            using errcode = '23505';
        end if;
    end;
  end loop;

  insert into public.thinklab_moment_releases (
    session_id,
    moment_id,
    status,
    released_by,
    released_at
  )
  values (
    v_session_id,
    'welcome',
    'released',
    v_facilitator_id,
    now()
  );

  return query
  select v_session_id, v_join_code;
end;
$$;

revoke all on function public.create_thinklab_session(uuid) from public;
revoke all on function public.create_thinklab_session(uuid) from anon;
grant execute on function public.create_thinklab_session(uuid) to authenticated;

commit;
