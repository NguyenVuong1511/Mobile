import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Mascot, SpeechBubble } from '../components/Mascot';
import { useGame } from '../context/GameContext';

const AVATARS = [
  { emoji: '🦊', label: 'Fox', bg: '#FF9600' },
  { emoji: '🐼', label: 'Panda', bg: '#4B73E0' },
  { emoji: '🐱', label: 'Cat', bg: '#CE82FF' },
  { emoji: '🐸', label: 'Frog', bg: '#58CC02' },
];

export default function LoginScreen() {
  const navigate = useNavigate();
  const { login } = useGame();
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const [step, setStep] = useState<'name' | 'avatar'>('name');

  const handleStart = () => {
    if (step === 'name') {
      if (name.trim().length > 0) setStep('avatar');
      return;
    }
    login(name.trim() || 'Alex', selectedAvatar);
    navigate('/home');
  };

  const handleGuest = () => {
    login('Explorer', 1);
    navigate('/home');
  };

  return (
    <div
      className="absolute inset-0 flex flex-col overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #1CB0F6 0%, #4B73E0 100%)' }}
    >
      {/* Top decoration */}
      <div className="absolute top-0 left-0 right-0 h-2/3 overflow-hidden">
        {['⭐', '🌟', '✨', '💫'].map((s, i) => (
          <motion.span
            key={i}
            className="absolute"
            style={{ left: `${i * 25 + 5}%`, top: `${i * 12 + 5}%`, fontSize: '24px', opacity: 0.3 }}
            animate={{ rotate: 360, y: [0, -10, 0] }}
            transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.5 }}
          >
            {s}
          </motion.span>
        ))}
      </div>

      {/* Mascot section */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 150 }}
        className="flex items-end justify-center gap-3 pt-12 pb-4 px-8"
      >
        <SpeechBubble
          text={step === 'name' ? "Hi! What's your name? 😊" : "Pick your buddy! 🎉"}
          position="right"
        />
        <Mascot size={90} expression="happy" float />
      </motion.div>

      {/* Card */}
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
        className="flex-1 mx-4 rounded-t-3xl px-6 pt-8 pb-6 flex flex-col gap-5"
        style={{ background: 'white' }}
      >
        <div style={{ fontFamily: 'Fredoka One, sans-serif', fontSize: '28px', color: '#333', textAlign: 'center' }}>
          {step === 'name' ? '👋 Welcome!' : '🎨 Choose Your Avatar!'}
        </div>

        {step === 'name' ? (
          <motion.div key="name-step" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-4">
            <div>
              <label style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, color: '#666', fontSize: '14px' }}>
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleStart()}
                placeholder="Type your name here..."
                className="w-full mt-2 px-4 py-4 rounded-2xl outline-none"
                style={{
                  border: '3px solid #E0E0E0',
                  fontFamily: 'Nunito, sans-serif',
                  fontWeight: 700,
                  fontSize: '18px',
                  color: '#333',
                  background: '#FAFAFA',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => (e.target.style.borderColor = '#1CB0F6')}
                onBlur={e => (e.target.style.borderColor = '#E0E0E0')}
              />
            </div>
          </motion.div>
        ) : (
          <motion.div key="avatar-step" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="grid grid-cols-2 gap-3">
            {AVATARS.map((av, i) => (
              <motion.button
                key={i}
                whileTap={{ scale: 0.92 }}
                whileHover={{ scale: 1.04 }}
                onClick={() => setSelectedAvatar(i)}
                className="flex flex-col items-center gap-2 py-4 rounded-3xl"
                style={{
                  background: selectedAvatar === i ? av.bg : '#f5f5f5',
                  border: selectedAvatar === i ? `3px solid ${av.bg}` : '3px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                <span style={{ fontSize: '44px' }}>{av.emoji}</span>
                <span style={{
                  fontFamily: 'Nunito, sans-serif',
                  fontWeight: 800,
                  color: selectedAvatar === i ? 'white' : '#666',
                  fontSize: '14px',
                }}>
                  {av.label}
                </span>
                {selectedAvatar === i && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: 'white' }}>
                    <span style={{ fontSize: '14px' }}>✓</span>
                  </motion.div>
                )}
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* CTA Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          onClick={handleStart}
          className="w-full py-4 rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, #58CC02 0%, #3A9E00 100%)',
            color: 'white',
            fontFamily: 'Nunito, sans-serif',
            fontWeight: 900,
            fontSize: '20px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 6px 0 #2A7800',
          }}
        >
          {step === 'name' ? "Let's Go! 🚀" : "Start Learning! 🎉"}
        </motion.button>

        <button
          onClick={handleGuest}
          style={{
            fontFamily: 'Nunito, sans-serif',
            fontWeight: 700,
            color: '#aaa',
            fontSize: '14px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
        >
          Continue as Guest
        </button>
      </motion.div>
    </div>
  );
}
