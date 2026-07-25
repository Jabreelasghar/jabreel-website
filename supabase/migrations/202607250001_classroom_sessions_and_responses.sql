begin;

create table public.thinklab_sessions (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references public.organisations(id) on delete cascade,
  facilitator_id uuid not null references public.profiles(id) on delete restrict,
  template_key text not null check (length(trim(template_key)) between 3 and 100),
  template_version integer not null check (template_version > 0),
  join_code text not null unique check (join_code ~ '^[A-Z0-9]{6,10}$'),
  delivery_mode text not null check (
    delivery_mode in ('projector', 'individual_devices', 'live_online')
  ),
  status text not null default 'draft' check (
    status in ('draft', 'live', 'paused', 'ended')
  ),
  current_moment_id text not null check (length(trim(current_moment_id)) between 1 and 100),
  started_at timestamptz,
  ended_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (id, organisation_id),
  check (ended_at is null or started_at is null or ended_at >= started_at)
);

create index thinklab_sessions_organisation_idx
  on public.thinklab_sessions(organisation_id, status);
create index thinklab_sessions_facilitator_idx
  on public.thinklab_sessions(facilitator_id, status);

create table public.thinklab_participants (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null,
  organisation_id uuid not null references public.organisations(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  display_name text not null check (length(trim(display_name)) between 1 and 100),
  current_moment_id text not null check (length(trim(current_moment_id)) between 1 and 100),
  status text not null default 'active' check (
    status in ('active', 'completed', 'left')
  ),
  last_seen_at timestamptz not null default now(),
  joined_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (session_id, profile_id),
  unique (id, session_id),
  constraint thinklab_participants_session_organisation_fk
    foreign key (session_id, organisation_id)
    references public.thinklab_sessions(id, organisation_id)
    on delete cascade
);

create index thinklab_participants_session_idx
  on public.thinklab_participants(session_id, status);
create index thinklab_participants_profile_idx
  on public.thinklab_participants(profile_id, status);
create index thinklab_participants_presence_idx
  on public.thinklab_participants(session_id, last_seen_at desc);

create table public.thinklab_moment_releases (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.thinklab_sessions(id) on delete cascade,
  moment_id text not null check (length(trim(moment_id)) between 1 and 100),
  status text not null default 'held' check (
    status in ('held', 'released', 'closed', 'reopened')
  ),
  released_by uuid references public.profiles(id) on delete set null,
  released_at timestamptz,
  reopened_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (session_id, moment_id)
);

create index thinklab_moment_releases_session_idx
  on public.thinklab_moment_releases(session_id, status);

create table public.thinklab_responses (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.thinklab_sessions(id) on delete cascade,
  participant_id uuid not null,
  moment_id text not null check (length(trim(moment_id)) between 1 and 100),
  payload jsonb not null default '{}'::jsonb,
  initial_locked_payload jsonb,
  status text not null default 'draft' check (
    status in ('draft', 'submitted', 'locked', 'reopened')
  ),
  version integer not null default 1 check (version > 0),
  submitted_at timestamptz,
  locked_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (participant_id, moment_id),
  constraint thinklab_responses_participant_session_fk
    foreign key (participant_id, session_id)
    references public.thinklab_participants(id, session_id)
    on delete cascade,
  check (
    status not in ('locked', 'reopened')
    or initial_locked_payload is not null
  )
);

create index thinklab_responses_session_status_idx
  on public.thinklab_responses(session_id, status);
create index thinklab_responses_participant_idx
  on public.thinklab_responses(participant_id, updated_at desc);

create trigger thinklab_sessions_set_updated_at
before update on public.thinklab_sessions
for each row execute function public.set_updated_at();

create trigger thinklab_participants_set_updated_at
before update on public.thinklab_participants
for each row execute function public.set_updated_at();

create trigger thinklab_moment_releases_set_updated_at
before update on public.thinklab_moment_releases
for each row execute function public.set_updated_at();

create trigger thinklab_responses_set_updated_at
before update on public.thinklab_responses
for each row execute function public.set_updated_at();

create or replace function public.protect_thinklab_initial_locked_payload()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if old.initial_locked_payload is not null
     and new.initial_locked_payload is distinct from old.initial_locked_payload then
    raise exception 'Initial locked payload is immutable'
      using errcode = '23514';
  end if;
  return new;
end;
$$;

create trigger thinklab_responses_protect_initial_locked_payload
before update of initial_locked_payload on public.thinklab_responses
for each row execute function public.protect_thinklab_initial_locked_payload();

create or replace function public.is_thinklab_session_participant(target_session_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.thinklab_participants participant
    where participant.session_id = target_session_id
      and participant.profile_id = (select auth.uid())
      and participant.status in ('active', 'completed')
  );
$$;

create or replace function public.can_facilitate_thinklab_session(target_session_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.thinklab_sessions session
    where session.id = target_session_id
      and (
        (
          session.facilitator_id = (select auth.uid())
          and public.has_organisation_role(
            session.organisation_id,
            array['facilitator']::public.organisation_role[]
          )
        )
        or public.has_organisation_role(
          session.organisation_id,
          array['organisation_administrator']::public.organisation_role[]
        )
      )
  );
$$;

revoke all on function public.protect_thinklab_initial_locked_payload() from public;
revoke all on function public.is_thinklab_session_participant(uuid) from public;
revoke all on function public.can_facilitate_thinklab_session(uuid) from public;
grant execute on function public.is_thinklab_session_participant(uuid) to authenticated;
grant execute on function public.can_facilitate_thinklab_session(uuid) to authenticated;

alter table public.thinklab_sessions enable row level security;
alter table public.thinklab_participants enable row level security;
alter table public.thinklab_moment_releases enable row level security;
alter table public.thinklab_responses enable row level security;

create policy "Facilitators and participants can view their sessions"
on public.thinklab_sessions
for select
to authenticated
using (
  public.can_facilitate_thinklab_session(id)
  or public.is_thinklab_session_participant(id)
);

create policy "Facilitators can create their own sessions"
on public.thinklab_sessions
for insert
to authenticated
with check (
  facilitator_id = (select auth.uid())
  and public.has_organisation_role(
    organisation_id,
    array['facilitator', 'organisation_administrator']::public.organisation_role[]
  )
);

create policy "Facilitators can update their own sessions"
on public.thinklab_sessions
for update
to authenticated
using (public.can_facilitate_thinklab_session(id))
with check (
  facilitator_id = (select auth.uid())
  and public.has_organisation_role(
    organisation_id,
    array['facilitator', 'organisation_administrator']::public.organisation_role[]
  )
);

create policy "Participants and facilitators can view session participants"
on public.thinklab_participants
for select
to authenticated
using (
  profile_id = (select auth.uid())
  or public.can_facilitate_thinklab_session(session_id)
);

create policy "Released moments are visible within a session"
on public.thinklab_moment_releases
for select
to authenticated
using (
  public.can_facilitate_thinklab_session(session_id)
  or (
    status in ('released', 'closed', 'reopened')
    and public.is_thinklab_session_participant(session_id)
  )
);

create policy "Participants and facilitators can view permitted responses"
on public.thinklab_responses
for select
to authenticated
using (
  exists (
    select 1
    from public.thinklab_participants participant
    where participant.id = participant_id
      and participant.profile_id = (select auth.uid())
  )
  or public.can_facilitate_thinklab_session(session_id)
);

revoke all on public.thinklab_sessions from anon;
revoke all on public.thinklab_participants from anon;
revoke all on public.thinklab_moment_releases from anon;
revoke all on public.thinklab_responses from anon;
revoke all on public.thinklab_sessions from authenticated;
revoke all on public.thinklab_participants from authenticated;
revoke all on public.thinklab_moment_releases from authenticated;
revoke all on public.thinklab_responses from authenticated;

grant select, insert, update on public.thinklab_sessions to authenticated;
grant select on public.thinklab_participants to authenticated;
grant select on public.thinklab_moment_releases to authenticated;
grant select on public.thinklab_responses to authenticated;

comment on table public.thinklab_sessions is
  'Facilitator-led ThinkLab classroom sessions created from a versioned template.';
comment on table public.thinklab_participants is
  'Authenticated participant identities scoped to one ThinkLab session.';
comment on table public.thinklab_moment_releases is
  'Authoritative facilitator-controlled release state for template moments.';
comment on table public.thinklab_responses is
  'Participant response records with protected initial locked judgements.';

commit;
