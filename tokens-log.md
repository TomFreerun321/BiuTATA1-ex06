# Token Usage Log — DRONEWATCH Production

Model: **claude-sonnet-4-6**

## Pricing Reference (Sonnet 4.6)
| Token Type | Price per 1M tokens |
|------------|-------------------|
| Input | $3.00 |
| Output | $15.00 |
| Cache Write | $3.75 |
| Cache Read | $0.30 |

---

## Session Log

| Session | Date | Input | Output | Cache Write | Cache Read | Cost (USD) | Notes |
|---------|------|-------|--------|-------------|------------|------------|-------|
| 001 — Planning & Setup | 2026-06-23 | TBD | TBD | TBD | TBD | TBD | PRD, PLAN, TODO, script, JSON |
| 002 — Remotion Build | TBD | TBD | TBD | TBD | TBD | TBD | Scene components |
| 003 — Iteration | TBD | TBD | TBD | TBD | TBD | TBD | Refinements |
| 004 — Audio | TBD | TBD | TBD | TBD | TBD | TBD | Audio integration |
| **TOTAL** | | | | | | **TBD** | |

---

## Cost Analysis
*(To be completed after production)*

### Efficiency Notes
- Cache reads are ~10x cheaper than fresh input — large system prompts cached across turns significantly reduce cost
- Haiku model used for simple formatting tasks where possible
- Precise prompts reduce iteration count → fewer tokens consumed

### Discussion
*(To be completed — comparison of estimated vs actual cost)*
