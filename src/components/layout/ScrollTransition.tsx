import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollTransitionProps {
  children: React.ReactNode;
  className?: string;
  type?: 'mask' | 'parallax';
}

export const ScrollTransition = ({
  children,
  className = '',
  type = 'mask',
}: ScrollTransitionProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: type === 'mask' ? ['start end', 'start 40%'] : ['start end', 'end start'],
  });

  // Mask type: clips from top down to reveal
  const maskClip = useTransform(scrollYProgress, [0, 1], ['inset(100% 0 0 0)', 'inset(0% 0 0 0)']);
  const maskScale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

  // Parallax type: fades out and moves down slowly as it leaves the screen
  const parallaxY = useTransform(scrollYProgress, [0.5, 1], ['0%', '15%']);
  const parallaxOpacity = useTransform(scrollYProgress, [0.5, 0.9], [1, 0]);

  if (type === 'parallax') {
    return (
      <div ref={ref} className={`relative w-full ${className}`}>
        <motion.div style={{ y: parallaxY, opacity: parallaxOpacity }} className="w-full">
          {children}
        </motion.div>
      </div>
    );
  }

  return (
    <div ref={ref} className={`relative w-full ${className}`}>
      <motion.div style={{ clipPath: maskClip, scale: maskScale }} className="w-full">
        {children}
      </motion.div>
    </div>
  );
};
