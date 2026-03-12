import { motion } from 'motion/react';

type Expression = 'happy' | 'excited' | 'thinking' | 'sad' | 'sleepy' | 'wink';

interface MascotProps {
  size?: number;
  expression?: Expression;
  className?: string;
  float?: boolean;
  bounce?: boolean;
}

export function Mascot({ size = 80, expression = 'happy', className = '', float = false, bounce = false }: MascotProps) {
  const eyeYOffset = expression === 'sleepy' ? 4 : 0;

  const leftEyeLid = expression === 'sleepy' ? (
    <rect x="26" y="26" width="22" height="10" rx="5" fill="#58CC02" />
  ) : expression === 'wink' ? (
    <path d="M27 32 Q38 37 49 32" stroke="#58CC02" strokeWidth="4" fill="none" strokeLinecap="round" />
  ) : null;

  const rightEyeLid = expression === 'sleepy' ? (
    <rect x="52" y="26" width="22" height="10" rx="5" fill="#58CC02" />
  ) : null;

  const mouth = (() => {
    switch (expression) {
      case 'excited':
        return <ellipse cx="50" cy="62" rx="9" ry="7" fill="#E65100" />;
      case 'sad':
        return <path d="M40 64 Q50 59 60 64" stroke="#2E7D32" strokeWidth="3" fill="none" strokeLinecap="round" />;
      case 'thinking':
        return <path d="M43 62 Q50 62 57 60" stroke="#2E7D32" strokeWidth="3" fill="none" strokeLinecap="round" />;
      default:
        return <path d="M40 61 Q50 68 60 61" stroke="#2E7D32" strokeWidth="3" fill="none" strokeLinecap="round" />;
    }
  })();

  const browLeft = (() => {
    switch (expression) {
      case 'sad': return <path d="M24 20 Q37 25 37 22" stroke="#2E7D32" strokeWidth="3" fill="none" strokeLinecap="round" />;
      case 'thinking': return <path d="M24 18 Q37 22 37 20" stroke="#2E7D32" strokeWidth="3" fill="none" strokeLinecap="round" />;
      case 'excited': return <path d="M25 22 Q37 16 37 19" stroke="#2E7D32" strokeWidth="3" fill="none" strokeLinecap="round" />;
      default: return null;
    }
  })();

  const browRight = (() => {
    switch (expression) {
      case 'sad': return <path d="M76 20 Q63 25 63 22" stroke="#2E7D32" strokeWidth="3" fill="none" strokeLinecap="round" />;
      case 'thinking': return <path d="M76 22 Q63 16 63 19" stroke="#2E7D32" strokeWidth="3" fill="none" strokeLinecap="round" />;
      case 'excited': return <path d="M75 22 Q63 16 63 19" stroke="#2E7D32" strokeWidth="3" fill="none" strokeLinecap="round" />;
      default: return null;
    }
  })();

  const animProps = float
    ? { animate: { y: [0, -8, 0] }, transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' } }
    : bounce
    ? { animate: { scale: [1, 1.1, 1] }, transition: { duration: 0.6, repeat: Infinity, ease: 'easeInOut' } }
    : {};

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      {...animProps}
    >
      {/* Ear tufts */}
      <polygon points="33,22 22,4 44,13" fill="#46A602" />
      <polygon points="67,22 78,4 56,13" fill="#46A602" />

      {/* Body */}
      <ellipse cx="50" cy="76" rx="28" ry="26" fill="#58CC02" />

      {/* Belly */}
      <ellipse cx="50" cy="79" rx="18" ry="18" fill="#C8F5A0" />

      {/* Head */}
      <circle cx="50" cy="36" r="32" fill="#58CC02" />

      {/* Left wing */}
      <ellipse cx="17" cy="72" rx="16" ry="11" fill="#46A602" transform="rotate(-25 17 72)" />

      {/* Right wing */}
      <ellipse cx="83" cy="72" rx="16" ry="11" fill="#46A602" transform="rotate(25 83 72)" />

      {/* Eye whites */}
      <circle cx="37" cy={34 + eyeYOffset} r="14" fill="white" />
      <circle cx="63" cy={34 + eyeYOffset} r="14" fill="white" />

      {/* Irises */}
      <circle cx="37" cy={35 + eyeYOffset} r="10" fill="#1CB0F6" />
      <circle cx="63" cy={35 + eyeYOffset} r="10" fill="#1CB0F6" />

      {/* Pupils */}
      <circle cx="39" cy={36 + eyeYOffset} r="5.5" fill="#1A1A1A" />
      <circle cx="65" cy={36 + eyeYOffset} r="5.5" fill="#1A1A1A" />

      {/* Eye highlights */}
      <circle cx="35" cy={30 + eyeYOffset} r="3" fill="white" opacity="0.9" />
      <circle cx="61" cy={30 + eyeYOffset} r="3" fill="white" opacity="0.9" />

      {/* Eye lids */}
      {leftEyeLid}
      {rightEyeLid}

      {/* Eyebrows */}
      {browLeft}
      {browRight}

      {/* Beak */}
      <polygon points="50,47 42,57 58,57" fill="#FF9600" />
      <line x1="42" y1="57" x2="58" y2="57" stroke="#E65100" strokeWidth="1.5" />

      {/* Mouth */}
      {mouth}

      {/* Thinking bubble */}
      {expression === 'thinking' && (
        <>
          <circle cx="72" cy="22" r="4" fill="white" opacity="0.8" />
          <circle cx="80" cy="14" r="5.5" fill="white" opacity="0.8" />
          <circle cx="90" cy="8" r="7" fill="white" opacity="0.8" />
        </>
      )}

      {/* Feet */}
      <g fill="none" stroke="#FF9600" strokeWidth="3.5" strokeLinecap="round">
        <line x1="38" y1="98" x2="31" y2="88" />
        <line x1="38" y1="98" x2="38" y2="87" />
        <line x1="38" y1="98" x2="45" y2="88" />
        <line x1="62" y1="98" x2="55" y2="88" />
        <line x1="62" y1="98" x2="62" y2="87" />
        <line x1="62" y1="98" x2="69" y2="88" />
      </g>
    </motion.svg>
  );
}

interface SpeechBubbleProps {
  text: string;
  position?: 'right' | 'left' | 'top';
  className?: string;
}

export function SpeechBubble({ text, position = 'right', className = '' }: SpeechBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`bg-white rounded-2xl px-4 py-2 shadow-lg relative ${className}`}
      style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: '14px', color: '#333', maxWidth: '160px' }}
    >
      {text}
      {position === 'right' && (
        <div className="absolute left-0 top-1/2 -translate-x-2 -translate-y-1/2 w-0 h-0"
          style={{ borderTop: '8px solid transparent', borderBottom: '8px solid transparent', borderRight: '12px solid white' }} />
      )}
      {position === 'left' && (
        <div className="absolute right-0 top-1/2 translate-x-2 -translate-y-1/2 w-0 h-0"
          style={{ borderTop: '8px solid transparent', borderBottom: '8px solid transparent', borderLeft: '12px solid white' }} />
      )}
    </motion.div>
  );
}
