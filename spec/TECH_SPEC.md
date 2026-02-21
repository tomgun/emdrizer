# TECH_SPEC

Purpose: define *how* we will build it with enough clarity to implement incrementally and testably.

## Scope
- In scope: Moving eye target (KITT + therapist finger), speed/presets, screen-size–dependent instructions; web and mobile-friendly.
- Out of scope: Backend, user accounts, full clinical protocol, real therapist video.

## Features in scope (IDs)
- Feature registry: `spec/FEATURES.md`
- Implemented by this spec:
  - F-0001 (KITT view)
  - F-0002 (Therapist finger view)
  - F-0003 (Speed and presets)
  - F-0004 (Screen-size instructions)

## NFRs in scope (IDs) (optional but recommended)
- NFR registry: `spec/NFR.md`
- Addressed by this spec:
  - NFR-####

## Architecture overview
- Style: Frontend-only; single-page or multi-route app. No backend required initially.
- Key constraints from `STACK.md`: Web/mobile responsive; research-based speed presets; no GPL/AGPL deps.
- Diagrams: TBD in `docs/architecture/diagrams/` when needed.

## Architecture changelog
Track major architectural changes over time:

### YYYY-MM-DD: [Change description]
- Reason: <!-- why the change was made, link to ADR if applicable -->
- Affected features: <!-- F-#### IDs -->
- Migration status: <!-- planned | in-progress | complete -->
- Breaking changes: <!-- yes/no, describe if yes -->

## Components (responsibilities + boundaries)
- ComponentA:
  - Responsibilities:
  - Inputs/outputs:
  - Test seam:
- ComponentB:

## Data model / state
- Entities/state:
- Persistence:

## Interfaces
- External APIs:
- Internal module interfaces:

## Error handling & failure modes
- Failure mode:
  - Detection:
  - Handling:
  - Test:

## Testing strategy (required)
- Unit tests: what is unit-tested and where
- Integration tests (if any):
- Acceptance/E2E tests (if any):
- Non-functional testing (if relevant):
  - Performance:
  - Security:
  - Reliability:

## Observability (if relevant)
- Logs/metrics/traces:

## Rollout & migration (if relevant)
- Steps:
- Backwards compatibility:

## Risks & open questions
- Risk:
- Question:


