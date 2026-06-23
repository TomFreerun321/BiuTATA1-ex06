# PLAN — DRONEWATCH Video Production

## Architecture Overview

```
dronewatch/
├── PRD.md
├── PLAN.md
├── TODO.md
├── prompts.md
├── tokens-log.md
├── script.fountain
├── scenes.json
├── remotion-project/        ← Remotion app (npx create-video@latest)
│   ├── src/
│   │   ├── Root.tsx
│   │   ├── Composition.tsx
│   │   ├── scenes/
│   │   │   ├── Scene1Threat.tsx
│   │   │   ├── Scene2Solution.tsx
│   │   │   └── Scene3Result.tsx
│   │   └── components/
│   │       ├── RadarPulse.tsx
│   │       ├── SoldierIcon.tsx
│   │       ├── DroneIcon.tsx
│   │       └── TextReveal.tsx
│   ├── public/
│   │   └── audio/
│   │       ├── siren.mp3
│   │       └── ambient.mp3
│   └── package.json
└── README.md
```

## Scene Design

### Scene 1 — THE THREAT (0–20s, frames 0–600)
- Background: dark olive/charcoal military tones
- Soldier silhouettes moving on open ground (SVG animations)
- Drone icon approaches from top-right with trajectory line
- Red warning flash on drone contact
- Text: "FIBER OPTIC DRONES" slides in from left
- Text: "Silent. Precise. Lethal." fades in below

### Scene 2 — DRONEWATCH ACTIVATED (20–40s, frames 600–1200)
- Background transitions to dark tactical blue
- DRONEWATCH logo animates in from center
- Radar rings pulse outward: 100m → 200m → 400m → 500m
- Siren wave animation (audio waveform visual)
- Text: "400–500M DETECTION RADIUS"
- Soldier icons react — move toward armored vehicle icons
- Color: green progress bars showing soldiers secured

### Scene 3 — SOLDIERS PROTECTED (40–60s, frames 1200–1800)
- Background: battlefield, empty
- Armored vehicles and buildings shown with soldiers inside
- Drone approaches — hits a wall — explosion particle effect
- Text: "EMPTY BATTLEFIELD"
- Final card: "DRONEWATCH" logo full screen
- Tagline: "BECAUSE EVERY SECOND COUNTS"

## Technical Decisions

| Decision | Choice | Reason |
|----------|--------|--------|
| Framework | Remotion | Code-based video, scriptable, version-controlled |
| Language | TypeScript/React | Native Remotion support |
| Styling | CSS-in-JS + SVG | No external image dependencies |
| Audio | MP3 embedded | Cross-platform render support |
| Resolution | 1920×1080 | HD standard |
| FPS | 30 | Smooth animation, standard for video |
| Duration | 1800 frames | 60 seconds × 30fps |

## Prompt Injection Risk Mitigation
The `scenes.json` file is parsed and passed to Remotion components. Risk: malicious content in JSON string fields could be rendered as raw HTML/JS via `dangerouslySetInnerHTML`. Mitigation: all text fields rendered via React text nodes only — never as HTML. JSON is validated against a schema before use.

## Extensibility Notes
- Each scene is a self-contained React component → easy to swap, reorder, or add scenes
- `scenes.json` drives all text content → change video copy without touching component code
- RadarPulse component accepts radius/color props → reusable for other detection-radius visualizations
