begin;

create extension if not exists pgtap with schema extensions;
set search_path = public, extensions;
select plan(18);

insert into auth.users (
  instance_id, id, aud, role, email, encrypted_password,
  email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data
)
values
  ('00000000-0000-0000-0000-000000000000', '61000000-0000-4000-8000-000000000001',
   'authenticated', 'authenticated', 'creation-facilitator@example.edu', '',
   now(), now(), now(), '{}', '{"display_name":"Creation Facilitator"}'),
  ('00000000-0000-0000-0000-000000000000', '61000000-0000-4000-8000-000000000002',
   'authenticated', 'authenticated', 'creation-admin@example.edu', '',
   now(), now(), now(), '{}', '{"display_name":"Creation Administrator"}'),
  ('00000000-0000-0000-0000-000000000000', '61000000-0000-4000-8000-000000000003',
   'authenticated', 'authenticated', 'creation-participant@example.edu', '',
   now(), now(), now(), '{}', '{"display_name":"Creation Participant"}'),
  ('00000000-0000-0000-8000-000000000000', '61000000-0000-4000-8000-000000000004',
   'authenticated', 'authenticated', 'creation-inactive@example.edu', '',
   now(), now(), now(), '{}', '{"display_name":"Inactive Facilitator"}'),
  ('00000000-0000-0000-0000-000000000000', '61000000-0000-4000-8000-000000000005',
   'authenticated', 'authenticated', 'creation-suspended-org@example.edu', '',
   now(), now(), now(), '{}', '{"display_name":"Suspended Organisation Facilitator"}');

insert into public.organisations (id, name, slug, status)
values
  ('61000000-0000-4000-8000-000000000101', 'Creation Organisation', 'creation-organisation', 'active'),
  ('61000000-0000-4000-8000-000000000102', 'Other Creation Organisation', 'other-creation-organisation', 'active'),
  ('61000000-0000-4000-8000-000000000103', 'Suspended Creation Organisation', 'suspended-creation-organisation', 'suspended');

insert into public.organisation_memberships (
  organisation_id, profile_id, role, status, joined_at
)
values
  ('61000000-0000-4000-8000-000000000101', '61000000-0000-4000-8000-000000000001', 'facilitator', 'active', now()),
  ('61000000-0000-4000-8000-000000000101', '61000000-0000-4000-8000-000000000002', 'organisation_administrator', 'active', now()),
  ('61000000-0000-4000-8000-000000000101', '61000000-0000-4000-8000-000000000003', 'participant', 'active', now()),
  ('61000000-0000-4000-8000-000000000101', '61000000-0000-4000-8000-000000000004', 'facilitator', 'suspended', now()),
  ('61000000-0000-4000-8000-000000000103', '61000000-0000-4000-8000-000000000005', 'facilitator', 'active', now());

select ok(
  not has_function_privilege('public', 'public.create_thinklab_session(uuid)', 'EXECUTE'),
  'PUBLIC cannot execute session creation'
);
select ok(
  not has_function_privilege('anon', 'public.create_thinklab_session(uuid)', 'EXECUTE'),
  'anon cannot execute session creation'
);
select ok(
  has_function_privilege('authenticated', 'public.create_thinklab_session(uuid)', 'EXECUTE'),
  'authenticated can execute session creation'
);

set local role authenticated;
select set_config('request.jwt.claims', '{"role":"authenticated"}', true);
select throws_ok(
  $$select * from public.create_thinklab_session('61000000-0000-4000-8000-000000000101')$$,
  '28000', 'Authentication required',
  'Caller without an authenticated identity is rejected'
);

