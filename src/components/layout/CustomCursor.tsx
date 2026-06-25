import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
}

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    let lastTime = 0;
    
    const updateMousePosition = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setMousePosition({ x: clientX, y: clientY });
      
      const now = Date.now();
      if (now - lastTime > 40) { // Limit particle creation to every 40ms for performance
        lastTime = now;
        setParticles((prev) => [
          ...prev.slice(-10), // Limit active particles
          {
            id: Math.random(),
            x: clientX,
            y: clientY,
            size: Math.random() * 6 + 4,
          },
        ]);
      }
    };

    const updateHoverState = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (target.closest('.no-cursor-scale')) {
        setIsHovering(false);
        return;
      }

      setIsHovering(
        target.tagName.toLowerCase() === 'button' ||
          target.tagName.toLowerCase() === 'a' ||
          target.closest('button') !== null ||
          target.closest('a') !== null ||
          target.closest('[data-cursor="explore"]') !== null
      );
    };

    const checkHidden = () => {
      setIsHidden(document.body.classList.contains('hide-global-cursor'));
    };

    const observer = new MutationObserver(checkHidden);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    checkHidden();

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', updateHoverState);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', updateHoverState);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {!isHidden && particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ x: p.x - p.size / 2, y: p.y - p.size / 2, scale: 1, opacity: 0.6 }}
            animate={{ scale: 0, opacity: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            onAnimationComplete={() => {
              setParticles((prev) => prev.filter((item) => item.id !== p.id));
            }}
            className="hidden md:block fixed top-0 left-0 rounded-full pointer-events-none z-[9998] mix-blend-screen"
            style={{
              width: p.size,
              height: p.size,
              backgroundColor: 'var(--color-accent-primary)',
              boxShadow: '0 0 8px var(--color-accent-primary)',
              willChange: 'transform, opacity',
            }}
          />
        ))}
      </AnimatePresence>
      <motion.div
        className="hidden md:block fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHidden ? 0 : 1,
          backgroundColor: isHovering ? 'var(--color-bg-main)' : 'var(--color-accent-secondary)',
          border: isHovering ? '2px solid var(--color-accent-primary)' : '0px solid transparent',
          opacity: isHidden ? 0 : isHovering ? 0.8 : 1,
        }}
        transition={{
          x: { type: 'tween', duration: 0 },
          y: { type: 'tween', duration: 0 },
          scale: { type: 'spring', stiffness: 150, damping: 15 },
          backgroundColor: { duration: 0.2 },
          border: { duration: 0.2 },
          opacity: { duration: 0.2 }
        }}
      />
    </>
  );
};
