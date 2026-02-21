# FEATURES
<!-- spec-format: features-v0.3.1 -->

**Purpose**: A human + machine readable registry of features with stable IDs, status, and acceptance criteria.

---

## Quick Reference

**Status**: `planned` | `in_progress` | `shipped` | `deprecated`

---

## Features

### F-0005: Therapy session with stages, breaks, and targets
- Parent: none
- Dependencies: F-0001, F-0002, F-0003, F-0004 (session uses existing targets and presets)
- Status: planned
- Acceptance: spec/acceptance/F-0005.md
- Domain: frontend, session flow
- Notes: Session = Preparation → (BLS + Break)* → Closure. Targets = optional label/image/memory to concentrate on. See spec/session-structure.md.

### F-0004: Screen-size–dependent instructions
- Parent: none
- Dependencies: none
- Status: shipped
- Acceptance: spec/acceptance/F-0004.md
- Domain: frontend
- Implementation:
  - State: complete
  - Code: src/Instructions.tsx, src/useViewportWidth.ts
- Tests:
  - Unit: complete (src/Instructions.test.tsx)

### F-0003: Adjustable speed and research-based presets
- Parent: none
- Dependencies: none
- Status: shipped
- Acceptance: spec/acceptance/F-0003.md
- Domain: frontend
- Implementation:
  - State: complete
  - Code: src/speedPresets.ts, src/App.tsx (preset selector)
- Tests:
  - Unit: complete (src/speedPresets.test.ts)

### F-0002: Therapist finger target view
- Parent: none
- Dependencies: none
- Status: shipped
- Acceptance: spec/acceptance/F-0002.md
- Domain: frontend
- Implementation:
  - State: complete
  - Code: src/TherapistFingerTarget.tsx, src/App.tsx (view selector)
- Tests:
  - Unit: complete (src/TherapistFingerTarget.test.tsx)

### F-0001: KITT car light target view
- Parent: none
- Dependencies: none
- Status: shipped
- Acceptance: spec/acceptance/F-0001.md
- Domain: frontend
- Implementation:
  - State: complete
  - Code: src/KittTarget.tsx, src/App.tsx
- Tests:
  - Unit: complete (src/KittTarget.test.tsx)