select set_config(
  'request.jwt.claims',
  '{"sub":"61000000-0000-4000-8000-000000000001","role":"authenticated"}',
  true
);
select lives_ok(
  $$select * from public.create_thinklab_session('61000000-0000-4000-8000-000000000101')$$,
  'Active facilitator can create a session'
);
select is(
  (select facilitator_id from public.thinklab_sessions
   where facilitator_id = '61000000-0000-4000-8000-000000000001'),
  '61000000-0000-4000-8000-000000000001'::uuid,
  'Session facilitator is derived from auth.uid()'
);
select results_eq(
  $$
    select template_key, template_version, delivery_mode, status, current_moment_id,
           started_at is not null
    from public.thinklab_sessions
    where facilitator_id = '61000000-0000-4000-8000-000000000001'
  $$,
  $$
    values (
      'trust-lab-session-1'::text, 1, 'individual_devices'::text,
      'live'::text, 'welcome'::text, true
    )
  $$,
  'Session contains the required fixed values'
);
select matches(
  (select join_code from public.thinklab_sessions
   where facilitator_id = '61000000-0000-4000-8000-000000000001'),
  '^[A-Z0-9]{6}$',
  'Join code is six uppercase alphanumeric characters'
);
select is(
  (select count(*) from public.thinklab_moment_releases release
   join public.thinklab_sessions session on session.id = release.session_id
   where session.facilitator_id = '61000000-0000-4000-8000-000000000001'
     and release.moment_id = 'welcome'
     and release.status = 'released'
     and release.released_by = session.facilitator_id
     and release.released_at is not null),
  1::bigint,
  'Welcome moment is released for the new session'
);
select throws_ok(
  $$select * from public.create_thinklab_session('61000000-0000-4000-8000-000000000101')$$,
  'P0001', 'An active session already exists',
  'Second active facilitator session is rejected'
);
select is(
  (select count(*) from public.thinklab_sessions
   where facilitator_id = '61000000-0000-4000-8000-000000000001'),
  1::bigint,
  'Failed second creation leaves no partial session'
);

select set_config(
  'request.jwt.claims',
  '{"sub":"61000000-0000-4000-8000-000000000002","role":"authenticated"}',
  true
);
select lives_ok(
  $$select * from public.create_thinklab_session('61000000-0000-4000-8000-000000000101')$$,
  'Active organisation administrator can create a session'
);

select set_config(
  'request.jwt.claims',
  '{"sub":"61000000-0000-4000-8000-000000000003","role":"authenticated"}',
  true
);
select throws_ok(
  $$select * from public.create_thinklab_session('61000000-0000-4000-8000-000000000101')$$,
  '42501', 'Organisation is not available',
  'Participant is rejected'
);

select set_config(
  'request.jwt.claims',
  '{"sub":"61000000-0000-4000-8000-000000000004","role":"authenticated"}',
  true
);
select throws_ok(
  $$select * from public.create_thinklab_session('61000000-0000-4000-8000-000000000101')$$,
  '42501', 'Organisation is not available',
  'Inactive membership is rejected'
);

select set_config(
  'request.jwt.claims',
  '{"sub":"61000000-0000-4000-8000-000000000005","role":"authenticated"}',
  true
);
select throws_ok(
  $$select * from public.create_thinklab_session('61000000-0000-4000-8000-000000000103')$$,
  '42501', 'Organisation is not available',
  'Inactive organisation is rejected'
);

select set_config(
  'request.jwt.claims',
  '{"sub":"61000000-0000-4000-8000-000000000003","role":"authenticated"}',
  true
);
select throws_ok(
  $$select * from public.create_thinklab_session('61000000-0000-4000-8000-000000000102')$$,
  '42501', 'Organisation is not available',
  'Cross-organisation creation is rejected'
);
select is(
  (select count(*) from public.thinklab_sessions
   where facilitator_id in (
     '61000000-0000-4000-8000-000000000003',
     '61000000-0000-4000-8000-000000000004',
     '61000000-0000-4000-8000-000000000005'
   )),
  0::bigint,
  'Rejected callers leave no partial sessions'
);

reset role;
set local role anon;
select throws_ok(
  $$select * from public.create_thinklab_session('61000000-0000-4000-8000-000000000101')$$,
  '42501',
  'permission denied for function create_thinklab_session',
  'Anonymous role execution is denied'
);

reset role;
select * from finish();
rollback;
