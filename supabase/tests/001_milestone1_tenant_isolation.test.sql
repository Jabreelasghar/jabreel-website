begin;

create extension if not exists pgtap with schema extensions;
set search_path = public, extensions;

select plan(10);

select ok(
  (select relrowsecurity from pg_class where oid = 'public.organisations'::regclass),
  'RLS is enabled on organisations'
);
select ok(
  (select relrowsecurity from pg_class where oid = 'public.profiles'::regclass),
  'RLS is enabled on profiles'
);
select ok(
  (select relrowsecurity from pg_class where oid = 'public.organisation_memberships'::regclass),
  'RLS is enabled on organisation memberships'
);

insert into auth.users (
  instance_id, id, aud, role, email, encrypted_password,
  email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data
)
values
  (
    '00000000-0000-0000-0000-000000000000',
    '10000000-0000-4000-8000-000000000001',
    'authenticated', 'authenticated', 'facilitator-a@example.edu', '',
    now(), now(), now(), '{}'::jsonb, '{"display_name":"Facilitator A"}'::jsonb
  ),
  (
    '00000000-0000-0000-0000-000000000000',
    '20000000-0000-4000-8000-000000000002',
    'authenticated', 'authenticated', 'facilitator-b@example.edu', '',
    now(), now(), now(), '{}'::jsonb, '{"display_name":"Facilitator B"}'::jsonb
  );

insert into public.organisations (id, name, slug)
values
  ('10000000-0000-4000-8000-000000000101', 'Organisation A', 'test-organisation-a'),
  ('20000000-0000-4000-8000-000000000202', 'Organisation B', 'test-organisation-b');

insert into public.organisation_memberships (
  organisation_id, profile_id, role, status, joined_at
)
values
  (
    '10000000-0000-4000-8000-000000000101',
    '10000000-0000-4000-8000-000000000001',
    'facilitator', 'active', now()
  ),
  (
    '20000000-0000-4000-8000-000000000202',
    '20000000-0000-4000-8000-000000000002',
    'facilitator', 'active', now()
  );

set local role authenticated;
select set_config(
  'request.jwt.claims',
  '{"sub":"10000000-0000-4000-8000-000000000001","role":"authenticated"}',
  true
);

select results_eq(
  'select count(*)::bigint from public.organisations',
  array[1::bigint],
  'Facilitator A sees exactly one organisation'
);
select results_eq(
  $$select slug from public.organisations order by slug$$,
  $$values ('test-organisation-a'::text)$$,
  'Facilitator A sees only Organisation A'
);
select results_eq(
  'select count(*)::bigint from public.organisation_memberships',
  array[1::bigint],
  'Facilitator A sees only memberships in Organisation A'
);
select results_eq(
  'select count(*)::bigint from public.profiles',
  array[1::bigint],
  'Facilitator A sees only their own profile'
);
select is_empty(
  $$
    update public.organisations
    set name = 'Cross-tenant change'
    where id = '20000000-0000-4000-8000-000000000202'
    returning id
  $$,
  'Facilitator A cannot update Organisation B'
);
select is_empty(
  $$
    delete from public.organisation_memberships
    where organisation_id = '20000000-0000-4000-8000-000000000202'
    returning id
  $$,
  'Facilitator A cannot delete Organisation B memberships'
);
select ok(
  public.has_organisation_role(
    '10000000-0000-4000-8000-000000000101',
    array['facilitator']::public.organisation_role[]
  ),
  'Facilitator A has facilitator access in Organisation A'
);

select * from finish();
rollback;
