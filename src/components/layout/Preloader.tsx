import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSound } from '../../hooks/useSound';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';

export const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState('ARCHIVES');
  const [playedSound, setPlayedSound] = useState(false);
  const { playBoot } = useSound();
  const targetText = 'ARCHIVES';

  useEffect(() => {
    // Progress interval
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 750); // Wait a bit before fading out
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 4;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onComplete]);

  // Scramble effect for subtitle
  useEffect(() => {
    let iterations = 0;
    const interval = setInterval(() => {
      setText(prev =>
        prev
          .split('')
          .map((letter, index) => {
            if (index < iterations) {
              return targetText[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );

      if (iterations >= targetText.length) {
        clearInterval(interval);
      }

      iterations += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [targetText]);

  // Boot Chime Trigger
  useEffect(() => {
    if (progress === 100 && !playedSound) {
      playBoot();
      setPlayedSound(true);
    }
  }, [progress, playedSound, playBoot]);

  // Circle progress calculation
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: '-100%' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[9999] bg-[var(--color-bg-main)] flex flex-col items-center justify-center transition-colors duration-500 overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between p-12 pointer-events-none opacity-20">
        <div className="flex justify-between font-['Inter'] text-xs tracking-widest text-[var(--color-text-main)]">
          <span>SYS.BOOT.V2.0.1</span>
          <span>INITIATING CORE ASSETS</span>
        </div>
        <div className="flex justify-between font-['Inter'] text-xs tracking-widest text-[var(--color-text-main)]">
          <span>{progress.toString().padStart(3, '0')}%</span>
          <span>SYSTEM CHECK OK</span>
        </div>
      </div>

      <div className="text-center relative z-10 w-full px-6 flex flex-col items-center gap-6">
        {/* Circular Progress Ring */}
        <div className="relative w-20 h-20 flex items-center justify-center mb-4">
          <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 60 60">
            <circle
              cx="30"
              cy="30"
              r={radius}
              className="stroke-[var(--color-border-main)]/10"
              strokeWidth="2.5"
              fill="transparent"
            />
            <motion.circle
              cx="30"
              cy="30"
              r={radius}
              className="stroke-[var(--color-accent-primary)]"
              strokeWidth="2.5"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.1s ease' }}
            />
          </svg>
          <span className="font-mono text-sm font-bold text-[var(--color-accent-primary)]">
            {progress}%
          </span>
        </div>

        <div className="flex flex-col items-center gap-2">
          {/* Main Metallic logo title */}
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-7xl md:text-9xl font-['Britannic_Bold'] text-metallic-gradient tracking-widest uppercase"
          >
            MALHAR
          </motion.h1>

          {/* Subtitle Scramble text */}
          <motion.p className="text-sm md:text-base font-mono text-[var(--color-text-main)]/60 tracking-[0.4em] uppercase">
            {text}
          </motion.p>
        </div>

        <div className="h-6 mt-4 overflow-hidden">
          <motion.p
            initial={{ y: 20 }}
            animate={{ y: progress === 100 ? 0 : 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="text-[var(--color-accent-primary)] font-['Inter'] tracking-[0.35em] text-xs font-bold uppercase"
          >
            SYSTEM READY · ENTERING PORTAL
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};
