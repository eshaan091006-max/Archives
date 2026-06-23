import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion';

interface VelocityScrollProps {
  children: React.ReactNode;
  className?: string;
}

export const VelocityScroll = ({ children, className = '' }: VelocityScrollProps) => {
  const { scrollY } = useScroll();

  // Track scroll velocity
  const scrollVelocity = useVelocity(scrollY);

  // Smooth the velocity
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  // Map velocity to a skew transform.
  // When scrolling fast, it skews up to 2 degrees.
  const skewY = useTransform(smoothVelocity, [-1000, 0, 1000], [-3, 0, 3]);

  return (
    <motion.div style={{ skewY }} className={className}>
      {children}
    </motion.div>
  );
};
