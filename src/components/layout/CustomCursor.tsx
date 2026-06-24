import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
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
        type: 'spring',
        stiffness: 150,
        damping: 15,
        mass: 0.1,
      }}
    />
  );
};
