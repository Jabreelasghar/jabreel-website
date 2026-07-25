begin;

create extension if not exists pgtap with schema extensions;
set search_path = public, extensions;

select plan(23);

select ok(
  (select relrowsecurity from pg_class where oid = 'public.thinklab_sessions'::regclass),
  'RLS is enabled on ThinkLab sessions'
);
select ok(
  (select relrowsecurity from pg_class where oid = 'public.thinklab_participants'::regclass),
  'RLS is enabled on ThinkLab participants'
);
select ok(
  (select relrowsecurity from pg_class where oid = 'public.thinklab_moment_releases'::regclass),
  'RLS is enabled on ThinkLab moment releases'
);
select ok(
  (select relrowsecurity from pg_class where oid = 'public.thinklab_responses'::regclass),
  'RLS is enabled on ThinkLab responses'
);

insert into auth.users (
  instance_id, id, aud, role, email, encrypted_password,
  email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data
)
values
  (
    '00000000-0000-0000-0000-000000000000',
    '31000000-0000-4000-8000-000000000001',
    'authenticated', 'authenticated', 'stage-b-facilitator-a@example.edu', '',
    now(), now(), now(), '{}'::jsonb, '{"display_name":"Facilitator A"}'::jsonb
  ),
  (
    '00000000-0000-0000-0000-000000000000',
    '32000000-0000-4000-8000-000000000002',
    'authenticated', 'authenticated', 'stage-b-facilitator-b@example.edu', '',
    now(), now(), now(), '{}'::jsonb, '{"display_name":"Facilitator B"}'::jsonb
  ),
  (
    '00000000-0000-0000-0000-000000000000',
    '33000000-0000-4000-8000-000000000003',
    'authenticated', 'authenticated', 'stage-b-participant-a1@example.edu', '',
    now(), now(), now(), '{}'::jsonb, '{"display_name":"Participant A1"}'::jsonb
  ),
  (
    '00000000-0000-0000-0000-000000000000',
    '34000000-0000-4000-8000-000000000004',
    'authenticated', 'authenticated', 'stage-b-participant-a2@example.edu', '',
    now(), now(), now(), '{}'::jsonb, '{"display_name":"Participant A2"}'::jsonb
  ),
  (
    '00000000-0000-0000-0000-000000000000',
    '35000000-0000-4000-8000-000000000005',
    'authenticated', 'authenticated', 'stage-b-participant-b1@example.edu', '',
    now(), now(), now(), '{}'::jsonb, '{"display_name":"Participant B1"}'::jsonb
  );

insert into public.organisations (id, name, slug)
values
  ('31000000-0000-4000-8000-000000000101', 'Stage B Organisation A', 'stage-b-organisation-a'),
  ('32000000-0000-4000-8000-000000000202', 'Stage B Organisation B', 'stage-b-organisation-b');

insert into public.organisation_memberships (
  organisation_id, profile_id, role, status, joined_at
)
values
  (
    '31000000-0000-4000-8000-000000000101',
    '31000000-0000-4000-8000-000000000001',
    'facilitator', 'active', now()
  ),
  (
    '32000000-0000-4000-8000-000000000202',
    '32000000-0000-4000-8000-000000000002',
    'facilitator', 'active', now()
  ),
  (
    '31000000-0000-4000-8000-000000000101',
    '33000000-0000-4000-8000-000000000003',
    'participant', 'active', now()
  ),
  (
    '31000000-0000-4000-8000-000000000101',
    '34000000-0000-4000-8000-000000000004',
    'participant', 'active', now()
  ),
  (
    '32000000-0000-4000-8000-000000000202',
    '35000000-0000-4000-8000-000000000005',
    'participant', 'active', now()
  );

