# TODO — DRONEWATCH Production Checklist

## Phase 1: Planning & Script
- [x] Create project folder `dronewatch/`
- [x] Initialize Git repository
- [x] Write PRD.md
- [x] Write PLAN.md
- [x] Write TODO.md
- [ ] Write Fountain script (`script.fountain`)
- [ ] Create `scenes.json` (3-scene JSON data file)
- [ ] Create `prompts.md` (log all prompts)

## Phase 2: Infrastructure
- [ ] Run `npx create-video@latest --blank` inside `remotion-project/`
- [ ] Run `npx skills add remotion-dev/skills`
- [ ] Verify Remotion dev server starts (`npx remotion studio`)
- [ ] First Git commit: "chore: initialize Remotion project"

## Phase 3: Build — Scene Components
- [ ] Build `Scene1Threat.tsx` — drone attack sequence
- [ ] Build `Scene2Solution.tsx` — radar pulse + siren alert
- [ ] Build `Scene3Result.tsx` — empty battlefield + drone hits wall
- [ ] Build `RadarPulse.tsx` component
- [ ] Build `DroneIcon.tsx` SVG component
- [ ] Build `SoldierIcon.tsx` SVG component
- [ ] Build `TextReveal.tsx` animation component
- [ ] Wire all scenes in `Composition.tsx`
- [ ] Git commit: "feat: add all 3 scenes"

## Phase 4: Audio
- [ ] Generate siren alert audio (Suno / ElevenLabs / freesound)
- [ ] Generate battlefield ambient audio
- [ ] Embed audio in Remotion composition
- [ ] Git commit: "feat: add audio soundtrack"

## Phase 5: Review & Render
- [ ] Preview full video in `npx remotion studio`
- [ ] Iterate on timing, animations, text
- [ ] Git commit: "fix: timing and animation refinements"
- [ ] Render final MP4: `npx remotion render`
- [ ] Git commit: "feat: add final render output.mp4"

## Phase 6: Documentation & Submission
- [ ] Complete `tokens-log.md` with full session data
- [ ] Write `README.md` (full report with screenshots)
- [ ] Add all screenshots to `README.md`
- [ ] Create GitHub repo via `gh repo create`
- [ ] Push all commits
- [ ] Final verification: all 10 grading criteria covered
- [ ] Submit GitHub link
