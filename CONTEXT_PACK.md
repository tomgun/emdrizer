# CONTEXT_PACK.md

Purpose: compact starting point for any agent/human so they don't need to reread the whole repo.

## One-minute overview

- **What this repo is**: Web/mobile app for self-EMDR: moving eye target (KITT + therapist-finger views), adjustable speed with research-based presets, screen-size–dependent instructions.
- **Main user workflow**: Open app → (optional) read instructions → choose view (KITT or therapist finger) and speed preset → follow moving target with eyes.
- **Current top priorities**: See `STATUS.md`. Initial features F-0001–F-0004 (views, speed/presets, instructions).

## Where to look first (map)

- Entry points: `index.html`, `src/main.tsx`
- Core modules: `KittTarget.tsx`, `TherapistFingerTarget.tsx`, `Instructions.tsx` (viewport ≥768px = desktop copy), `speedPresets.ts`, `useViewportWidth.ts`
- Specs: `spec/`
- Features: `spec/FEATURES.md`
- Overview: `OVERVIEW.md`
- Decisions: `spec/adr/`
- Status: `STATUS.md`

## How to run

- Setup: `npm install`
- Run: `npm run dev`
- Test: `npm test`
- Build: `npm run build`

## Architecture snapshot

- **Components**: Target view (KITT + therapist finger), speed/preset control, instruction panel (responsive), app shell. TBD at implementation.
- **Data flow**: User selects view and speed → animation loop runs at chosen Hz; instruction copy selected by viewport breakpoints.
- **External dependencies**: None required initially (optional: asset CDN, analytics later).

## EMDR research notes (for implementation)

- **Speed**: Standard 1 Hz; fast (processing) ~1–1.2 Hz; slow (resource) 0.2–0.5 Hz. One “cycle” = left–right–left.
- **Screen/distance**: Large screen — sit slightly closer than screen width, center at eye level. Mobile — landscape, hold close for comfortable eye movement; head still, eyes only.
- **Safety**: No rapid flashing; smooth motion only. Self-use for mild distress (1–6); 7+ suggest professional support (can be mentioned in instructions).

## Code style examples

TBD once stack is chosen. Prefer: clear names, small functions, tests for speed/preset logic and instruction selection.
