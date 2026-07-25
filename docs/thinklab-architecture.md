# ThinkLab Architecture

## Purpose

ThinkLab is a guided judgement experience. The current implementation contains a browser-local Session 1 prototype and the server-side foundations for organisation-scoped facilitator access and future live classroom sessions.

The platform separates two concerns:

- **ThinkLab templates** hold versioned instructional content and activity definitions.
- **The ThinkLab engine** will control progression, releases, response locking, persistence and facilitator actions.

Stage B establishes this separation without replacing the working prototype's local state.

## Current application architecture

ThinkLab is implemented in the existing Next.js App Router application.

| Route | Responsibility | Current state |
| --- | --- | --- |
| `/thinklab` | Participant/facilitator role selection | Operational |
| `/thinklab/participant` | Session 1 participant prototype | Public; browser-local state |
| `/thinklab/facilitator/sign-in` | Supabase facilitator authentication | Operational when environment configuration is available |
| `/thinklab/facilitator` | Protected facilitator console | Server-protected; browser-local classroom controls |
| `/api/thinklab/facilitator/session` | Facilitator sign-in and sign-out | Server-side Supabase authentication |

The participant and facilitator interfaces intentionally remain separate. They consume the same resolved template model, but their surrounding controls and responsibilities differ.

## Template system

The template system is in `src/lib/thinklab/templates`.

- `types.ts` defines the minimal activity and template types required by Session 1.
- `session-1.ts` is the authoritative digital Session 1 template.
- `registry.ts` resolves a template key and versioned content.
- `resolve-moment.ts` supplies explicit defaults for context, evidence release, locking and revision metadata.

Both current interfaces call `getResolvedThinkLabTemplate`. This is the single source of truth for the model that a renderer receives. Participant interaction and facilitator inspection remain separate presentation paths because they serve different roles. A future facilitator preview, projector view and replay view should reuse a shared presentation component over this resolved model rather than interpret raw template fields independently.

The Session 1 template contains 24 ordered moments. A parity script protects the exact text and ordering inherited from the original prototype. A traversal script validates identifiers, context references, supported response types and locked moments.

## Current prototype state

The classroom prototype uses two browser storage records:

- `thinklab-v1-session` stores the released moment and paused state.
- `thinklab-v1-participant` stores choices, written responses, confidence ratings, locked judgements and completion.

This is deliberately one local source of truth for the prototype. Stage B does not partially mix local state with database state.

Consequences:

- Participant and facilitator must use the same browser profile.
- State does not synchronize between devices.
- There is only one simulated participant.
- Clearing browser data removes prototype responses.
- The facilitator console polls browser storage every 1.5 seconds.
- Database session tables are not yet connected to the interface.

## Authentication and tenancy

Supabase Auth provides facilitator identity. The server validates that the authenticated profile has an active facilitator membership before rendering the console. The browser never receives the Supabase service-role key.

The organisation model is:

1. `profiles` represents a Supabase Auth user.
2. `organisations` defines the tenant boundary.
3. `organisation_memberships` associates a profile with an organisation and role.
4. Facilitator access requires an active facilitator membership.

The schema supports future organisation administrator, participant and observer roles, although only facilitator access is active in the application.

## Database overview

Stage B adds four future classroom tables. Row-Level Security is enabled on each.

| Table | Purpose |
| --- | --- |
| `thinklab_sessions` | A facilitator-led run of a particular template version within one organisation |
| `thinklab_participants` | An authenticated participant's membership and progress within one session |
| `thinklab_moment_releases` | Facilitator-controlled visibility state for each moment in a session |
| `thinklab_responses` | A participant's response to one moment, including the protected initial judgement |
| `thinklab_template_versions` | Immutable registry of template versions accepted by database participant operations |
| `thinklab_template_moments` | Immutable allowlist of moment IDs and locked-initial-response metadata for each pinned template version |

### Important invariants

- Sessions require a template key and positive template version.
- Session, participant, response and release states use constrained vocabularies.
- A participant's organisation must match the session organisation.
- A profile can join a session only once.
- A participant can have only one response per moment.
- A session can have only one release record per moment.
- A response's initial locked payload cannot be replaced after it is set.
- Participants cannot change facilitator-controlled session or release state.
- Organisation boundaries are enforced through foreign keys and RLS.
- Participant response operations accept only moments registered for the session's exact template key and version.
- Drafts and submissions require a `released` or authorised `reopened` release record; `held` and `closed` moments reject writes.

### Index rationale

