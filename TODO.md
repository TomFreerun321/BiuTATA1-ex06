# TODO — DRONEWATCH Production Checklist

## Phase 1: Planning & Script
- [x] Create project folder `dronewatch/`
- [x] Initialize Git repository
- [x] Write PRD.md
- [x] Write PLAN.md
- [x] Write TODO.md
- [x] Write Fountain script (`script.fountain`)
- [x] Create `scenes.json` (3-scene JSON data file)
- [x] Create `prompts.md` (log all prompts)

## Phase 2: Infrastructure
- [x] Run `npx create-video@latest --blank` inside `remotion-project/`
- [x] Run `npx skills add remotion-dev/skills`
- [x] Verify Remotion dev server starts (`npx remotion studio`)
- [x] First Git commit: "chore: initialize Remotion project"

## Phase 3: Build — Scene Components
- [x] Build `Scene1Threat.tsx` — drone attack sequence
- [x] Build `Scene2Solution.tsx` — radar pulse + siren alert
- [x] Build `Scene3Result.tsx` — empty battlefield + drone hits wall
- [x] Build `RadarPulse.tsx` component
- [x] Build `DroneIcon.tsx` SVG component
- [x] Build `SoldierIcon.tsx` SVG component
- [x] Build `TextReveal.tsx` animation component
- [x] Wire all scenes in `Composition.tsx`
- [x] Git commit: "feat: add all 3 scenes"

## Phase 4: Audio
- [x] Generate siren alert audio (Python wave module — oscillating 800–1600Hz)
- [x] Generate battlefield ambient audio (Python — 40/80/120Hz hum + noise)
- [x] Embed audio in Remotion composition (`@remotion/media` Audio + Sequence)
- [x] Git commit: "feat: add audio soundtrack"

## Phase 5: Review & Render
- [x] Preview full video in `npx remotion studio`
- [x] Iterate on timing, animations, text
- [x] Git commit: "fix: timing and animation refinements"
- [x] Render final MP4: `npx remotion render` → output.mp4 (7.1 MB)
- [x] Git commit: "feat: add final render output.mp4"

## Phase 6: Documentation & Submission
- [x] Complete `tokens-log.md` with full session data and cost analysis
- [x] Write `README.md` (full report — all 10 grading criteria covered)
- [x] Create GitHub repo via `gh repo create`
- [x] Push all commits
- [x] Final verification: all 10 grading criteria covered
- [ ] Submit GitHub link
