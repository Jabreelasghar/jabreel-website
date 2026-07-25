begin;

create extension if not exists pgtap with schema extensions;
set search_path = public, extensions;
select plan(25);

insert into auth.users (
  instance_id, id, aud, role, email, encrypted_password,
  email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data
)
values
  ('00000000-0000-0000-0000-000000000000', '41000000-0000-4000-8000-000000000001',
   'authenticated', 'authenticated', 'stage-c-facilitator@example.edu', '', now(), now(), now(), '{}', '{"display_name":"Facilitator"}'),
  ('00000000-0000-0000-0000-000000000000', '41000000-0000-4000-8000-000000000002',
   'authenticated', 'authenticated', null, '', null, now(), now(), '{"provider":"anonymous"}', '{"display_name":"Anonymous 1"}'),
  ('00000000-0000-0000-0000-000000000000', '41000000-0000-4000-8000-000000000003',
   'authenticated', 'authenticated', null, '', null, now(), now(), '{"provider":"anonymous"}', '{"display_name":"Anonymous 2"}');

insert into public.organisations (id, name, slug)
values ('41000000-0000-4000-8000-000000000101', 'Stage C Organisation', 'stage-c-organisation');

insert into public.organisation_memberships (organisation_id, profile_id, role, status, joined_at)
values ('41000000-0000-4000-8000-000000000101', '41000000-0000-4000-8000-000000000001', 'facilitator', 'active', now());

insert into public.thinklab_sessions (
  id, organisation_id, facilitator_id, template_key, template_version,
  join_code, delivery_mode, status, current_moment_id
)
values
  ('41000000-0000-4000-8000-000000000201', '41000000-0000-4000-8000-000000000101',
   '41000000-0000-4000-8000-000000000001', 'trust-lab-session-1', 1,
   'JOINC1', 'individual_devices', 'live', 'welcome'),
  ('41000000-0000-4000-8000-000000000202', '41000000-0000-4000-8000-000000000101',
   '41000000-0000-4000-8000-000000000001', 'trust-lab-session-1', 1,
   'ENDEDC', 'individual_devices', 'ended', 'welcome');

insert into public.thinklab_moment_releases (session_id, moment_id, status, released_at)
values
  ('41000000-0000-4000-8000-000000000201', 'welcome', 'released', now()),
  ('41000000-0000-4000-8000-000000000201', 'trap', 'released', now()),
  ('41000000-0000-4000-8000-000000000201', 'rules', 'closed', now()),
  ('41000000-0000-4000-8000-000000000201', 'look-again', 'held', null);

set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"41000000-0000-4000-8000-000000000002","role":"authenticated"}', true);

