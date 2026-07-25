# ThinkLab Stage D manual verification

Verified against the local Supabase stack and Next.js development server on
2026-07-25.

## Facilitator control room

- [x] Authorized facilitator sees the active session, title, join code, and status.
- [x] Current challenge and moment are visible.
- [x] Participant View matches the released participant content.
- [x] Next advances the facilitator, participant, and projector views after polling.
- [x] Previous is disabled at the first moment.
- [x] Pause, resume, close, and end controls are surfaced with state-aware availability.
- [x] End requires confirmation and produces an ended state in every view.
- [x] Response progress displays submitted and waiting totals.
- [x] Participant list displays names and per-participant progress states.
- [x] Empty participant state is explicit.

## Participant experience

- [x] The participant view follows the canonical released moment after refresh/polling.
- [x] Earlier selected response and confidence are shown in decision context.
- [x] The evidence-card moment requires exactly two selections before confirmation.
- [x] Confirmed evidence cards become immutable.
- [x] The locked two-card selection remains locked after browser reload.
- [x] Paused, closed, and ended session states prevent further response changes.

## Projector

- [x] Projector URL opens independently from the facilitator control room.
- [x] Projector follows the current released moment.
- [x] Projector exposes no facilitator identity, participant names, private controls, or response data.
- [x] Projector shows a neutral ended-session state.

## Multi-participant and authorization coverage

- [x] Two disposable participant records were used to verify submitted/waiting counts and participant-list states.
- [x] Database assertions verify cross-participant response isolation.
- [x] Database assertions verify that participants cannot call facilitator controls.
- [x] Database assertions verify organization/facilitator authorization boundaries.

The local browser driver uses one shared cookie context, so separate simultaneous
authenticated participant identities were exercised through database-backed
participant records rather than independent cookie jars. The authorization and
isolation paths are additionally enforced by the Stage D pgTAP assertions.