| Index | Expected query |
| --- | --- |
| `thinklab_sessions_organisation_idx` | List an organisation's sessions by status |
| `thinklab_sessions_facilitator_idx` | List a facilitator's sessions by status |
| `thinklab_participants_session_idx` | Show a session roster filtered by participation state |
| `thinklab_participants_profile_idx` | Find a participant's active or completed sessions |
| `thinklab_participants_presence_idx` | Order a session roster by recent activity |
| `thinklab_moment_releases_session_idx` | Read released/held moments for one session |
| `thinklab_responses_session_status_idx` | Monitor submitted or locked responses for a session |
| `thinklab_responses_participant_idx` | Reconstruct one participant's response timeline |

Primary-key and unique constraints create the remaining lookup indexes.

### Trigger rationale

Four `set_updated_at` triggers keep mutable records auditable without depending on every application caller. The response immutability trigger protects `initial_locked_payload` from later replacement. All five triggers enforce cross-client consistency and are required once server persistence begins.

### Policy rationale

Six policies cover the minimum Stage B access surface:

- Facilitators and enrolled participants can see their session.
- A facilitator can create an organisation-scoped session.
- A facilitator can update a session they control.
- A participant can see their own participant record; a facilitator can see their roster.
- Participants can see only released moment states for their session.
- Participants can see their own responses; facilitators can see responses in sessions they control.

Write access for participants, releases and responses is intentionally absent until Stage C server workflows can enforce the corresponding behaviour.

## Stage C.1 participant-operation boundary

The database contains a deliberately narrow, migration-owned template registry. It is not a general authoring system and has no participant or facilitator grants. Each supported template version and its ordered moment IDs are inserted by a reviewed migration. `thinklab_sessions` is constrained to a registered template version.

The response and progress security-definer functions join the authenticated participant, session, pinned template version, registered moment and release record in one database operation. This prevents a browser or direct RPC caller from writing an arbitrary, held or closed moment. A `reopened` release is the explicit authorisation that permits a previously closed moment to accept responses again.

Participant progress is persisted only when navigation actually changes to a registered, visible moment. The database update is deduplicated when the requested moment is already current.

## Anonymous authentication requirement

Local `supabase/config.toml` enables anonymous identities. This setting does not configure the linked development project. Anonymous authentication must be enabled separately in that project's Supabase Auth settings and explicitly confirmed before Stage C can pass. Until it is confirmed, anonymous join and identity recovery remain unvalidated.

## Stage B.5 reliability position

The template parity and simulated traversal checks protect content and activity structure. TypeScript and the production build protect compilation. Database tests protect tenant isolation and the initial locking invariant.

Browser verification requires a freshly restarted development server after a production build replaces `.next`. HTML alone is not sufficient: client hydration, interactions, console output and visual state must be checked.

## Stage C responsibilities

Stage C should connect the existing experience to one server-authoritative live-session workflow. Its responsibilities are:

1. Facilitator session creation from a registered template.
2. Collision-resistant join codes and a public `/thinklab/join` route.
3. Participant identity creation and reconnect credentials appropriate to the approved authentication model.
4. Server-side participant, release and response operations.
5. Realtime synchronization for facilitator releases, pause/resume and participant progress.
6. Controlled migration from browser-local prototype state to database state without running two sources of truth.
7. Shared resolved-moment presentation for participant, facilitator preview and later projector/replay consumers.
8. Integration and RLS tests for all new write paths.
9. Recovery behaviour for refreshes, dropped connections and duplicate submissions.

Stage C should not add analytics, grading, groups, chat, reports or native audio. Those capabilities should follow only after the core classroom state machine is reliable.

## Realistic Stage C risks

| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| Local and server state temporarily compete | Medium | High | Switch each workflow atomically; do not dual-write or silently merge |
| A participant reads or changes another participant's data | Low | Critical | Add operation-specific RLS and test with real authenticated identities |
| A late or duplicated realtime event regresses progression | Medium | High | Make server state authoritative and updates idempotent/versioned |
| Refresh loses participant identity or locked work | Medium | High | Use durable reconnect identity and test refresh at every locked moment |
| Join-code guessing exposes a live class | Medium | High | Use high-entropy codes, rate limiting and session-status checks |
| Facilitator release and participant display diverge | Medium | High | Persist release transactions first, then broadcast database-confirmed state |
| Template versions change during a live session | Low | High | Pin every session to an immutable template key and version |
| Stale client bundles prevent hydration after deployment | Low | High | Add deployed smoke tests that exercise real controls, not HTTP status alone |
| Realtime subscriptions leak across organisations | Low | Critical | Scope channels and database reads by session plus RLS; test cross-tenant subscriptions |
| Accessibility regresses in dynamic states | Medium | Medium | Test keyboard, focus, announcements and reduced motion with every workflow |

## Development rules

The product principles in `docs/product-principles.md` govern future decisions. Database migrations remain additive and tested against both fresh and linked environments. Service-role credentials are limited to controlled provisioning and must never be exposed through browser code or `NEXT_PUBLIC_` variables.
