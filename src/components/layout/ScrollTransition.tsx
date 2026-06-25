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

  // GPU-accelerated fade and slide transition (no layout repaints)
  const maskOpacity = useTransform(scrollYProgress, [0, 0.8], [0, 1]);
  const maskY = useTransform(scrollYProgress, [0, 0.8], ['40px', '0px']);
  const maskScale = useTransform(scrollYProgress, [0, 0.8], [0.96, 1]);

  // Parallax type: fades out and moves down slowly as it leaves the screen
  const parallaxY = useTransform(scrollYProgress, [0.5, 1], ['0%', '15%']);
  const parallaxOpacity = useTransform(scrollYProgress, [0.5, 0.9], [1, 0]);

  if (type === 'parallax') {
    return (
      <div ref={ref} className={`relative w-full ${className}`}>
        <motion.div style={{ y: parallaxY, opacity: parallaxOpacity, willChange: 'transform' }} className="w-full">
          {children}
        </motion.div>
      </div>
    );
  }

  return (
    <div ref={ref} className={`relative w-full ${className}`}>
      <motion.div style={{ opacity: maskOpacity, y: maskY, scale: maskScale, willChange: 'transform, opacity' }} className="w-full">
        {children}
      </motion.div>
    </div>
  );
};
