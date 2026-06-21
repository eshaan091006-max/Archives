import React from 'react';
import { motion } from 'framer-motion';
import { YearKey } from '../../lib/themeData';

interface AftermovieProps {
  year: YearKey;
}

export const Aftermovie: React.FC<AftermovieProps> = ({ year }) => {
  const videoIds: Record<string, string> = {
    '2023': '9J63MWGe024',
    '2024': 'XZhBXGv5dd4',
    '2025': 'GXKTPvnTa0w'
  };

  const videoId = videoIds[year] || videoIds['2024'];

  return (
    <section className="relative w-full py-32 bg-[var(--color-bg-main)] border-y border-[var(--color-border-main)]/30 overflow-hidden transition-colors duration-1000">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--color-accent-primary)]/10 rounded-full blur-[150px] pointer-events-none transition-colors duration-1000" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-[var(--color-accent-secondary)] font-['Inter'] tracking-[0.3em] mb-4 text-sm font-bold uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] transition-colors duration-1000">
            Relive The Magic
          </h2>
          <h3 className="text-5xl md:text-7xl lg:text-[100px] font-['Boldonse'] text-[var(--color-text-main)] uppercase tracking-wider leading-none transition-colors duration-1000">
            Malhar {year}
          </h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full aspect-video rounded-3xl overflow-hidden border border-[var(--color-border-main)]/50 shadow-xl bg-[var(--color-bg-secondary)]"
        >
          {/* Subtle overlay on iframe wrapper to keep color theme */}
          <div className="absolute inset-0 bg-[var(--color-accent-primary)]/5 pointer-events-none z-10 mix-blend-overlay transition-colors duration-1000" />
          <iframe
            key={videoId} // Forces iframe to reload when video ID changes
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?rel=0`}
            title={`Malhar ${year} Aftermovie`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </motion.div>
      </div>
    </section>
  );
};
