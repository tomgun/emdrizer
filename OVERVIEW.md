# OVERVIEW.md

Purpose: high-level product vision. Agents read this during planning.

Document separation:
- **OVERVIEW.md**: What & why we're building (stable) — read during planning
- **CONTEXT_PACK.md**: How to work here (operational) — read at session start
- **STATUS.md**: What's happening now (dynamic) — read at session start

## What We're Building

A simple **web and mobile-friendly app** for **self-administered EMDR** (Eye Movement Desensitization and Reprocessing) practice. The app shows a **moving eye target** that users follow with their eyes to provide bilateral stimulation. It supports **at least two visual styles**: a **KITT car–style** sweeping light and a **therapist finger** (blurred) moving as the target. **Speed is adjustable** with **research-based presets** (processing / standard / resource). **Instructions adapt to screen size** so users can optimize eye movement range (distance and posture) on desktop, tablet, and phone.

## Why It Matters

Self-EMDR tools can support stress reduction and mild emotional processing when used appropriately. Many people lack access to in-person EMDR; a simple, research-informed app can make bilateral stimulation available at home. Clear, screen-size–dependent instructions help users get effective eye movement range instead of small, inefficient movements on a phone held too far away.

## Core Capabilities

- [ ] **F-0001** — KITT car light target view (sweeping left–right)
- [ ] **F-0002** — Therapist finger target view (blurred, moving)
- [ ] **F-0003** — Adjustable speed and research-based presets (Processing / Standard / Resource)
- [ ] **F-0004** — Screen-size–dependent instructions (desktop vs mobile/tablet)

## In Scope / Out of Scope

**In scope:**
- Two target views (KITT, therapist finger)
- Speed control and presets (research-based Hz)
- Responsive layout and screen-size–dependent instructions
- Web-first; mobile-friendly (responsive or PWA)

**Out of scope (for now):**
- Full clinical EMDR protocol (phases, scripting)
- User accounts, persistence, or backend
- Real video of a therapist (only stylized/blurred representation)

## Success Looks Like

- Users can open the app on phone or desktop, choose a view and a speed preset, read instructions suited to their screen size, and follow a smooth moving target for self-practice.
- Speed presets match research (e.g. ~1 Hz standard, fast for processing, slow for resource).
- Instructions clearly tell users how to position themselves for effective eye movement range.

## Guiding Principles

- **Research-informed**: Speed presets and instruction wording based on EMDR literature (e.g. 1 Hz standard, slow for resource installation, distance/posture for eye movement range).
- **Simple first**: Minimal UI; focus on a reliable moving target and clear instructions.
- **Accessible**: No photosensitivity risk (smooth motion, no strobe); instructions readable on small screens.
