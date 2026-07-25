create extension if not exists pgcrypto with schema extensions;

create type public.organisation_status as enum ('active', 'suspended', 'archived');
create type public.organisation_role as enum (
  'organisation_administrator',
  'facilitator',
  'participant',
  'observer'
);
create type public.membership_status as enum ('invited', 'active', 'suspended', 'removed');

create table public.organisations (
  id uuid primary key default gen_random_uuid(),
  name text not null check (length(trim(name)) between 2 and 160),
  slug text not null unique check (slug ~ '^[a-z][a-z0-9-]{2,62}$'),
  status public.organisation_status not null default 'active',
  timezone text not null default 'UTC',
  settings jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null check (length(trim(display_name)) between 1 and 160),
  email text,
  status text not null default 'active' check (status in ('active', 'suspended', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.organisation_memberships (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references public.organisations(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  role public.organisation_role not null,
  status public.membership_status not null default 'active',
  invited_by uuid references public.profiles(id) on delete set null,
  joined_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organisation_id, profile_id, role)
);

create index organisation_memberships_profile_idx
  on public.organisation_memberships(profile_id, status);
create index organisation_memberships_org_idx
  on public.organisation_memberships(organisation_id, role, status);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger organisations_set_updated_at
before update on public.organisations
for each row execute function public.set_updated_at();

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create trigger organisation_memberships_set_updated_at
before update on public.organisation_memberships
for each row execute function public.set_updated_at();

create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name, email)
  values (
    new.id,
    coalesce(
      nullif(trim(new.raw_user_meta_data ->> 'display_name'), ''),
      nullif(split_part(coalesce(new.email, ''), '@', 1), ''),
      'ThinkLab user'
    ),
    new.email
  )
  on conflict (id) do update
    set email = excluded.email,
        display_name = coalesce(nullif(public.profiles.display_name, ''), excluded.display_name);
  return new;
end;
$$;

create trigger on_auth_user_created
after insert or update of email, raw_user_meta_data on auth.users
for each row execute function public.handle_new_auth_user();

create or replace function public.is_active_organisation_member(target_organisation_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.organisation_memberships membership
    where membership.organisation_id = target_organisation_id
      and membership.profile_id = (select auth.uid())
      and membership.status = 'active'
  );
$$;

create or replace function public.has_organisation_role(
  target_organisation_id uuid,
  allowed_roles public.organisation_role[]
)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.organisation_memberships membership
    where membership.organisation_id = target_organisation_id
      and membership.profile_id = (select auth.uid())
      and membership.status = 'active'
      and membership.role = any(allowed_roles)
  );
$$;

revoke all on function public.is_active_organisation_member(uuid) from public;
revoke all on function public.has_organisation_role(uuid, public.organisation_role[]) from public;
grant execute on function public.is_active_organisation_member(uuid) to authenticated;
grant execute on function public.has_organisation_role(uuid, public.organisation_role[]) to authenticated;

alter table public.organisations enable row level security;
alter table public.profiles enable row level security;
alter table public.organisation_memberships enable row level security;

create policy "Members can view their organisations"
on public.organisations
for select
to authenticated
using (public.is_active_organisation_member(id));

create policy "Organisation administrators can update organisations"
on public.organisations
for update
to authenticated
using (
  public.has_organisation_role(
    id,
    array['organisation_administrator']::public.organisation_role[]
  )
)
with check (
  public.has_organisation_role(
    id,
    array['organisation_administrator']::public.organisation_role[]
  )
);

create policy "Users can view their own profile"
on public.profiles
for select
to authenticated
using (id = (select auth.uid()));

create policy "Users can update their own profile"
on public.profiles
for update
to authenticated
using (id = (select auth.uid()))
with check (id = (select auth.uid()));

create policy "Members can view their own memberships"
on public.organisation_memberships
for select
to authenticated
using (
  profile_id = (select auth.uid())
  or public.has_organisation_role(
    organisation_id,
    array['organisation_administrator', 'facilitator']::public.organisation_role[]
  )
);

create policy "Organisation administrators can add memberships"
on public.organisation_memberships
for insert
to authenticated
with check (
  public.has_organisation_role(
    organisation_id,
    array['organisation_administrator']::public.organisation_role[]
  )
);

create policy "Organisation administrators can update memberships"
on public.organisation_memberships
for update
to authenticated
using (
  public.has_organisation_role(
    organisation_id,
    array['organisation_administrator']::public.organisation_role[]
  )
)
with check (
  public.has_organisation_role(
    organisation_id,
    array['organisation_administrator']::public.organisation_role[]
  )
);

create policy "Organisation administrators can remove memberships"
on public.organisation_memberships
for delete
to authenticated
using (
  public.has_organisation_role(
    organisation_id,
    array['organisation_administrator']::public.organisation_role[]
  )
);

revoke all on public.organisations from anon;
revoke all on public.profiles from anon;
revoke all on public.organisation_memberships from anon;

grant select, update on public.organisations to authenticated;
grant select, update on public.profiles to authenticated;
grant select, insert, update, delete on public.organisation_memberships to authenticated;

comment on table public.organisations is 'ThinkLab tenant boundary.';
comment on table public.profiles is 'Application identity linked to Supabase Auth.';
comment on table public.organisation_memberships is 'Organisation-scoped role assignments.';
