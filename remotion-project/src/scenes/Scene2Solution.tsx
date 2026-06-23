import React from 'react';
import { useCurrentFrame, interpolate, Easing, AbsoluteFill } from 'remotion';
import { TextReveal } from '../components/TextReveal';
import { RadarPulse } from '../components/RadarPulse';
import { DroneIcon } from '../components/DroneIcon';

// Scene starts at frame 600 in the full composition, but receives frame=0 here
export const Scene2Solution: React.FC = () => {
  const frame = useCurrentFrame();

  // Logo scale-in
  const logoScale = interpolate(frame, [0, 40], [0.3, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.back(1.5)) });
  const logoOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Siren wave bars
  const sirenActive = frame >= 120;
  const sirenBars = [...Array(20)].map((_, i) => {
    const barHeight = sirenActive ? 20 + Math.abs(Math.sin((frame * 0.4) + i * 0.8)) * 60 : 4;
    return barHeight;
  });

  // Drone enters detection zone from right
  const droneX = interpolate(frame, [180, 320], [1400, 900], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) });
  const droneY = 300;

  // Detection flash when drone enters
  const detectionFlash = frame >= 180 ? interpolate(frame, [180, 195, 220], [0, 0.5, 0], { extrapolateRight: 'clamp' }) : 0;

  // Soldiers moving to safety
  const soldier1X = interpolate(frame, [240, 380], [200, 80], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.quad) });
  const soldier2X = interpolate(frame, [260, 400], [960, 1100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.quad) });
  const soldiersOpacity = interpolate(frame, [220, 260], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: '#020d1a', overflow: 'hidden' }}>

      {/* Grid background — tactical look */}
      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.08 }}>
        {[...Array(20)].map((_, i) => (
          <line key={`h${i}`} x1={0} y1={i * 60} x2={1920} y2={i * 60} stroke="#00aaff" strokeWidth={1} />
        ))}
        {[...Array(35)].map((_, i) => (
          <line key={`v${i}`} x1={i * 60} y1={0} x2={i * 60} y2={1080} stroke="#00aaff" strokeWidth={1} />
        ))}
      </svg>

      {/* Radar pulse — centered */}
      <RadarPulse startFrame={60} color="#00aaff" maxRadius={360} />

      {/* Drone entering zone */}
      {frame >= 150 && <DroneIcon x={droneX} y={droneY} size={60} color="#cc2200" rotation={200} />}

      {/* Detection flash */}
      <div style={{ position: 'absolute', inset: 0, backgroundColor: '#00aaff', opacity: detectionFlash }} />

      {/* Siren waveform */}
      {sirenActive && (
        <div style={{ position: 'absolute', bottom: 180, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 4 }}>
          {sirenBars.map((h, i) => (
            <div key={i} style={{ width: 6, height: h, backgroundColor: '#00ff88', borderRadius: 3, transition: 'height 0.05s' }} />
          ))}
        </div>
      )}

      {/* Soldiers running to cover */}
      {frame >= 220 && (
        <>
          <svg width={40} height={80} viewBox="0 0 40 80" style={{ position: 'absolute', left: soldier1X, top: 700, opacity: soldiersOpacity }}>
            <circle cx={20} cy={12} r={10} fill="#4a5c3a" />
            <ellipse cx={20} cy={8} rx={13} ry={8} fill="#3a4a2a" />
            <rect x={10} y={22} width={20} height={30} rx={3} fill="#4a5c3a" />
            <rect x={11} y={50} width={8} height={22} rx={2} fill="#3a4a2a" />
            <rect x={21} y={50} width={8} height={22} rx={2} fill="#3a4a2a" />
          </svg>
          <svg width={40} height={80} viewBox="0 0 40 80" style={{ position: 'absolute', left: soldier2X, top: 720, opacity: soldiersOpacity }}>
            <circle cx={20} cy={12} r={10} fill="#4a5c3a" />
            <ellipse cx={20} cy={8} rx={13} ry={8} fill="#3a4a2a" />
            <rect x={10} y={22} width={20} height={30} rx={3} fill="#4a5c3a" />
            <rect x={11} y={50} width={8} height={22} rx={2} fill="#3a4a2a" />
            <rect x={21} y={50} width={8} height={22} rx={2} fill="#3a4a2a" />
          </svg>
        </>
      )}

      {/* DRONEWATCH Logo */}
      <div style={{ position: 'absolute', top: 60, width: '100%', textAlign: 'center', transform: `scale(${logoScale})`, opacity: logoOpacity }}>
        <div style={{ fontSize: 72, fontWeight: 900, color: '#ffffff', fontFamily: 'Arial, sans-serif', letterSpacing: '0.2em' }}>
          DRONE<span style={{ color: '#00aaff' }}>WATCH</span>
        </div>
        <div style={{ fontSize: 18, color: '#00aaff', letterSpacing: '0.3em', marginTop: 4 }}>
          GROUND-BASED DRONE EARLY WARNING SYSTEM
        </div>
      </div>

      {/* Stats */}
      <div style={{ position: 'absolute', bottom: 260, width: '100%', textAlign: 'center' }}>
        <TextReveal text="400–500 METER DETECTION RADIUS" startFrame={100} color="#00ff88" fontSize={32} letterSpacing="0.15em" />
      </div>
      <div style={{ position: 'absolute', bottom: 210, width: '100%', textAlign: 'center' }}>
        <TextReveal text="ALERT TIME: UNDER 3 SECONDS" startFrame={130} color="#aaaaaa" fontSize={22} letterSpacing="0.1em" />
      </div>
      {sirenActive && (
        <div style={{ position: 'absolute', bottom: 140, width: '100%', textAlign: 'center' }}>
          <TextReveal text="⚠  SIREN ALERT ACTIVATED  ⚠" startFrame={120} color="#ff4422" fontSize={26} letterSpacing="0.2em" />
        </div>
      )}
    </AbsoluteFill>
  );
};