insert into public.thinklab_sessions (
  id, organisation_id, facilitator_id, template_key, template_version,
  join_code, delivery_mode, status, current_moment_id
)
values
  (
    '31000000-0000-4000-8000-000000000301',
    '31000000-0000-4000-8000-000000000101',
    '31000000-0000-4000-8000-000000000001',
    'trust-lab-session-1', 1, 'STAGEA1', 'individual_devices', 'live', 'trap'
  ),
  (
    '32000000-0000-4000-8000-000000000302',
    '32000000-0000-4000-8000-000000000202',
    '32000000-0000-4000-8000-000000000002',
    'trust-lab-session-1', 1, 'STAGEB1', 'live_online', 'live', 'trap'
  );

insert into public.thinklab_participants (
  id, session_id, organisation_id, profile_id, display_name, current_moment_id
)
values
  (
    '31000000-0000-4000-8000-000000000401',
    '31000000-0000-4000-8000-000000000301',
    '31000000-0000-4000-8000-000000000101',
    '33000000-0000-4000-8000-000000000003',
    'Participant A1', 'trap'
  ),
  (
    '31000000-0000-4000-8000-000000000402',
    '31000000-0000-4000-8000-000000000301',
    '31000000-0000-4000-8000-000000000101',
    '34000000-0000-4000-8000-000000000004',
    'Participant A2', 'trap'
  ),
  (
    '32000000-0000-4000-8000-000000000403',
    '32000000-0000-4000-8000-000000000302',
    '32000000-0000-4000-8000-000000000202',
    '35000000-0000-4000-8000-000000000005',
    'Participant B1', 'trap'
  );

insert into public.thinklab_moment_releases (
  session_id, moment_id, status, released_by, released_at
)
values
  (
    '31000000-0000-4000-8000-000000000301',
    'trap', 'released', '31000000-0000-4000-8000-000000000001', now()
  ),
  (
    '31000000-0000-4000-8000-000000000301',
    'look-again', 'held', '31000000-0000-4000-8000-000000000001', null
  ),
  (
    '32000000-0000-4000-8000-000000000302',
    'trap', 'released', '32000000-0000-4000-8000-000000000002', now()
  );

insert into public.thinklab_responses (
  id, session_id, participant_id, moment_id, payload,
  initial_locked_payload, status, locked_at
)
values
  (
    '31000000-0000-4000-8000-000000000501',
    '31000000-0000-4000-8000-000000000301',
    '31000000-0000-4000-8000-000000000401',
    'trap', '{"choice":"Response A"}',
    '{"choice":"Response A"}', 'locked', now()
  ),
  (
    '31000000-0000-4000-8000-000000000502',
    '31000000-0000-4000-8000-000000000301',
    '31000000-0000-4000-8000-000000000402',
    'trap', '{"choice":"Response B"}',
    '{"choice":"Response B"}', 'locked', now()
  ),
  (
    '32000000-0000-4000-8000-000000000503',
    '32000000-0000-4000-8000-000000000302',
    '32000000-0000-4000-8000-000000000403',
    'trap', '{"choice":"Response C"}',
    '{"choice":"Response C"}', 'locked', now()
  );

select throws_ok(
  $$
    insert into public.thinklab_participants (
      session_id, organisation_id, profile_id, display_name, current_moment_id
    )
    values (
      '31000000-0000-4000-8000-000000000301',
      '32000000-0000-4000-8000-000000000202',
      '35000000-0000-4000-8000-000000000005',
      'Wrong organisation', 'trap'
    )
  $$,
  '23503',
  null,
  'Participant organisation must match the session organisation'
);

select throws_ok(
  $$
    insert into public.thinklab_participants (
      session_id, organisation_id, profile_id, display_name, current_moment_id
    )
    values (
      '31000000-0000-4000-8000-000000000301',
      '31000000-0000-4000-8000-000000000101',
      '33000000-0000-4000-8000-000000000003',
      'Duplicate participant', 'trap'
    )
  $$,
  '23505',
  null,
  'A profile can participate only once per session'
);

