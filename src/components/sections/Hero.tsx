import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { YearKey, themeContent } from '../../lib/themeData';
import { Scene3D } from './Scene3D';
import { TextReveal } from '../animations/TextReveal';

interface HeroProps {
  year: YearKey;
}

export const Hero = ({ year }: HeroProps) => {
  const lenis = useLenis();
  const theme = themeContent[year];
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 1000], ['0%', '30%']);
  const textY = useTransform(scrollY, [0, 1000], ['0%', '10%']);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[var(--color-bg-main)] transition-colors duration-500">
      {/* Background SVG Parallax */}
      <motion.div 
        style={{ y: bgY }}
        className="absolute inset-0 z-0 opacity-10 bg-[url('https://storage.googleapis.com/storage.magicpath.ai/user/419318169308651520/figma-assets/85ca2033-150e-44f5-b2b4-38748c935b74.svg')] bg-cover bg-center" 
      />
      
      {/* 3D Scene Parallax */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0">
        <Scene3D accentColor={theme.accentColor} />
      </motion.div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={year}
          style={{ y: textY, opacity }}
          className="relative z-10 text-center px-6 flex flex-col items-center max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-6 inline-block bg-[var(--color-bg-secondary)]/50 backdrop-blur-md px-6 py-2 rounded-full border border-[var(--color-border-main)]/50"
          >
            <span className="text-[var(--color-text-main)] font-['Inter'] tracking-[0.3em] text-sm md:text-base uppercase">
              {theme.subtitle}
            </span>
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl lg:text-[120px] font-['Britannic_Bold'] text-[var(--color-accent-primary)] mb-8 tracking-widest uppercase leading-none drop-shadow-[0_0_30px_rgba(var(--color-accent-primary),0.3)]">
            <TextReveal text={theme.title} delay={0.2} />
          </h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-lg md:text-2xl text-[var(--color-text-main)]/80 font-['Inter'] max-w-2xl font-light leading-relaxed"
          >
            {theme.description}
          </motion.p>
          
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            onClick={() => lenis?.scrollTo('#events', { duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })}
            className="mt-12 w-max px-8 py-4 bg-[var(--color-accent-primary)] text-[var(--color-bg-main)] font-bold uppercase tracking-widest rounded-full hover:bg-[var(--color-text-highlight)] transition-colors shadow-lg shadow-[var(--color-accent-primary)]/20"
          >
            Explore Events
          </motion.button>
        </motion.div>
      </AnimatePresence>
      
    </section>
  );
};
