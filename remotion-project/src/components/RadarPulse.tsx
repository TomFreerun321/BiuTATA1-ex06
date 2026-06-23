import { useCurrentFrame, interpolate, Easing } from 'remotion';

interface Props {
  startFrame: number;
  color?: string;
  maxRadius?: number;
}

export const RadarPulse: React.FC<Props> = ({ startFrame, color = '#00aaff', maxRadius = 400 }) => {
  const frame = useCurrentFrame();
  const rings = [0, 40, 80, 120, 160];

  return (
    <svg width="800" height="800" viewBox="0 0 800 800" style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
      {rings.map((offset, i) => {
        const ringStart = startFrame + offset;
        const radius = interpolate(frame, [ringStart, ringStart + 120], [0, maxRadius], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp', easing: Easing.out(Easing.quad) });
        const opacity = interpolate(frame, [ringStart, ringStart + 60, ringStart + 120], [0.9, 0.5, 0], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
        return (
          <circle key={i} cx={400} cy={400} r={radius} fill="none" stroke={color} strokeWidth={2} opacity={opacity} />
        );
      })}
      {/* Center dot */}
      <circle cx={400} cy={400} r={8} fill={color} opacity={frame >= startFrame ? 1 : 0} />
      {/* Range labels */}
      {frame >= startFrame + 60 && (
        <text x={400 + maxRadius * 0.8} y={400} fill={color} fontSize={14} fontFamily="Arial" opacity={0.7}>500m</text>
      )}
    </svg>
  );
};
