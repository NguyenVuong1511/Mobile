import { Outlet } from 'react-router';
import { GameProvider } from './context/GameContext';

export default function Root() {
  return (
    <GameProvider>
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
      >
        {/* Phone frame on desktop, full screen on mobile */}
        <div
          className="relative overflow-hidden bg-white"
          style={{
            width: '100%',
            maxWidth: '430px',
            height: '100dvh',
            maxHeight: '900px',
            boxShadow: '0 30px 80px rgba(0,0,0,0.4), 0 0 0 2px rgba(255,255,255,0.1)',
            borderRadius: 'clamp(0px, calc((100dvh - 900px) * -1), 44px)',
          }}
        >
          <Outlet />
        </div>
      </div>
    </GameProvider>
  );
}
