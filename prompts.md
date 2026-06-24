# Prompts Log — DRONEWATCH Production

All prompts used during production, in order. Model: claude-sonnet-4-6

---

## PROMPT 001 — Mission Brief & Strategy
**Stage:** Planning
**Tool:** Claude Code (claude-sonnet-4-6)
**Prompt:**
> "The topic is soldiers in the IDF, a solution for protecting against drones attacking from the sky (fiber optic drones). The product is a sound and motion detection system that will provide a warning to soldiers by sound (a siren that will alert them within a 400-500 meter radius). The drone detects the drone, activates a siren, the soldiers have 15-30 seconds to enter armored vehicles or fortified buildings — and the drone arrives and finds an empty battlefield. Create a PRD, PLAN, TODO, Fountain script, and scenes.json for a 60-second Remotion video. Military aesthetic, dark tones, tactical UI."

**Result:** Full project scaffold created — PRD.md, PLAN.md, TODO.md, script.fountain, scenes.json, prompts.md

**Skills active:** None yet

---

## PROMPT 002 — Remotion Bootstrap
**Stage:** Infrastructure
**Tool:** Claude Code + remotion-dev/skills
**Prompt:**
> "Set up the Remotion project. Run npx create-video@latest --blank inside remotion-project/. Then inject the remotion-dev/skills knowledge base. Create Root.tsx registering the DroneWatch composition at 1920×1080, 30fps, 1800 frames. Create index.ts entry point. Make sure the dev server can start."

**Result:** Remotion project initialized, skills injected, Root.tsx and index.ts created, dev server confirmed running.

**Skills active:** remotion-dev/skills (SKILL.md, ~14,800 tokens)

---

## PROMPT 003 — Scene 1: The Threat
**Stage:** Build
**Tool:** Claude Code + remotion-dev/skills
**Prompt:**
> "Build Scene1Threat.tsx. Dark night battlefield (#0a0a0a). Three IDF soldier silhouettes (SVG, olive drab) walk on open ground — fade in one by one. A fiber optic drone (SVG, red) flies in from top-right starting at frame 180, accelerates toward soldiers. Red screen flash at frame 510. Soldiers shake after frame 480. Text reveals: 'THE THREAT' (red, top), 'FIBER OPTIC DRONES' (white, large), 'Silent. Precise. Lethal.' (grey), 'NO WARNING. NO TIME.' (red, bottom, at frame 480). Also create DroneIcon.tsx as a reusable SVG component with x/y/size/color/rotation props, and TextReveal.tsx with fade+slide-up animation."

**Result:** Scene1Threat.tsx, DroneIcon.tsx, TextReveal.tsx created. Drone trajectory line added. Star field night sky added.

**Iterations:** 1 pass — accepted as-is.

---

## PROMPT 004 — Scene 2: DRONEWATCH Activated
**Stage:** Build
**Tool:** Claude Code + remotion-dev/skills
**Prompt:**
> "Build Scene2Solution.tsx. Full tactical green-on-black radar HUD. Radar center at (960, 520), max radius 380px. Concentric range rings at 100/200/300/400/500m, appear one by one. Rotating sweep line (full 360 every 90 frames). Drone blip enters at frame 160 from top-right, closes in. Alert triggers at frame 175 — blip turns red, flashes, pulse ring expands. Left panel: SYSTEM STATUS with 6 rows (acoustic sensor, motion detect, siren output, network, power, GPS). Right panel: THREAT DATA with 6 rows. Top bar with uptime counter. Bottom bar with system tags. Detection time counter in ms. Siren waveform bars at bottom after frame 190. Also create RadarPulse.tsx as a standalone component. DRONEWATCH logo bottom center. Font: monospace throughout."

**Result:** Scene2Solution.tsx created — full tactical HUD with sweep animation, dual data panels, live detection timer, siren waveform, alert banner. RadarPulse.tsx created as standalone component.

**Iterations:** 1 pass — full acceptance.

---

## PROMPT 005 — Scene 3: Soldiers Protected + Composition
**Stage:** Build
**Tool:** Claude Code + remotion-dev/skills
**Prompt:**
> "Build Scene3Result.tsx. Dark green background (#050a05). Show armored vehicle (SVG) on left and fortified building (SVG) on right, both fading in from frame 0. Drone approaches from top, frames 80-200, toward center. Explosion (radial gradient, scale animation) at frame 200. Text 'DRONE: NEUTRALIZED' in red at frame 230. Soldiers visible in vehicle window and building windows after frame 260 (small circles + 'SECURED'/'FORTIFIED' labels in green). Final card at frame 380: full-screen black, DRONEWATCH logo at 96px, tagline 'BECAUSE EVERY SECOND COUNTS', subtitle 'PROTECTING THOSE WHO PROTECT US'. Also create SoldierIcon.tsx as a reusable SVG component. Wire all 3 scenes in Composition.tsx using Remotion Series."

**Result:** Scene3Result.tsx, SoldierIcon.tsx created. Composition.tsx wired with Series sequencing all 3 scenes.

**Iterations:** 1 pass.

---

## PROMPT 006 — Audio Integration + Final Render
**Stage:** Audio + Render
**Tool:** Claude Code + Python
**Prompt:**
> "Generate audio files for the DRONEWATCH video. Create siren.wav: oscillating siren between 800-1600Hz, 62 seconds, using Python's wave module — no external libraries. Create ambient.wav: low battlefield hum at 40/80/120Hz with filtered noise, 62 seconds. Place both in remotion-project/public/. Update Composition.tsx to include Remotion Audio components: ambient plays from frame 0 at volume 0.35, siren delayed to frame 600 (Scene 2) at volume 0.7. Then render the final MP4."

**Result:** siren.wav and ambient.wav generated. Composition.tsx updated with Audio components. Final MP4 rendered successfully.

**Skills used:**
- remotion-dev/skills — `audio.md` rule referenced for staticFile() usage and Audio component API

---

## Skills Summary

| Skill | Activated | Purpose |
|-------|-----------|---------|
| remotion-dev/skills | Session 002 | Remotion architecture, composition patterns, audio API, Series usage |

---

*This file was updated in real time throughout production.*
