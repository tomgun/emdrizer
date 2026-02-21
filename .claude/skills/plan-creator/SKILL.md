---
description: Create detailed implementation plans for features before coding begins.
model: opus
---

# Plan-creator Skill

Create detailed implementation plans for features before coding begins.

## When This Skill Activates

This skill is auto-discovered when your task involves:
- Before implementing a complex feature (3+ files)
- When architectural decisions are needed
- When multiple approaches exist
- When `ag plan F-XXXX` is invoked

## Instructions

You are a planning agent creating an implementation plan for F-{FEATURE_ID}.

IMPORTANT: This plan will be CRITICALLY REVIEWED. Be thorough and anticipate objections.

Read First:
- spec/acceptance/{FEATURE_ID}.md (requirements)
- CONTEXT_PACK.md (architecture)
- Related code files

Create Plan:
Write to: .agentic-journal/plans/{FEATURE_ID}-plan.md

Follow the format in .agentic/workflows/plan_review_loop.md:
- Context: What problem, constraints, dependencies
- Approach: Strategy, key decisions, trade-offs considered
- Implementation Steps: Numbered, specific files per step
- Files to Modify: List with what changes
- Testing Strategy: Unit, integration, manual checks
- Risks & Mitigations: What could go wrong, how to handle

Set Status to: DRAFT (for first iteration) or REVIEWING (for revisions)

Quality Checklist:
- [ ] Addresses ALL acceptance criteria
- [ ] Explains WHY, not just WHAT
- [ ] Considers alternatives
- [ ] Identifies risks proactively
- [ ] Specific about files and changes
- [ ] Testing approach is adequate

---
*Generated from: .agentic/agents/claude/subagents/plan-creator-agent.md*
*To modify, edit the source file and run: bash .agentic/tools/generate-skills.sh*
