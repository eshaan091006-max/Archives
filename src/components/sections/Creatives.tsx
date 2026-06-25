import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { AnimatedDivider } from '../animations/AnimatedDivider';
import { YearKey, themeContent } from '../../lib/themeData';
import { useGamification } from '../../context/GamificationContext';

export const Creatives = ({ year }: { year: YearKey }) => {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const { discoverFrog, foundFrogs } = useGamification();

  const theme = themeContent[year];
  const creativeItems = theme.creatives;

  const nextSlide = () => {
    setCarouselIndex((prev) => (prev + 1) % creativeItems.length);
  };

  const prevSlide = () => {
    setCarouselIndex((prev) => (prev - 1 + creativeItems.length) % creativeItems.length);
  };

  const leftIndex = (carouselIndex - 1 + creativeItems.length) % creativeItems.length;
  const rightIndex = (carouselIndex + 1) % creativeItems.length;
  
  const leftCreative = creativeItems[leftIndex];
  const centerCreative = creativeItems[carouselIndex];
  const rightCreative = creativeItems[rightIndex];

  return (
    <section id="creatives" className="relative py-32 bg-[var(--color-bg-main)] overflow-hidden transition-colors duration-500">
      
      {/* Subtle Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center pointer-events-none z-0 overflow-hidden opacity-30">
        <div className="text-[150px] md:text-[300px] font-['Britannic_Bold'] text-[var(--color-border-main)]/[0.05] tracking-widest uppercase select-none whitespace-nowrap">
          CREATIVES
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center md:text-left"
        >

          <h2 className="text-5xl md:text-8xl font-['Britannic_Bold'] tracking-[0.2em] uppercase mb-6 text-metallic-gradient">
            Creatives
          </h2>
          <AnimatedDivider className="text-[var(--color-border-main)]/30" />
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 mb-20">
          
          {/* Theme Brief Card */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 relative rounded-3xl bg-gradient-to-br from-[var(--color-bg-secondary)]/80 to-[var(--color-bg-main)]/90 backdrop-blur-xl border border-[var(--color-border-main)]/40 p-8 md:p-14 shadow-lg flex flex-col justify-center"
          >
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="flex flex-col gap-8">
                <div className="bg-[var(--color-bg-main)]/50 border border-[var(--color-accent-primary)]/40 text-[var(--color-accent-primary)] text-xs font-['Inter'] font-bold tracking-[0.3em] px-6 py-2.5 rounded-full w-max uppercase backdrop-blur-md">
                  Theme Brief
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-serif italic text-[var(--color-text-main)]/95 leading-[1.3] flex flex-col">
                  <span className="whitespace-nowrap">"{theme.briefLine1}</span>
                  <span className="whitespace-nowrap">{theme.briefLine2}"</span>
                </h3>
              </div>

              {/* Theme Logo Circle */}
              <div className="relative shrink-0 w-32 h-32 md:w-44 md:h-44 rounded-full border border-[var(--color-accent-primary)]/30 bg-[var(--color-bg-main)]/45 flex items-center justify-center shadow-lg group overflow-hidden">
                {/* Glow behind */}
                <div className="absolute inset-0 bg-[var(--color-accent-primary)]/10 rounded-full blur-md opacity-70 group-hover:scale-115 transition-transform duration-500" />
                {/* Rotating dashed line */}
                <div className="absolute inset-1 rounded-full border border-dashed border-[var(--color-accent-primary)]/60 animate-[spin_25s_linear_infinite]" />
                {/* Inner glass layer */}
                <div className="absolute inset-3 rounded-full bg-gradient-to-tr from-[var(--color-bg-secondary)]/90 to-[var(--color-bg-main)]/90 backdrop-blur-md border border-[var(--color-border-main)]/30 flex flex-col items-center justify-center" />
                {/* Text content */}
                <div className="relative z-10 text-center flex flex-col items-center justify-center select-none">
                  <span className="block text-[8px] md:text-[10px] uppercase tracking-[0.25em] text-[var(--color-text-main)]/60 font-semibold mb-0.5">MALHAR</span>
                  <span className="block text-xl md:text-2xl font-['Britannic_Bold'] text-metallic-gradient">
                    {year === '2023' ? "'23" : year === '2024' ? "'24" : "'25"}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Description Card */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/3 rounded-3xl bg-[var(--color-accent-primary)]/10 backdrop-blur-md border border-[var(--color-accent-primary)]/30 p-8 md:p-12 shadow-sm flex flex-col justify-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-accent-primary)]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <h4 className="text-[var(--color-accent-primary)] text-sm font-['Inter'] font-bold uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[var(--color-accent-primary)]/50"></span>
              Description
            </h4>
            <p className="text-[var(--color-text-main)]/90 text-base md:text-lg font-['Inter'] tracking-widest leading-[1.8] font-medium uppercase relative z-10">
              {theme.creativesDescription}
            </p>
          </motion.div>

        </div>

        {/* Separator */}
        <div className="flex items-center gap-6 mb-20 max-w-2xl mx-auto opacity-70">
          <div className="h-[1px] flex-1 bg-[var(--color-border-main)]/30" />
          <Star className="w-6 h-6 text-[var(--color-accent-primary)] fill-[var(--color-accent-primary)]" />
          <div className="h-[1px] flex-1 bg-[var(--color-border-main)]/30" />
        </div>

        {/* Carousel */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative w-full rounded-3xl border border-[var(--color-border-main)]/30 bg-[var(--color-bg-secondary)]/30 backdrop-blur-sm p-6 md:p-16 flex items-center justify-between"
        >
          <button onClick={prevSlide} className="w-12 h-12 rounded-full border border-[var(--color-accent-primary)]/50 flex items-center justify-center shrink-0 hover:bg-[var(--color-accent-primary)]/10 transition-colors z-20 group">
            <ChevronLeft className="w-6 h-6 text-[var(--color-accent-primary)] group-hover:-translate-x-1 transition-transform" />
          </button>

          <div className="flex-1 overflow-hidden relative mx-4 md:mx-12 h-[500px]">
            <div className="flex items-center justify-center absolute top-0 left-0 w-full h-full gap-8">
              
              {/* Left Ghost Card */}
              <div className="w-48 md:w-64 h-[350px] md:h-[400px] border border-[var(--color-border-main)]/30 rounded-2xl bg-[var(--color-bg-secondary)]/40 flex flex-col justify-end overflow-hidden blur-[2px] opacity-60 hidden md:flex shrink-0 relative group/ghost">
                <img src={leftCreative.image} alt={leftCreative.name} className="absolute inset-0 w-full h-full object-cover z-0" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-main)]/80 via-transparent to-transparent pointer-events-none z-0" />
                <div className="border-t border-[var(--color-border-main)]/30 py-4 text-center bg-[var(--color-bg-main)]/80 backdrop-blur-md relative z-10 w-full">
                  <span className="text-[var(--color-text-main)] font-serif uppercase tracking-[0.1em] text-sm opacity-50">
                    {leftCreative.name}
                  </span>
                </div>
              </div>

              {/* Center Main Card */}
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={carouselIndex}
                  initial={{ opacity: 0, scale: 0.9, x: 50 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9, x: -50 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="w-64 md:w-[320px] h-[400px] md:h-[480px] border border-[var(--color-accent-primary)]/50 rounded-[32px] flex flex-col justify-end bg-[var(--color-bg-secondary)] shadow-2xl z-10 shrink-0 overflow-hidden relative shadow-[inset_0_0_40px_rgba(0,0,0,0.4)]"
                >
                  <img src={centerCreative.image} alt={centerCreative.name} className="absolute inset-0 w-full h-full object-cover z-0" loading="lazy" />
                  {!foundFrogs.includes('frog4') && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        discoverFrog('frog4');
                      }}
                      className="absolute top-4 right-4 z-50 text-2xl transition-all duration-300 opacity-0 hover:opacity-100 hover:scale-125 filter grayscale hover:grayscale-0 pointer-events-auto"
                      title="You found a frog!"
                    >
                      🐸
                    </button>
                  )}
                  <div className="absolute inset-0 border-4 border-white/5 rounded-[32px] pointer-events-none z-20" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-main)] via-[var(--color-bg-main)]/20 to-transparent pointer-events-none z-0" />
                  <div className="border-t border-[var(--color-accent-primary)]/30 py-6 text-center bg-[var(--color-bg-main)]/90 backdrop-blur-xl relative z-10 w-full">
                    <span className="text-[var(--color-text-main)] font-serif uppercase tracking-[0.2em] text-lg font-bold">
                      {centerCreative.name}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Right Ghost Card */}
              <div className="w-48 md:w-64 h-[350px] md:h-[400px] border border-[var(--color-border-main)]/30 rounded-2xl bg-[var(--color-bg-secondary)]/40 flex flex-col justify-end overflow-hidden blur-[2px] opacity-60 hidden md:flex shrink-0 relative">
                <img src={rightCreative.image} alt={rightCreative.name} className="absolute inset-0 w-full h-full object-cover z-0" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-main)]/80 via-transparent to-transparent pointer-events-none z-0" />
                <div className="border-t border-[var(--color-border-main)]/30 py-4 text-center bg-[var(--color-bg-main)]/80 backdrop-blur-md relative z-10 w-full">
                  <span className="text-[var(--color-text-main)] font-serif uppercase tracking-[0.1em] text-sm opacity-50">
                    {rightCreative.name}
                  </span>
                </div>
              </div>

            </div>
          </div>

          <button onClick={nextSlide} className="w-12 h-12 rounded-full border border-[var(--color-accent-primary)]/50 flex items-center justify-center shrink-0 hover:bg-[var(--color-accent-primary)]/10 transition-colors z-20 group">
            <ChevronRight className="w-6 h-6 text-[var(--color-accent-primary)] group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

      </div>
    </section>
  );
};
