# Music & Audio Content — DRONEWATCH

## Background Music

**Source:** YouTube — Hans Zimmer style military/cinematic instrumental
**Track used:** Downloaded via `yt-dlp` from: https://www.youtube.com/watch?v=Ci1S5fqBAqU
**Duration used:** First 60 seconds of track
**Role in video:** Main background music throughout all 3 scenes (82% volume)

**Musical style:** Dark orchestral cinematic — slow tension build, heavy percussion, brass swells. Military/action tone matching the battlefield narrative.

---

## Programmatic Sound Effects

All SFX generated via `audio_generate.py` using Python's built-in `wave` module (no external libraries).

| File | Style | Technique |
|------|-------|-----------|
| `siren.wav` | Military alert siren | Oscillating sine wave 800–1600 Hz, modulated at 0.5 Hz |
| `ambient.wav` | Battlefield ambient hum | Layered 40/80/120 Hz sine waves + low-pass filtered white noise |
| `scene1-drone.wav` | Quadcopter propeller buzz | 85 Hz base + 8 harmonics, frequency wobble, volume envelope rising |
| `scene1-impact.wav` | Explosion / strike | Noise crack + pitch-dropping boom (90→40 Hz) + shockwave transient |
| `scene1-action.wav` | Military action score | Kick drum (120 BPM) + snare + hi-hat + bass + strings ensemble + brass swell + crescendo |

---

## Audio Prompts (for Suno AI alternative)

If regenerating with Suno AI instead of programmatic generation, use these prompts:

**Siren SFX:**
> *"Military alert siren, rising and falling tone 800 to 1600 Hz, urgent warning sound, no music, SFX only, 10 seconds, loop-ready"*

**Drone buzz:**
> *"Quadcopter drone propeller buzz, mechanical, getting louder as drone approaches, no music, SFX, 15 seconds"*

**Explosion impact:**
> *"Military explosion impact, initial crack, deep low-frequency boom, shockwave rumble, 3 seconds, cinematic SFX"*

**Action score:**
> *"Dark military cinematic score, 120 BPM, tension build, heavy percussion, orchestra strings, brass swell, no lyrics, 22 seconds"*

---

## Audio Mixing (Composition.tsx)

| Track | Start Frame | Volume | Notes |
|-------|-------------|--------|-------|
| `yt-audio.wav` | 0 | 0.82 | Main music throughout |
| `scene1-drone.wav` | 180 (6s) | 0.55 | Drone enters frame |
| `scene1-impact.wav` | 510 (17s) | 0.90 | Strike moment |
| `siren.wav` | 600 (20s) | 0.65 → 0.20 | Scene 2 full, fades for Scene 3 |

---

## Voice-Over

No voice-over was used in this production. The narrative is carried entirely through on-screen text reveals (Fountain script → scenes.json → TextReveal component) combined with the musical score and sound effects.

**If adding voice-over (ElevenLabs prompt):**
> *"Military documentary narrator, deep authoritative voice, slow and deliberate delivery. Scene 1: 'Fiber optic drones — silent, precise, lethal. No warning. No time.' Scene 2: 'DRONEWATCH detects the threat. Soldiers alerted in under 3 seconds.' Scene 3: 'Empty battlefield. Drone neutralized. Every soldier safe.'"*
