import React from 'react';
import { useCurrentFrame, interpolate, Easing, AbsoluteFill } from 'remotion';
import { TextReveal } from '../components/TextReveal';

const CX = 960;
const CY = 520;
const MAX_R = 380;

// Tactical corner bracket
const Corner: React.FC<{ x: number; y: number; rotate: number; color: string }> = ({ x, y, rotate, color }) => (
  <g transform={`translate(${x},${y}) rotate(${rotate})`}>
    <line x1={0} y1={0} x2={30} y2={0} stroke={color} strokeWidth={2} />
    <line x1={0} y1={0} x2={0} y2={30} stroke={color} strokeWidth={2} />
  </g>
);

export const Scene2Solution: React.FC = () => {
  const frame = useCurrentFrame();

  // Boot-up sequence
  const bootOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });

  // Radar sweep rotation — full 360 every 90 frames
  const sweepAngle = (frame / 90) * 360;

  // Range rings appear one by one
  const ring1 = interpolate(frame, [20, 50], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ring2 = interpolate(frame, [40, 70], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ring3 = interpolate(frame, [60, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ring4 = interpolate(frame, [80, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ring5 = interpolate(frame, [100, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Drone enters at frame 160 — top right of radar
  const droneDetected = frame >= 160;
  const droneAngle = droneDetected ? interpolate(frame, [160, 320], [45, 90], { extrapolateRight: 'clamp' }) : 45;
  const droneRadius = droneDetected ? interpolate(frame, [160, 320], [MAX_R * 0.95, MAX_R * 0.55], { extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) }) : MAX_R * 0.95;
  const droneRadX = CX + droneRadius * Math.cos((droneAngle * Math.PI) / 180);
  const droneRadY = CY + droneRadius * Math.sin((droneAngle * Math.PI) / 180);

  // Detection alert at frame 175
  const alertActive = frame >= 175;
  const alertFlash = alertActive ? Math.sin(frame * 0.4) > 0 : false;
  const alertOpacity = alertActive ? interpolate(frame, [175, 200], [0, 1], { extrapolateRight: 'clamp' }) : 0;

  // Siren waveform
  const sirenActive = frame >= 190;

  // Sensor status panel
  const statusOpacity = interpolate(frame, [30, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Detection time counter
  const detectionMs = alertActive ? Math.min((frame - 175) * 80, 2400) : 0;

  // Soldiers secured indicator
  const securedOpacity = frame >= 320 ? interpolate(frame, [320, 360], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) : 0;

  const ringOpacities = [ring1, ring2, ring3, ring4, ring5];
  const ringRadii = [MAX_R * 0.2, MAX_R * 0.4, MAX_R * 0.6, MAX_R * 0.8, MAX_R];
  const ringLabels = ['100m', '200m', '300m', '400m', '500m'];

  return (
    <AbsoluteFill style={{ backgroundColor: '#010d0d', overflow: 'hidden', fontFamily: 'monospace' }}>

      {/* Scanline overlay */}
      {[...Array(18)].map((_, i) => (
        <div key={i} style={{ position: 'absolute', top: i * 60, width: '100%', height: 1, backgroundColor: '#00ff8808' }} />
      ))}

      {/* === MAIN RADAR SVG === */}
      <svg width={1920} height={1080} style={{ position: 'absolute', top: 0, left: 0 }}>

        {/* Radar background circle */}
        <circle cx={CX} cy={CY} r={MAX_R + 10} fill="#000d0d" stroke="#00ff4422" strokeWidth={1} opacity={bootOpacity} />

        {/* Cross-hairs */}
        <line x1={CX - MAX_R - 20} y1={CY} x2={CX + MAX_R + 20} y2={CY} stroke="#00ff4420" strokeWidth={1} opacity={bootOpacity} />
        <line x1={CX} y1={CY - MAX_R - 20} x2={CX} y2={CY + MAX_R + 20} stroke="#00ff4420" strokeWidth={1} opacity={bootOpacity} />

        {/* Range rings */}
        {ringRadii.map((r, i) => (
          <g key={i}>
            <circle cx={CX} cy={CY} r={r} fill="none" stroke="#00ff44" strokeWidth={i === 4 ? 1.5 : 0.8}
              strokeDasharray={i === 4 ? 'none' : '4,8'} opacity={ringOpacities[i] * 0.45} />
            {/* Range label — right side */}
            <text x={CX + r + 6} y={CY + 4} fill="#00ff88" fontSize={13} opacity={ringOpacities[i] * 0.9}>{ringLabels[i]}</text>
            {/* Range label — top */}
            <text x={CX + 4} y={CY - r - 6} fill="#00ff88" fontSize={13} opacity={ringOpacities[i] * 0.9}>{ringLabels[i]}</text>
          </g>
        ))}

        {/* Degree ticks around outer ring */}
        {[...Array(36)].map((_, i) => {
          const angle = i * 10 * (Math.PI / 180);
          const inner = MAX_R - (i % 3 === 0 ? 14 : 7);
          return (
            <line key={i}
              x1={CX + inner * Math.cos(angle)} y1={CY + inner * Math.sin(angle)}
              x2={CX + (MAX_R + 2) * Math.cos(angle)} y2={CY + (MAX_R + 2) * Math.sin(angle)}
              stroke="#00ff44" strokeWidth={i % 9 === 0 ? 2 : 0.8} opacity={bootOpacity * 0.6} />
          );
        })}

        {/* Compass labels */}
        {[['N', CX, CY - MAX_R - 28], ['E', CX + MAX_R + 28, CY + 5], ['S', CX, CY + MAX_R + 32], ['W', CX - MAX_R - 32, CY + 5]].map(([label, lx, ly]) => (
          <text key={label as string} x={lx as number} y={ly as number} fill="#00ff88" fontSize={16} fontWeight="bold" textAnchor="middle" opacity={bootOpacity * 0.8}>{label}</text>
        ))}

        {/* Radar sweep — cone of light */}
        {frame > 10 && (() => {
          const rad = (sweepAngle * Math.PI) / 180;
          const x2 = CX + (MAX_R + 5) * Math.cos(rad);
          const y2 = CY + (MAX_R + 5) * Math.sin(rad);
          return (
            <g>
              {/* Sweep line */}
              <line x1={CX} y1={CY} x2={x2} y2={y2} stroke="#00ff88" strokeWidth={2} opacity={0.9} />
              {/* Sweep glow trail */}
              {[10, 25, 45, 65].map((offset, i) => {
                const trailRad = ((sweepAngle - offset) * Math.PI) / 180;
                return (
                  <line key={i} x1={CX} y1={CY}
                    x2={CX + (MAX_R + 5) * Math.cos(trailRad)}
                    y2={CY + (MAX_R + 5) * Math.sin(trailRad)}
                    stroke="#00ff88" strokeWidth={1.5} opacity={0.18 - i * 0.04} />
                );
              })}
            </g>
          );
        })()}

        {/* Center dot */}
        <circle cx={CX} cy={CY} r={5} fill="#00ff88" opacity={bootOpacity} />
        <circle cx={CX} cy={CY} r={10} fill="none" stroke="#00ff88" strokeWidth={1} opacity={bootOpacity * 0.5} />

        {/* === DRONE BLIP === */}
        {droneDetected && (
          <g>
            {/* Blip */}
            <circle cx={droneRadX} cy={droneRadY} r={alertActive ? (alertFlash ? 9 : 6) : 6}
              fill={alertActive ? '#ff2200' : '#ffcc00'} opacity={0.9} />
            {/* Pulse ring on detection */}
            {alertActive && (
              <circle cx={droneRadX} cy={droneRadY}
                r={interpolate(frame, [175, 215], [6, 40], { extrapolateRight: 'clamp' })}
                fill="none" stroke="#ff2200" strokeWidth={2}
                opacity={interpolate(frame, [175, 215], [0.8, 0], { extrapolateRight: 'clamp' })} />
            )}
            {/* Blip label */}
            <text x={droneRadX + 12} y={droneRadY - 8} fill={alertActive ? '#ff4422' : '#ffcc00'} fontSize={12} fontFamily="monospace">
              {alertActive ? '⚠ HOSTILE' : 'TGT-01'}
            </text>
            {/* Coordinates */}
            <text x={droneRadX + 12} y={droneRadY + 6} fill="#aaaaaa" fontSize={10} fontFamily="monospace">
              {`AZ:${Math.round(droneAngle)}° R:${Math.round(droneRadius / MAX_R * 500)}m`}
            </text>
          </g>
        )}

        {/* Corner brackets around radar */}
        {[
          [CX - MAX_R - 15, CY - MAX_R - 15, 0],
          [CX + MAX_R + 15, CY - MAX_R - 15, 90],
          [CX + MAX_R + 15, CY + MAX_R + 15, 180],
          [CX - MAX_R - 15, CY + MAX_R + 15, 270],
        ].map(([bx, by, rot], i) => (
          <Corner key={i} x={bx as number} y={by as number} rotate={rot as number} color="#00ff88" />
        ))}

        {/* === LEFT PANEL — System Status === */}
        <g opacity={statusOpacity}>
          <rect x={40} y={160} width={320} height={620} rx={4} fill="#000d0d" stroke="#00ff4433" strokeWidth={1} />
          <text x={60} y={195} fill="#00ff88" fontSize={14} fontWeight="bold" letterSpacing="3">SYSTEM STATUS</text>
          <line x1={50} y1={205} x2={350} y2={205} stroke="#00ff4433" strokeWidth={1} />

          {[
            ['ACOUSTIC SENSOR', alertActive ? 'TARGET LOCK' : 'SCANNING', alertActive],
            ['MOTION DETECT', alertActive ? 'ACTIVE HIT' : 'MONITORING', alertActive],
            ['SIREN OUTPUT', sirenActive ? 'BROADCASTING' : 'STANDBY', sirenActive],
            ['NETWORK LINK', 'CONNECTED', true],
            ['POWER', '98% NOMINAL', true],
            ['GPS SYNC', 'LOCKED', true],
          ].map(([label, value, active], i) => (
            <g key={i}>
              <text x={60} y={240 + i * 68} fill="#666" fontSize={11} letterSpacing="2">{label as string}</text>
              <text x={60} y={262 + i * 68} fill={(active as boolean) ? (i < 2 && alertActive ? '#ff4422' : '#00ff88') : '#444'} fontSize={16} fontWeight="bold">{value as string}</text>
              <rect x={300} y={248 + i * 68} width={12} height={12} rx={2}
                fill={(active as boolean) ? (i < 2 && alertActive ? '#ff4422' : '#00ff88') : '#333'} />
            </g>
          ))}

          {/* Detection timer */}
          {alertActive && (
            <g>
              <text x={60} y={660} fill="#666" fontSize={11} letterSpacing="2">DETECTION TIME</text>
              <text x={60} y={685} fill="#ffcc00" fontSize={28} fontWeight="bold">{detectionMs}ms</text>
            </g>
          )}
        </g>

        {/* === RIGHT PANEL — Threat Data === */}
        <g opacity={statusOpacity}>
          <rect x={1560} y={160} width={320} height={620} rx={4} fill="#000d0d" stroke="#00ff4433" strokeWidth={1} />
          <text x={1580} y={195} fill="#00ff88" fontSize={14} fontWeight="bold" letterSpacing="3">THREAT DATA</text>
          <line x1={1570} y1={205} x2={1870} y2={205} stroke="#00ff4433" strokeWidth={1} />

          {[
            ['THREAT TYPE', 'FIBER OPTIC UAV'],
            ['DETECTION R.', '400 – 500m'],
            ['ALERT MODE', 'ACOUSTIC SIREN'],
            ['COVERAGE', '360°'],
            ['RESPONSE TIME', '< 3 SECONDS'],
            ['ALERT RADIUS', '400–500m'],
          ].map(([label, value], i) => (
            <g key={i}>
              <text x={1580} y={240 + i * 68} fill="#666" fontSize={11} letterSpacing="2">{label}</text>
              <text x={1580} y={262 + i * 68} fill={alertActive && i === 0 ? '#ff4422' : '#00ff88'} fontSize={16} fontWeight="bold">{value}</text>
            </g>
          ))}

          {/* Soldiers secured */}
          <g opacity={securedOpacity}>
            <text x={1580} y={660} fill="#666" fontSize={11} letterSpacing="2">PERSONNEL</text>
            <text x={1580} y={685} fill="#00ff88" fontSize={22} fontWeight="bold">✓ ALL SECURED</text>
          </g>
        </g>

        {/* === TOP BAR === */}
        <rect x={0} y={0} width={1920} height={60} fill="#000d0d" opacity={bootOpacity} />
        <text x={960} y={35} fill="#00ff88" fontSize={14} fontWeight="bold" textAnchor="middle" letterSpacing="8" opacity={bootOpacity}>
          DRONEWATCH — TACTICAL DETECTION SYSTEM — UNIT IDF-7
        </text>
        <text x={60} y={35} fill="#444" fontSize={12} fontFamily="monospace" opacity={bootOpacity}>
          {`SYS_UPTIME: ${Math.floor(frame / 30)}s`}
        </text>
        <text x={1800} y={35} fill={alertActive ? '#ff4422' : '#00ff88'} fontSize={12} fontFamily="monospace"
          textAnchor="end" opacity={bootOpacity}>
          {alertActive ? '⚠ THREAT DETECTED' : '● MONITORING'}
        </text>

        {/* === BOTTOM BAR === */}
        <rect x={0} y={1050} width={1920} height={30} fill="#000d0d" opacity={bootOpacity} />
        <text x={60} y={1068} fill="#00ff4466" fontSize={11} fontFamily="monospace" opacity={bootOpacity}>
          ACOUSTIC + MOTION DETECTION  |  REAL-TIME PROCESSING  |  AUTO SIREN TRIGGER  |  IDF CERTIFIED
        </text>
      </svg>

      {/* === SIREN WAVEFORM === */}
      {sirenActive && (
        <div style={{ position: 'absolute', bottom: 68, left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 3 }}>
          {[...Array(32)].map((_, i) => {
            const h = 12 + Math.abs(Math.sin((frame * 0.35) + i * 0.55)) * 44;
            return <div key={i} style={{ width: 5, height: h, backgroundColor: '#ff4422', borderRadius: 3, opacity: 0.85 }} />;
          })}
        </div>
      )}

      {/* === ALERT BANNER === */}
      {alertActive && (
        <div style={{
          position: 'absolute', top: 72, width: '100%', textAlign: 'center',
          opacity: alertOpacity,
        }}>
          <TextReveal
            text={alertFlash ? '⚠  DRONE DETECTED — SIREN ACTIVATED  ⚠' : '   DRONE DETECTED — SIREN ACTIVATED   '}
            startFrame={175} color="#ff4422" fontSize={30} letterSpacing="0.2em"
          />
        </div>
      )}

      {/* === DRONEWATCH LOGO — bottom center === */}
      <div style={{
        position: 'absolute', bottom: 100, width: '100%', textAlign: 'center',
        opacity: interpolate(frame, [0, 40], [0, 1], { extrapolateRight: 'clamp' }),
      }}>
        <span style={{ fontSize: 38, fontWeight: 900, color: '#ffffff', fontFamily: 'Arial, sans-serif', letterSpacing: '0.2em' }}>
          DRONE<span style={{ color: '#00aaff' }}>WATCH</span>
        </span>
        <span style={{ fontSize: 14, color: '#00ff88', letterSpacing: '0.3em', marginLeft: 20 }}>
          GROUND-BASED EARLY WARNING SYSTEM
        </span>
      </div>

    </AbsoluteFill>
  );
};
