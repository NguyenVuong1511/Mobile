import { motion } from 'motion/react';

interface StarRatingProps {
  stars: number;
  maxStars?: number;
  size?: number;
  animate?: boolean;
}

export function StarRating({ stars, maxStars = 3, size = 32, animate = false }: StarRatingProps) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: maxStars }, (_, i) => {
        const filled = i < stars;
        return (
          <motion.span
            key={i}
            initial={animate ? { scale: 0, rotate: -30 } : false}
            animate={animate ? { scale: 1, rotate: 0 } : false}
            transition={animate ? { delay: i * 0.15, type: 'spring', stiffness: 300 } : undefined}
            style={{ fontSize: size, filter: filled ? 'none' : 'grayscale(1) opacity(0.3)' }}
          >
            ⭐
          </motion.span>
        );
      })}
    </div>
  );
}
