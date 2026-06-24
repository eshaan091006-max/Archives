import React from 'react';
import { motion } from 'framer-motion';

export const Footer = () => {
  return (
    <footer className="relative bg-[var(--color-bg-secondary)] overflow-hidden transition-colors duration-500 pt-24 pb-8 z-10 border-t border-[var(--color-border-main)]/30">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-['Boldonse'] text-[var(--color-text-main)] mb-6 uppercase">
              Join the Legacy
            </h3>
            <p className="text-[var(--color-text-main)]/60 font-['Inter'] max-w-md">
              Malhar is one of the largest inter-collegiate cultural festivals in Asia. Be a part of
              the journey.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-['Inter'] font-bold text-[var(--color-text-main)] tracking-widest uppercase mb-4">
              Socials
            </h4>
            <a
              href="#"
              className="text-[var(--color-text-main)]/60 hover:text-[var(--color-accent-primary)] font-['Inter'] transition-colors w-max"
            >
              Instagram
            </a>
            <a
              href="#"
              className="text-[var(--color-text-main)]/60 hover:text-[var(--color-accent-primary)] font-['Inter'] transition-colors w-max"
            >
              YouTube
            </a>
            <a
              href="#"
              className="text-[var(--color-text-main)]/60 hover:text-[var(--color-accent-primary)] font-['Inter'] transition-colors w-max"
            >
              LinkedIn
            </a>
          </div>
        </div>

        {/* Massive Footer Text */}
        <div className="w-full border-t border-[var(--color-border-main)]/30 pt-12 pb-4 flex flex-col items-center overflow-hidden">
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-[15vw] leading-none font-['Britannic_Bold'] text-[var(--color-text-main)] opacity-10 tracking-widest uppercase text-center"
          >
            MALHAR
          </motion.h1>
          <div className="w-full flex flex-col md:flex-row justify-between items-center mt-8 gap-4 text-[var(--color-text-main)]/40 font-['Inter'] text-sm">
            <span>© {new Date().getFullYear()} Malhar</span>
            <span>All rights reserved</span>
          </div>
        </div>
      </div>

      {/* Background Noise for Footer */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none mix-blend-overlay">
        <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <filter id="noiseFilterFooter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilterFooter)" />
        </svg>
      </div>
    </footer>
  );
};
