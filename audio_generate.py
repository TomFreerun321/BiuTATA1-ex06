"""
DRONEWATCH — Audio Generation Script
Generates all programmatic audio assets for the video using Python stdlib only.
Run from the dronewatch/ directory:
    python3 audio_generate.py
"""
import wave
import struct
import math
import random

SR = 44100
OUT = "remotion-project/public/"


def write_wav(path: str, frames: list[int], channels: int = 1) -> None:
    with wave.open(path, "w") as f:
        f.setnchannels(channels)
        f.setsampwidth(2)
        f.setframerate(SR)
        f.writeframes(struct.pack(f"<{len(frames)}h", *frames))


def generate_siren(duration: int = 62) -> list[int]:
    """Oscillating 800–1600 Hz alert siren."""
    frames = []
    for i in range(SR * duration):
        t = i / SR
        freq = 800 + 400 * math.sin(2 * math.pi * t / 2)
        freq2 = freq * 1.25
        amp = 0.6
        s = amp * (0.7 * math.sin(2 * math.pi * freq * t) + 0.3 * math.sin(2 * math.pi * freq2 * t))
        if t < 0.5:
            s *= t / 0.5
        elif t > duration - 0.5:
            s *= (duration - t) / 0.5
        frames.append(int(s * 32767))
    return frames


def generate_ambient(duration: int = 62) -> list[int]:
    """Low-frequency battlefield ambient hum."""
    frames = []
    prev = 0.0
    for i in range(SR * duration):
        t = i / SR
        rumble = (
            0.15 * math.sin(2 * math.pi * 40 * t)
            + 0.10 * math.sin(2 * math.pi * 80 * t)
            + 0.08 * math.sin(2 * math.pi * 120 * t)
        )
        noise = random.uniform(-1, 1) * 0.06
        prev = prev * 0.95 + noise * 0.05
        s = rumble + prev
        if t < 1.0:
            s *= t
        elif t > duration - 1.0:
            s *= duration - t
        frames.append(max(-32767, min(32767, int(s * 32767))))
    return frames


def generate_drone_buzz(duration: int = 17) -> list[int]:
    """Mechanical quadcopter propeller buzz, volume rises as drone approaches."""
    frames = []
    for i in range(SR * duration):
        t = i / SR
        vol = (t / duration) ** 0.7 * 0.9
        base_f = 85 + 3 * math.sin(2 * math.pi * 0.3 * t)
        s = 0.0
        for h, w in [(1, 1.0), (2, 0.55), (3, 0.35), (4, 0.22), (6, 0.12), (8, 0.07)]:
            flutter = 1 + 0.008 * math.sin(2 * math.pi * (h * 2.1) * t)
            s += vol * w * math.sin(2 * math.pi * base_f * h * flutter * t)
        s += vol * 0.15 * math.sin(2 * math.pi * 1800 * t)
        s += vol * 0.075 * math.sin(2 * math.pi * 2400 * t)
        if t < 0.2:
            s *= t / 0.2
        if t > duration - 0.3:
            s *= (duration - t) / 0.3
        frames.append(max(-32767, min(32767, int(s * 28000))))
    return frames


def generate_impact(duration: int = 3) -> list[int]:
    """Explosion impact: initial crack, low boom, shockwave, rumble tail."""
    frames = []
    for i in range(SR * duration):
        t = i / SR
        s = 0.0
        if t < 0.08:
            s += math.exp(-t * 80) * random.gauss(0, 1)
        boom_f = 55 * math.exp(-t * 2.5) + 30
        s += math.exp(-t * 4) * 0.9 * math.sin(2 * math.pi * boom_f * t)
        s += math.exp(-t * 4) * 0.36 * math.sin(2 * math.pi * boom_f * 2 * t)
        s += random.gauss(0, 1) * math.exp(-t * 3) * 0.3
        if 0.03 < t < 0.12:
            sw_t = t - 0.03
            s += math.sin(2 * math.pi * 80 * sw_t) * math.exp(-sw_t * 40) * 0.6
        frames.append(max(-32767, min(32767, int(s * 30000))))
    return frames


def generate_action_music(duration: int = 22) -> list[int]:
    """Dramatic military action score: kick, snare, hi-hat, bass, strings, brass."""
    random.seed(42)
    noise_buf = [random.gauss(0, 1) for _ in range(SR * duration + 100)]
    frames = []
    for i in range(SR * duration):
        t = i / SR
        s = 0.0
        # Kick drum (120 BPM)
        kp = t % 0.5
        if kp < 0.30:
            k_freq = 90 * math.exp(-kp * 30) + 40
            s += math.sin(2 * math.pi * k_freq * kp) * math.exp(-kp * 18) * 0.85
        # Snare (offbeats)
        sp = (t + 0.25) % 0.5
        if sp < 0.18:
            s += (noise_buf[i] * 0.18 + math.sin(2 * math.pi * 200 * sp) * 0.08) * math.exp(-sp * 28) * 0.5
        # Hi-hat (8th notes)
        hp = t % 0.25
        if hp < 0.04:
            s += noise_buf[(i + 7777) % len(noise_buf)] * math.exp(-hp * 120) * 0.18
        # Bass
        b_env = min(t / 2.0, 1.0) * 0.28
        s += b_env * (math.sin(2 * math.pi * 55 * t) + 0.4 * math.sin(2 * math.pi * 110 * t))
        # Strings (from 3s)
        if t > 3.0:
            s_env = min((t - 3.0) / 5.0, 0.38)
            for di, w in [(-0.025, 1.0), (-0.012, 0.85), (0, 1.0), (0.012, 0.85), (0.025, 0.7)]:
                vib = 1.0 + 0.004 * math.sin(2 * math.pi * 5.5 * t)
                f1 = 220 * (1 + di) * vib
                s += s_env * w * (0.055 * math.sin(2 * math.pi * f1 * t) + 0.025 * math.sin(2 * math.pi * f1 * 2 * t))
        # Brass (from 9s)
        if t > 9.0:
            bt = t - 9.0
            b_env2 = min(bt / 5.0, 0.42) * (0.75 + 0.25 * math.sin(2 * math.pi * 0.4 * t))
            for f_m, w in [(1, 0.10), (2, 0.06), (3, 0.03), (4, 0.015)]:
                s += b_env2 * w * math.sin(2 * math.pi * 220 * f_m * t)
        # Crescendo (last 4s)
        if t > 18.0:
            ct = (t - 18.0) / 4.0
            s += ct * (0.12 * math.sin(2 * math.pi * 330 * t) + 0.06 * math.sin(2 * math.pi * 660 * t))
        # Master envelope
        env = 1.0
        if t < 0.3:
            env = t / 0.3
        if t > duration - 0.5:
            env = (duration - t) / 0.5
        frames.append(max(-32767, min(32767, int(s * env * 30000))))
    return frames


if __name__ == "__main__":
    print("Generating DRONEWATCH audio assets...")

    write_wav(OUT + "siren.wav", generate_siren())
    print("  ✓ siren.wav")

    write_wav(OUT + "ambient.wav", generate_ambient())
    print("  ✓ ambient.wav")

    write_wav(OUT + "scene1-drone.wav", generate_drone_buzz())
    print("  ✓ scene1-drone.wav")

    write_wav(OUT + "scene1-impact.wav", generate_impact())
    print("  ✓ scene1-impact.wav")

    write_wav(OUT + "scene1-action.wav", generate_action_music())
    print("  ✓ scene1-action.wav")

    print("\nAll audio assets generated successfully.")
    print("Note: yt-audio.wav (main background) must be downloaded separately via yt-dlp.")
