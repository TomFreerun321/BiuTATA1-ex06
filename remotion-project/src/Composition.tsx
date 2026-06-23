import React from 'react';
import { AbsoluteFill, Series } from 'remotion';
import { Scene1Threat } from './scenes/Scene1Threat';
import { Scene2Solution } from './scenes/Scene2Solution';
import { Scene3Result } from './scenes/Scene3Result';

export const DroneWatchComposition: React.FC = () => {
  return (
    <AbsoluteFill>
      <Series>
        {/* Scene 1: The Threat — 0 to 20s (600 frames @ 30fps) */}
        <Series.Sequence durationInFrames={600}>
          <Scene1Threat />
        </Series.Sequence>

        {/* Scene 2: The Solution — 20s to 40s */}
        <Series.Sequence durationInFrames={600}>
          <Scene2Solution />
        </Series.Sequence>

        {/* Scene 3: The Result — 40s to 60s */}
        <Series.Sequence durationInFrames={600}>
          <Scene3Result />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
