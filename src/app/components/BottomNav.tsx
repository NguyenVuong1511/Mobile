import { useNavigate, useLocation } from 'react-router';
import { motion } from 'motion/react';

const navItems = [
  { path: '/home', label: 'Home', emoji: '🏠' },
  { path: '/lessons', label: 'Lessons', emoji: '📚' },
  { path: '/progress', label: 'Progress', emoji: '📈' },
  { path: '/profile', label: 'Profile', emoji: '👤' },
];

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      className="absolute bottom-0 left-0 right-0 flex items-center justify-around px-2 pt-3 pb-4"
      style={{
        background: 'white',
        borderTop: '2px solid #f0f0f0',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.08)',
        fontFamily: 'Nunito, sans-serif',
      }}
    >
      {navItems.map((item) => {
        const active = location.pathname === item.path;
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-2xl transition-all"
            style={{
              background: active ? '#EEF9FF' : 'transparent',
              border: 'none',
              cursor: 'pointer',
              minWidth: '60px',
            }}
          >
            <motion.span
              animate={active ? { scale: [1, 1.3, 1] } : { scale: 1 }}
              transition={{ duration: 0.3 }}
              style={{ fontSize: '24px' }}
            >
              {item.emoji}
            </motion.span>
            <span
              style={{
                fontSize: '10px',
                fontWeight: active ? 800 : 600,
                color: active ? '#1CB0F6' : '#aaa',
              }}
            >
              {item.label}
            </span>
            {active && (
              <motion.div
                layoutId="nav-dot"
                className="w-1.5 h-1.5 rounded-full mt-0.5"
                style={{ background: '#1CB0F6' }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
