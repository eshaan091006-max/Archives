import React from 'react';
import { motion } from 'framer-motion';

interface MarqueeProps {
  text: string;
  speed?: number;
  direction?: 'left' | 'right';
}

export const Marquee = ({ text, speed = 40, direction = 'left' }: MarqueeProps) => {
  return (
    <div className="relative w-full overflow-hidden whitespace-nowrap flex select-none pointer-events-none opacity-30 mix-blend-overlay">
      <motion.div
        initial={{ x: direction === 'left' ? '0%' : '-100%' }}
        animate={{ x: direction === 'left' ? '-100%' : '0%' }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: speed,
        }}
        className="flex shrink-0"
      >
        <span
          className="text-[25vw] md:text-[15vw] font-['Britannic_Bold'] uppercase px-8"
          style={{ WebkitTextStroke: '2px var(--color-text-main)', color: 'transparent' }}
        >
          {text}
        </span>
        <span
          className="text-[25vw] md:text-[15vw] font-['Britannic_Bold'] uppercase px-8"
          style={{ WebkitTextStroke: '2px var(--color-text-main)', color: 'transparent' }}
        >
          {text}
        </span>
      </motion.div>
      <motion.div
        initial={{ x: direction === 'left' ? '0%' : '-100%' }}
        animate={{ x: direction === 'left' ? '-100%' : '0%' }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: speed,
        }}
        className="flex shrink-0"
      >
        <span
          className="text-[25vw] md:text-[15vw] font-['Britannic_Bold'] uppercase px-8"
          style={{ WebkitTextStroke: '2px var(--color-text-main)', color: 'transparent' }}
        >
          {text}
        </span>
        <span
          className="text-[25vw] md:text-[15vw] font-['Britannic_Bold'] uppercase px-8"
          style={{ WebkitTextStroke: '2px var(--color-text-main)', color: 'transparent' }}
        >
          {text}
        </span>
      </motion.div>
    </div>
  );
};
