import { motion } from 'framer-motion';

interface FloatingMemoryProps {
  src: string;
  x: number;
  y: number;
  size?: number;
  delay?: number;
}

const baseAnimation = {
  opacity: [0.3, 1, 0.3],
  y: [0, -30, 12, 0],
  rotate: [0, 2, -2, 0]
};

export default function FloatingMemory({ src, x, y, size = 120, delay = 0 }: FloatingMemoryProps) {
  return (
    <div
      style={{
        position: 'absolute',
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        width: size,
        transform: 'translate(-50%, -50%)'
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={baseAnimation}
        transition={{ duration: 5.5, delay, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          width: '100%',
          height: 'auto',
          borderRadius: '10px',
          overflow: 'hidden',
          boxShadow: '0 16px 35px rgba(0,0,0,0.35)',
          pointerEvents: 'none'
        }}
      >
        <img
          src={src}
          alt="Floating memory"
          style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover', borderRadius: '10px' }}
        />
      </motion.div>
    </div>
  );
}
