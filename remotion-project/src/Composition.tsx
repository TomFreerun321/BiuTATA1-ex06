import React from 'react';
import { AbsoluteFill, Series, Sequence, staticFile } from 'remotion';
import { Audio } from '@remotion/media';
import { Scene1Threat } from './scenes/Scene1Threat';
import { Scene2Solution } from './scenes/Scene2Solution';
import { Scene3Result } from './scenes/Scene3Result';

export const DroneWatchComposition: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* ── MAIN BACKGROUND MUSIC (YouTube audio — full 60s) ── */}
      <Audio src={staticFile('yt-audio.wav')} volume={0.82} />

      {/* ── VOICE-OVER NARRATION ── */}

      {/* Scene 1 VO — starts at frame 90 (3s) */}
      <Sequence from={90}>
        <Audio src={staticFile('vo_scene1.wav')} volume={1.0} />
      </Sequence>

      {/* Scene 2 VO — starts at frame 660 (2s into scene 2) */}
      <Sequence from={660}>
        <Audio src={staticFile('vo_scene2.wav')} volume={1.0} />
      </Sequence>

      {/* Scene 3 VO — starts at frame 1260 (2s into scene 3) */}
      <Sequence from={1260}>
        <Audio src={staticFile('vo_scene3.wav')} volume={1.0} />
      </Sequence>

      {/* ── SCENE 1 SFX ── */}

      {/* Drone mechanical buzz — appears when drone enters frame (frame 180 = 6s) */}
      <Sequence from={180} durationInFrames={330}>
        <Audio src={staticFile('scene1-drone.wav')} volume={0.55} />
      </Sequence>

      {/* Explosion impact at moment of strike (frame 510 = 17s) */}
      <Sequence from={510} durationInFrames={90}>
        <Audio src={staticFile('scene1-impact.wav')} volume={0.9} />
      </Sequence>

      {/* ── SCENE 2 SFX — siren activates at frame 600 (20s)
           Volume fades from 0.65 → 0.20 as Scene 3 begins (f=600 relative to siren start) ── */}
      <Sequence from={600}>
        <Audio
          src={staticFile('siren.wav')}
          volume={(f) =>
            f < 570
              ? 0.65
              : f < 660
              ? 0.65 - ((f - 570) / 90) * 0.45
              : 0.20
          }
        />
      </Sequence>

      {/* ── SCENES ── */}
      <Series>
        <Series.Sequence durationInFrames={600}>
          <Scene1Threat />
        </Series.Sequence>

        <Series.Sequence durationInFrames={600}>
          <Scene2Solution />
        </Series.Sequence>

        <Series.Sequence durationInFrames={600}>
          <Scene3Result />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
