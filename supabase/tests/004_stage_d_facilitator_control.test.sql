begin;

create extension if not exists pgtap with schema extensions;
set search_path = public, extensions;
select plan(25);

insert into auth.users (
  instance_id, id, aud, role, email, encrypted_password,
  email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data
)
values
  ('00000000-0000-0000-0000-000000000000', '51000000-0000-4000-8000-000000000001',
   'authenticated', 'authenticated', 'stage-d-facilitator@example.edu', '', now(), now(), now(), '{}', '{"display_name":"Facilitator D"}'),
  ('00000000-0000-0000-0000-000000000000', '51000000-0000-4000-8000-000000000002',
   'authenticated', 'authenticated', 'stage-d-other@example.edu', '', now(), now(), now(), '{}', '{"display_name":"Other facilitator"}'),
  ('00000000-0000-0000-0000-000000000000', '51000000-0000-4000-8000-000000000003',
   'authenticated', 'authenticated', null, '', null, now(), now(), '{"provider":"anonymous"}', '{"display_name":"Participant D1"}'),
  ('00000000-0000-0000-0000-000000000000', '51000000-0000-4000-8000-000000000004',
   'authenticated', 'authenticated', null, '', null, now(), now(), '{"provider":"anonymous"}', '{"display_name":"Participant D2"}');

insert into public.organisations (id, name, slug)
values
  ('51000000-0000-4000-8000-000000000101', 'Stage D Organisation', 'stage-d-organisation'),
  ('51000000-0000-4000-8000-000000000102', 'Stage D Other Organisation', 'stage-d-other-organisation');

insert into public.organisation_memberships (organisation_id, profile_id, role, status, joined_at)
values
  ('51000000-0000-4000-8000-000000000101', '51000000-0000-4000-8000-000000000001', 'facilitator', 'active', now()),
  ('51000000-0000-4000-8000-000000000102', '51000000-0000-4000-8000-000000000002', 'facilitator', 'active', now());

insert into public.thinklab_sessions (
  id, organisation_id, facilitator_id, template_key, template_version,
  join_code, delivery_mode, status, current_moment_id
)
values
  ('51000000-0000-4000-8000-000000000201', '51000000-0000-4000-8000-000000000101',
   '51000000-0000-4000-8000-000000000001', 'trust-lab-session-1', 1,
   'STAGED1', 'individual_devices', 'live', 'welcome'),
  ('51000000-0000-4000-8000-000000000202', '51000000-0000-4000-8000-000000000101',
   '51000000-0000-4000-8000-000000000001', 'trust-lab-session-1', 1,
   'CARDSD', 'individual_devices', 'live', 'cards'),
  ('51000000-0000-4000-8000-000000000203', '51000000-0000-4000-8000-000000000102',
   '51000000-0000-4000-8000-000000000002', 'trust-lab-session-1', 1,
   'OTHERD', 'individual_devices', 'live', 'welcome');

insert into public.thinklab_moment_releases (session_id, moment_id, status, released_at)
values
  ('51000000-0000-4000-8000-000000000201', 'welcome', 'released', now()),
  ('51000000-0000-4000-8000-000000000202', 'cards', 'released', now()),
  ('51000000-0000-4000-8000-000000000203', 'welcome', 'released', now());

select is(
  (select max_choices from public.thinklab_template_moments
   where template_key = 'trust-lab-session-1' and template_version = 1 and moment_id = 'cards'),
  2,
  'The evidence-card moment has a trusted two-choice limit'
);
select ok(
  (select locks_at_choice_limit and locks_initial_response
   from public.thinklab_template_moments
   where template_key = 'trust-lab-session-1' and template_version = 1 and moment_id = 'cards'),
  'The two-card selection is configured to lock'
);

set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"51000000-0000-4000-8000-000000000001","role":"authenticated"}', true);

