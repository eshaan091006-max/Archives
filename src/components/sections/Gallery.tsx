import React, { useEffect, useState, useCallback, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatedDivider } from '../animations/AnimatedDivider';
import { InteractiveImage } from '../animations/InteractiveImage';
import { FastAverageColor } from 'fast-average-color';

const images = [
  'https://images.unsplash.com/photo-1540039155732-d6749b10a264?q=80&w=2000&auto=format&fit=crop', // Crowd
  'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2000&auto=format&fit=crop', // Concert
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2000&auto=format&fit=crop', // DJ
  'https://images.unsplash.com/photo-1470229722913-7c090be5f524?q=80&w=2000&auto=format&fit=crop', // Singer
  'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=2000&auto=format&fit=crop', // Stage
];

export const Gallery = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [tweenValues, setTweenValues] = useState<number[]>([]);
  const facRef = useRef(new FastAverageColor());

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  const onScroll = useCallback(() => {
    if (!emblaApi) return;
    const engine = emblaApi.internalEngine();
    const scrollProgress = emblaApi.scrollProgress();
    
    const styles = emblaApi.scrollSnapList().map((scrollSnap, index) => {
      let diffToTarget = scrollSnap - scrollProgress;
      
      if (engine.options.loop) {
        engine.slideLooper.loopPoints.forEach((loopItem) => {
          const target = loopItem.target();
          if (index === loopItem.index && target !== 0) {
            const sign = Math.sign(target);
            if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress);
            if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress);
          }
        });
      }
      return diffToTarget * 40; // 40% translation for parallax effect
    });
    
    setTweenValues(styles);
  }, [emblaApi, setTweenValues]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    onScroll();
    emblaApi.on('select', onSelect);
    emblaApi.on('scroll', onScroll);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('reInit', onScroll);
  }, [emblaApi, onSelect, onScroll]);

  // Ambient Color Extraction
  useEffect(() => {
    const src = images[selectedIndex];
    // Create an off-screen image to analyze
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = src;
    img.onload = () => {
      facRef.current.getColorAsync(img)
        .then(color => {
          document.documentElement.style.setProperty('--color-gallery-ambient', color.hex);
        })
        .catch(e => console.log(e));
    };
  }, [selectedIndex]);

  return (
    <section id="gallery" className="py-24 bg-[var(--color-bg-secondary)] transition-colors duration-1000 relative z-10 overflow-hidden">
      {/* Subtle ambient glow based on the image, heavily muted to stay in theme */}
      <div 
        className="absolute inset-0 opacity-10 md:opacity-20 pointer-events-none transition-colors duration-1000 blur-[120px]"
        style={{ 
          background: `radial-gradient(circle at 50% 50%, var(--color-gallery-ambient, transparent) 0%, transparent 70%)` 
        }} 
      />
      
      {/* Theme specific gradient overlays to keep it strictly in theme */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-accent-secondary)]/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[var(--color-accent-primary)]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 mb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8"
        >
          <div>
            <h2 className="text-[var(--color-accent-primary)] text-5xl md:text-8xl font-['Britannic_Bold'] tracking-[0.2em] uppercase mb-4 leading-none">
              Aftermovie
            </h2>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={scrollPrev}
              className="w-16 h-16 rounded-full border border-[var(--color-border-main)] flex items-center justify-center hover:bg-[var(--color-accent-primary)] hover:border-[var(--color-accent-primary)] text-[var(--color-text-main)] hover:text-[var(--color-bg-main)] transition-all duration-300"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button 
              onClick={scrollNext}
              className="w-16 h-16 rounded-full border border-[var(--color-border-main)] flex items-center justify-center hover:bg-[var(--color-accent-primary)] hover:border-[var(--color-accent-primary)] text-[var(--color-text-main)] hover:text-[var(--color-bg-main)] transition-all duration-300"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>
        </motion.div>
        
        <AnimatedDivider className="text-[var(--color-border-main)]/30" />
      </div>

      <div className="overflow-hidden cursor-grab active:cursor-grabbing pl-6 md:pl-0 relative z-10" ref={emblaRef}>
        <div className="flex ml-0 md:ml-[calc((100vw-80rem)/2)] pb-12 pt-4">
          {images.map((src, index) => (
            <div 
              key={index} 
              className="flex-[0_0_85%] md:flex-[0_0_55%] min-w-0 pr-6 pl-4 md:pl-0"
            >
              <div 
                className={`relative w-full h-[400px] md:h-[600px] rounded-3xl overflow-hidden transition-all duration-700 ease-out ${
                  index === selectedIndex ? 'scale-100 opacity-100' : 'scale-95 opacity-50'
                }`}
              >
                <div 
                  className="absolute inset-0 w-[140%] -left-[20%]"
                  style={{
                    transform: tweenValues.length ? `translate3d(${tweenValues[index]}%, 0, 0)` : 'none',
                  }}
                >
                  <InteractiveImage 
                    src={src} 
                    alt={`Gallery ${index}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-main)]/80 via-transparent to-transparent opacity-60 pointer-events-none" />
                
                <div className="absolute bottom-10 left-10 text-[var(--color-text-main)] font-['Boldonse'] text-3xl uppercase tracking-wider pointer-events-none">
                  0{index + 1}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
