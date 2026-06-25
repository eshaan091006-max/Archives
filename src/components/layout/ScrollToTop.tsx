import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useLenis } from 'lenis/react';

export const ScrollToTop = () => {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [visible, setVisible] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      
      if (maxScroll > 0) {
        setScrollPercent((scrolled / maxScroll) * 100);
      }
      
      setVisible(scrolled > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollPercent / 100) * circumference;

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 w-12 h-12 rounded-full bg-[var(--color-bg-secondary)]/80 backdrop-blur-md border border-[var(--color-border-main)]/40 flex items-center justify-center shadow-lg hover:border-[var(--color-accent-primary)]/50 transition-colors group no-cursor-scale"
        >
          {/* Progress circle outline */}
          <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 44 44">
            <circle
              cx="22"
              cy="22"
              r={radius}
              className="stroke-[var(--color-border-main)]/10"
              strokeWidth="2.5"
              fill="transparent"
            />
            <motion.circle
              cx="22"
              cy="22"
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
          <ArrowUp className="w-5 h-5 text-[var(--color-accent-primary)] group-hover:-translate-y-0.5 transition-transform" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