select is(
  public.advance_thinklab_session('51000000-0000-4000-8000-000000000201'),
  'rules',
  'Authorised facilitator advances exactly one moment'
);
select is(
  (select current_moment_id from public.thinklab_sessions where id = '51000000-0000-4000-8000-000000000201'),
  'rules',
  'Advanced current moment is persisted'
);
select is(
  (select status from public.thinklab_moment_releases
   where session_id = '51000000-0000-4000-8000-000000000201' and moment_id = 'welcome'),
  'closed',
  'Advancing closes the previous moment'
);
select is(
  (select status from public.thinklab_moment_releases
   where session_id = '51000000-0000-4000-8000-000000000201' and moment_id = 'rules'),
  'released',
  'Advancing releases the next moment'
);
select is(
  public.return_to_previous_thinklab_moment('51000000-0000-4000-8000-000000000201'),
  'welcome',
  'Authorised facilitator returns exactly one moment'
);
select is(
  public.pause_thinklab_session('51000000-0000-4000-8000-000000000201'),
  'paused',
  'Authorised facilitator pauses a live session'
);
select throws_ok(
  $$select public.advance_thinklab_session('51000000-0000-4000-8000-000000000201')$$,
  'P0001', 'Session cannot advance',
  'Paused sessions reject forward progression'
);
select is(
  public.resume_thinklab_session('51000000-0000-4000-8000-000000000201'),
  'live',
  'Authorised facilitator resumes a paused session'
);
select throws_ok(
  $$select public.advance_thinklab_session('51000000-0000-4000-8000-000000000203')$$,
  'P0001', 'Session cannot advance',
  'Facilitator cannot control another organisation session'
);

set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"51000000-0000-4000-8000-000000000003","role":"authenticated"}', true);

select lives_ok(
  $$select * from public.join_thinklab_session('CARDSD', 'Participant D1')$$,
  'Participant joins the card-selection session'
);
select throws_ok(
  $$select public.advance_thinklab_session('51000000-0000-4000-8000-000000000202')$$,
  'P0001', 'Session cannot advance',
  'Participant cannot control global session progression'
);
select throws_ok(
  $$select * from public.save_thinklab_response(
    '51000000-0000-4000-8000-000000000202', 'cards',
    '{"choices":["Card 1","Card 2","Card 3"]}', 0
  )$$,
  '23514', 'Response exceeds the permitted choice limit',
  'Trusted response logic rejects a third card'
);
select throws_ok(
  $$select * from public.submit_thinklab_response(
    '51000000-0000-4000-8000-000000000202', 'cards',
    '{"choices":["Card 1"]}', 0
  )$$,
  '23514', 'Select exactly the required number of choices before locking',
  'Card selection cannot lock before exactly two choices'
);
select results_eq(
  $$select response_status from public.submit_thinklab_response(
    '51000000-0000-4000-8000-000000000202', 'cards',
    '{"choices":["Card 1","Card 2"]}', 0
  )$$,
  $$values ('locked'::text)$$,
  'Exactly two confirmed cards lock successfully'
);
select is(
  (select jsonb_array_length(initial_locked_payload -> 'choices')
   from public.thinklab_responses where moment_id = 'cards'),
  2,
  'Locked two-card selection survives a fresh query'
);
select throws_ok(
  $$select * from public.save_thinklab_response(
    '51000000-0000-4000-8000-000000000202', 'cards',
    '{"choices":["Card 3","Card 4"]}', 1
  )$$,
  '40001', 'Response version conflict or response is locked',
  'Locked cards cannot be replaced'
);

set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"51000000-0000-4000-8000-000000000004","role":"authenticated"}', true);
select lives_ok(
  $$select * from public.join_thinklab_session('CARDSD', 'Participant D2')$$,
  'A second participant joins independently'
);
select is(
  (select count(*) from public.thinklab_responses where moment_id = 'cards'),
  0::bigint,
  'Second participant cannot read the first participant card selection'
);
select throws_ok(
  $$update public.thinklab_responses
    set payload = '{"choices":["Card 3","Card 4"]}'
    where moment_id = 'cards'$$,
  '42501', 'permission denied for table thinklab_responses',
  'Second participant cannot alter another participant selection'
);

set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"51000000-0000-4000-8000-000000000001","role":"authenticated"}', true);
select is(
  public.end_thinklab_session('51000000-0000-4000-8000-000000000202'),
  'ended',
  'Authorised facilitator ends the session'
);
select is(
  (select status from public.thinklab_sessions where id = '51000000-0000-4000-8000-000000000202'),
  'ended',
  'Ended status is persisted'
);
select throws_ok(
  $$select public.advance_thinklab_session('51000000-0000-4000-8000-000000000202')$$,
  'P0001', 'Session cannot advance',
  'Ended sessions reject further progression'
);

set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"51000000-0000-4000-8000-000000000004","role":"authenticated"}', true);
select throws_ok(
  $$select * from public.save_thinklab_response(
    '51000000-0000-4000-8000-000000000202', 'cards',
    '{"choices":["Card 1","Card 2"]}', 0
  )$$,
  'P0001', 'Session is not available',
  'Ended sessions reject ordinary participant responses'
);

select * from finish();
rollback;