select throws_ok(
  $$
    insert into public.thinklab_moment_releases (session_id, moment_id, status)
    values (
      '31000000-0000-4000-8000-000000000301',
      'trap', 'released'
    )
  $$,
  '23505',
  null,
  'A moment can have only one release record per session'
);

select throws_ok(
  $$
    insert into public.thinklab_responses (
      session_id, participant_id, moment_id, payload
    )
    values (
      '31000000-0000-4000-8000-000000000301',
      '31000000-0000-4000-8000-000000000401',
      'trap', '{"choice":"Duplicate"}'
    )
  $$,
  '23505',
  null,
  'A participant can have only one response per moment'
);

select throws_ok(
  $$
    update public.thinklab_responses
    set initial_locked_payload = '{"choice":"Overwritten"}'
    where id = '31000000-0000-4000-8000-000000000501'
  $$,
  '23514',
  'Initial locked payload is immutable',
  'Initial locked payload cannot be overwritten'
);

set local role authenticated;
select set_config(
  'request.jwt.claims',
  '{"sub":"31000000-0000-4000-8000-000000000001","role":"authenticated"}',
  true
);

select results_eq(
  'select count(*)::bigint from public.thinklab_sessions',
  array[1::bigint],
  'Facilitator A sees only Organisation A sessions'
);
select results_eq(
  $$select join_code from public.thinklab_sessions order by join_code$$,
  $$values ('STAGEA1'::text)$$,
  'Facilitator A cannot access Organisation B session data'
);
select is_empty(
  $$
    update public.thinklab_sessions
    set status = 'paused'
    where id = '32000000-0000-4000-8000-000000000302'
    returning id
  $$,
  'Facilitator A cannot update Organisation B sessions'
);
select results_eq(
  'select count(*)::bigint from public.thinklab_participants',
  array[2::bigint],
  'Facilitator A sees participants only in their session'
);
select results_eq(
  'select count(*)::bigint from public.thinklab_responses',
  array[2::bigint],
  'Facilitator A sees responses only in their session'
);
select results_eq(
  $$
    update public.thinklab_sessions
    set status = 'paused'
    where id = '31000000-0000-4000-8000-000000000301'
    returning status
  $$,
  $$values ('paused'::text)$$,
  'Facilitator A can update their own session'
);

reset role;
set local role authenticated;
select set_config(
  'request.jwt.claims',
  '{"sub":"33000000-0000-4000-8000-000000000003","role":"authenticated"}',
  true
);

select results_eq(
  'select count(*)::bigint from public.thinklab_sessions',
  array[1::bigint],
  'Participant sees only their joined session'
);
select results_eq(
  'select count(*)::bigint from public.thinklab_participants',
  array[1::bigint],
  'Participant cannot read another participant'
);
select results_eq(
  'select count(*)::bigint from public.thinklab_responses',
  array[1::bigint],
  'Participant cannot read another participant response'
);
select results_eq(
  'select count(*)::bigint from public.thinklab_moment_releases',
  array[1::bigint],
  'Participant can see released moments but not held moments'
);
select is_empty(
  $$
    update public.thinklab_sessions
    set status = 'ended'
    where id = '31000000-0000-4000-8000-000000000301'
    returning id
  $$,
  'Participant cannot update facilitator-controlled session state'
);
select throws_ok(
  $$
    update public.thinklab_moment_releases
    set status = 'released'
    where session_id = '31000000-0000-4000-8000-000000000301'
      and moment_id = 'look-again'
  $$,
  '42501',
  'permission denied for table thinklab_moment_releases',
  'Participant cannot release moments'
);
select is_empty(
  $$
    select id
    from public.thinklab_responses
    where participant_id = '31000000-0000-4000-8000-000000000402'
  $$,
  'Participant A1 cannot query Participant A2 response directly'
);
select is_empty(
  $$
    select id
    from public.thinklab_sessions
    where id = '32000000-0000-4000-8000-000000000302'
  $$,
  'Participant cannot query a session in another organisation'
);

select * from finish();
rollback;
