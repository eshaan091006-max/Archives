import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { YearKey, themeContent } from '../../lib/themeData';
import { Scene3D } from './Scene3D';
import { TextReveal } from '../animations/TextReveal';
import { MagneticWrapper } from '../animations/MagneticWrapper';
import { ChevronDown } from 'lucide-react';
import { useGamification } from '../../context/GamificationContext';

interface HeroProps {
  year: YearKey;
}

export const Hero = ({ year }: HeroProps) => {
  const lenis = useLenis();
  const theme = themeContent[year];
  const { discoverFrog, foundFrogs } = useGamification();
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

      {/* Floating Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[var(--color-accent-primary)]/40 mix-blend-screen blur-[1px]"
            style={{
              width: Math.random() * 6 + 2 + 'px',
              height: Math.random() * 6 + 2 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: Math.random() * 3 + 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

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
            {!foundFrogs.includes('frog2') && (
              <button
                onClick={() => discoverFrog('frog2')}
                className="ml-4 text-xl transition-all duration-300 opacity-0 hover:opacity-100 hover:scale-125 filter grayscale hover:grayscale-0 animate-pulse inline-block"
                title="You found a frog!"
              >
                🐸
              </button>
            )}
          </motion.div>

          <div className="relative mb-8">
            <h1 className="relative z-10 text-6xl md:text-8xl lg:text-[120px] font-['Britannic_Bold'] text-[var(--color-accent-primary)] tracking-widest uppercase leading-none drop-shadow-[0_0_30px_rgba(var(--color-accent-primary),0.3)]">
              <TextReveal text={theme.title} delay={0.2} />
            </h1>
          </div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-lg md:text-2xl text-[var(--color-text-main)]/80 font-['Inter'] max-w-2xl font-light leading-relaxed mb-8"
          >
            {theme.description}
          </motion.p>

          <MagneticWrapper>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="flex flex-col items-center gap-2 cursor-pointer p-4"
              onClick={() => {
                const el = document.getElementById('stats');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className="text-[var(--color-text-highlight)] text-xs font-['Inter'] tracking-[0.3em] uppercase font-bold">
                Scroll
              </span>
              <ChevronDown className="text-[var(--color-accent-primary)] w-6 h-6" />
            </motion.div>
          </MagneticWrapper>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};
