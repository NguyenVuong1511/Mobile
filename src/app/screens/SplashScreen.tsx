import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Mascot } from '../components/Mascot';

const FLOATING_ITEMS = ['1', '2', '3', '4', '5', '+', '-', '=', '×', '÷', '7', '8', '⭐', '🔢', '➕'];

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate('/login'), 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #6C63FF 0%, #3B2FBF 50%, #1CB0F6 100%)' }}
    >
      {/* Floating background numbers */}
      {FLOATING_ITEMS.map((item, i) => (
        <motion.div
          key={i}
          className="absolute select-none pointer-events-none"
          style={{
            left: `${(i * 23 + 5) % 90}%`,
            top: `${(i * 17 + 10) % 85}%`,
            fontSize: i % 3 === 0 ? '32px' : '22px',
            opacity: 0.15,
            color: 'white',
            fontFamily: 'Fredoka One, sans-serif',
          }}
          animate={{
            y: [0, -15, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 3 + (i % 3),
            repeat: Infinity,
            delay: i * 0.2,
            ease: 'easeInOut',
          }}
        >
          {item}
        </motion.div>
      ))}

      {/* Logo area */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="flex flex-col items-center"
      >
        {/* Mascot */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Mascot size={130} expression="excited" />
        </motion.div>

        {/* App Name */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 text-center"
        >
          <div
            style={{
              fontFamily: 'Fredoka One, sans-serif',
              fontSize: '52px',
              color: 'white',
              textShadow: '0 4px 20px rgba(0,0,0,0.3)',
              letterSpacing: '-1px',
            }}
          >
            MathKid
          </div>
          <div
            style={{
              fontFamily: 'Nunito, sans-serif',
              fontWeight: 700,
              fontSize: '16px',
              color: 'rgba(255,255,255,0.85)',
              marginTop: '4px',
            }}
          >
            ✨ Learn Math the Fun Way! ✨
          </div>
        </motion.div>
      </motion.div>

      {/* Loading bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-16 left-10 right-10"
      >
        <div className="h-3 rounded-full" style={{ background: 'rgba(255,255,255,0.2)' }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #FFD900, #FF9600)' }}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.5, ease: 'easeInOut' }}
          />
        </div>
        <p
          className="text-center mt-3"
          style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, color: 'rgba(255,255,255,0.7)', fontSize: '13px' }}
        >
          Getting ready...
        </p>
      </motion.div>

      {/* Decorative circles */}
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }} />
      <div className="absolute -bottom-32 -left-20 w-80 h-80 rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }} />
    </div>
  );
}
