import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatedDivider } from '../animations/AnimatedDivider';
import { InteractiveImage } from '../animations/InteractiveImage';
import { useGamification } from '../../context/GamificationContext';

const bentoItems = [
  {
    img: 'https://images.unsplash.com/photo-1540039155732-d6749b10a264?q=80&w=800&auto=format&fit=crop',
    span: 'row-span-4 col-span-1 sm:col-span-2',
  },
  {
    img: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=800&auto=format&fit=crop',
    span: 'row-span-2 col-span-1 sm:col-span-2',
  },
  {
    img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop',
    span: 'row-span-3 col-span-1 sm:col-span-3',
  },
  {
    img: 'https://images.unsplash.com/photo-1470229722913-7c090be5f524?q=80&w=800&auto=format&fit=crop',
    span: 'row-span-3 col-span-1 sm:col-span-2',
  },
  {
    img: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=800&auto=format&fit=crop',
    span: 'row-span-3 col-span-1 sm:col-span-3',
  },
  {
    img: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop',
    span: 'row-span-6 col-span-1 sm:col-span-2',
  },
  {
    img: 'https://images.unsplash.com/photo-1533174000228-db37f6a31065?q=80&w=800&auto=format&fit=crop',
    span: 'row-span-4 col-span-1 sm:col-span-3',
  },
  {
    img: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=800&auto=format&fit=crop',
    span: 'row-span-2 col-span-1 sm:col-span-2',
  },
  {
    img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop',
    span: 'row-span-3 col-span-1 sm:col-span-2',
  },
  {
    img: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=800&auto=format&fit=crop',
    span: 'row-span-3 col-span-1 sm:col-span-3',
  },
  {
    img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop',
    span: 'row-span-2 col-span-1 sm:col-span-2',
  },
  {
    img: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=800&auto=format&fit=crop',
    span: 'row-span-4 col-span-1 sm:col-span-3',
  },
];

export const Gallery = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { discoverFrog, foundFrogs } = useGamification();

  const scrollPrev = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -600, behavior: 'smooth' });
    }
  };

  const scrollNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 600, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="gallery"
      className="py-24 bg-[var(--color-bg-main)] transition-colors duration-1000 relative z-10 overflow-hidden"
    >
      {/* Theme specific gradient overlays */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-accent-secondary)]/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[var(--color-accent-primary)]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 mb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8"
        >
          <div className="flex items-center gap-4">
            <h2 className="text-[var(--color-accent-primary)] text-5xl md:text-8xl font-['Britannic_Bold'] tracking-[0.2em] uppercase mb-4 leading-none drop-shadow-md">
              Gallery
            </h2>
          </div>

          <div className="flex gap-4">
            <button
              onClick={scrollPrev}
              className="w-16 h-16 rounded-full border-2 border-[var(--color-accent-primary)]/50 flex items-center justify-center hover:bg-[var(--color-accent-primary)] hover:border-[var(--color-accent-primary)] text-[var(--color-accent-primary)] hover:text-[var(--color-bg-main)] transition-all duration-300 shadow-[0_0_15px_rgba(var(--color-accent-primary-rgb),0.2)]"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={scrollNext}
              className="w-16 h-16 rounded-full border-2 border-[var(--color-accent-primary)]/50 flex items-center justify-center hover:bg-[var(--color-accent-primary)] hover:border-[var(--color-accent-primary)] text-[var(--color-accent-primary)] hover:text-[var(--color-bg-main)] transition-all duration-300 shadow-[0_0_15px_rgba(var(--color-accent-primary-rgb),0.2)]"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>
        </motion.div>

        <AnimatedDivider className="text-[var(--color-accent-primary)]/30" />
      </div>

      <div className="relative w-full overflow-hidden">
        {/* Shadow overlays for edges */}
        <div className="absolute top-0 bottom-0 left-0 w-12 md:w-32 bg-gradient-to-r from-[var(--color-bg-main)] to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-12 md:w-32 bg-gradient-to-l from-[var(--color-bg-main)] to-transparent z-20 pointer-events-none" />

        {/* Bento Grid Scroll Container */}
        <div
          ref={scrollRef}
          className="overflow-x-auto no-scrollbar scroll-smooth relative z-10 px-6 md:px-[calc((100vw-80rem)/2+1.5rem)] pb-12"
        >
          <div className="grid grid-rows-6 grid-flow-col gap-3 md:gap-4 h-[500px] md:h-[700px] auto-cols-[80vw] sm:auto-cols-[180px] md:auto-cols-[220px]">
            {bentoItems.map((item, index) => (
              <div
                key={index}
                className={`relative rounded-xl md:rounded-2xl overflow-hidden border border-[var(--color-accent-primary)]/60 bg-[var(--color-bg-secondary)] shadow-[0_0_20px_rgba(var(--color-accent-primary-rgb),0.1)] group transition-transform duration-500 hover:scale-[1.02] snap-center ${item.span}`}
              >
                <InteractiveImage
                  src={item.img}
                  alt={`Gallery ${index}`}
                  className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-main)]/90 via-transparent to-transparent opacity-60 pointer-events-none group-hover:opacity-30 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