select results_eq(
  $$select session_id from public.join_thinklab_session(' join-c1 ', 'Participant One')$$,
  $$values ('41000000-0000-4000-8000-000000000201'::uuid)$$,
  'Normalized valid code joins the live session'
);
select is(
  (select count(*) from public.organisation_memberships where profile_id = '41000000-0000-4000-8000-000000000002' and role = 'participant'),
  1::bigint,
  'Join creates participant organisation membership'
);
select is(
  (select count(*) from public.thinklab_participants where profile_id = '41000000-0000-4000-8000-000000000002'),
  1::bigint,
  'Join creates one session participant'
);
select lives_ok(
  $$select * from public.join_thinklab_session('JOINC1', 'Participant One Renamed')$$,
  'Joining again recovers the existing participant'
);
select is(
  (select count(*) from public.thinklab_participants where profile_id = '41000000-0000-4000-8000-000000000002'),
  1::bigint,
  'Recovery does not duplicate participant records'
);
select throws_ok(
  $$select * from public.join_thinklab_session('INVALID', 'Participant One')$$,
  'P0001', 'Session is not available',
  'Invalid code returns a non-revealing error'
);
select throws_ok(
  $$select * from public.join_thinklab_session('ENDEDC', 'Participant One')$$,
  'P0001', 'Session is not available',
  'Ended session rejects joining'
);
select throws_ok(
  $$select * from public.save_thinklab_response(
    '41000000-0000-4000-8000-000000000201', 'not-a-template-moment', '{"texts":["No"]}', 0
  )$$,
  'P0001', 'Session is not available',
  'Arbitrary moment IDs are rejected'
);
select throws_ok(
  $$select * from public.save_thinklab_response(
    '41000000-0000-4000-8000-000000000201', 'look-again', '{"texts":["Held"]}', 0
  )$$,
  'P0001', 'Session is not available',
  'Held moments reject responses'
);
select throws_ok(
  $$select * from public.submit_thinklab_response(
    '41000000-0000-4000-8000-000000000201', 'rules', '{"choices":["Closed"]}', 0
  )$$,
  'P0001', 'Session is not available',
  'Closed moments reject submissions until reopened'
);
select is(
  public.set_thinklab_participant_current_moment(
    '41000000-0000-4000-8000-000000000201', 'trap'
  ),
  'trap',
  'Participant progress persists only for an authorised visible moment'
);
select results_eq(
  $$select response_version from public.save_thinklab_response(
    '41000000-0000-4000-8000-000000000201', 'welcome', '{"texts":["Hello"]}', 0
  )$$,
  $$values (1)$$,
  'Participant creates a versioned draft'
);
select results_eq(
  $$select response_version from public.save_thinklab_response(
    '41000000-0000-4000-8000-000000000201', 'welcome', '{"texts":["Hello again"]}', 1
  )$$,
  $$values (2)$$,
  'Correct expected version updates a draft'
);
select throws_ok(
  $$select * from public.save_thinklab_response(
    '41000000-0000-4000-8000-000000000201', 'welcome', '{"texts":["Stale"]}', 1
  )$$,
  '40001', 'Response version conflict or response is locked',
  'Stale expected version is rejected'
);
select results_eq(
  $$select response_status from public.submit_thinklab_response(
    '41000000-0000-4000-8000-000000000201', 'trap', '{"choices":["B"]}', 0
  )$$,
  $$values ('locked'::text)$$,
  'Required initial judgement is locked at submission'
);
select throws_ok(
  $$select * from public.save_thinklab_response(
    '41000000-0000-4000-8000-000000000201', 'trap', '{"choices":["A"]}', 1
  )$$,
  '40001', 'Response version conflict or response is locked',
  'Locked judgement cannot be changed through save operation'
);

reset role;
select throws_ok(
  $$update public.thinklab_responses set payload = '{"choices":["A"]}'
    where session_id = '41000000-0000-4000-8000-000000000201' and moment_id = 'trap'$$,
  '23514', 'Initial locked payload is immutable',
  'Locked active payload is immutable at database level'
);

set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"41000000-0000-4000-8000-000000000003","role":"authenticated"}', true);
select lives_ok(
  $$select * from public.join_thinklab_session('JOINC1', 'Participant Two')$$,
  'Second anonymous identity joins'
);
select is(
  (select count(*) from public.thinklab_participants),
  1::bigint,
  'Participant RLS exposes only their own participant record'
);
select is(
  (select count(*) from public.thinklab_responses),
  0::bigint,
  'Participant cannot read the other participant responses'
);
select results_eq(
  $$select response_version from public.save_thinklab_response(
    '41000000-0000-4000-8000-000000000201', 'welcome', '{"texts":["Separate"]}', 0
  )$$,
  $$values (1)$$,
  'Second participant saves an independent response'
);
select is(
  (select payload -> 'texts' ->> 0 from public.thinklab_responses where moment_id = 'welcome'),
  'Separate',
  'Second participant sees only their own saved payload'
);
select is(
  (select count(*) from public.thinklab_moment_releases),
  3::bigint,
  'Participant sees released moments and not held moments'
);
select throws_ok(
  $$update public.thinklab_moment_releases set status = 'released'
    where session_id = '41000000-0000-4000-8000-000000000201' and moment_id = 'look-again'$$,
  '42501', 'permission denied for table thinklab_moment_releases',
  'Participant cannot release moments'
);
select is_empty(
  $$update public.thinklab_sessions set status = 'ended'
    where id = '41000000-0000-4000-8000-000000000201' returning id$$,
  'Participant cannot change session state'
);

select * from finish();
rollback;
