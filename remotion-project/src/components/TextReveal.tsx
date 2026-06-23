import { useCurrentFrame, interpolate, Easing } from 'remotion';

interface Props {
  text: string;
  startFrame: number;
  color?: string;
  fontSize?: number;
  fontWeight?: string | number;
  letterSpacing?: string;
}

export const TextReveal: React.FC<Props> = ({
  text, startFrame, color = '#ffffff', fontSize = 48, fontWeight = 700, letterSpacing = '0.1em'
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [startFrame, startFrame + 20], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const y = interpolate(frame, [startFrame, startFrame + 25], [30, 0], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp', easing: Easing.out(Easing.cubic) });
  return (
    <div style={{ opacity, transform: `translateY(${y}px)`, color, fontSize, fontWeight, letterSpacing, textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      {text}
    </div>
  );
};
