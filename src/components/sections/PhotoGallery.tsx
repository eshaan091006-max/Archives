import React, { useCallback, useMemo } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const baseImages = [
  "https://images.unsplash.com/photo-1540039155732-d6749b10a264?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1470229722913-7c090be5f524?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1493225457124-a1a2a5f5f414?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1533174000282-3510e14db8c8?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2000&auto=format&fit=crop",
];

const spanClasses = [
  "col-span-1 row-span-1",
  "col-span-2 row-span-1",
  "col-span-1 row-span-2",
  "col-span-2 row-span-2",
  "col-span-3 row-span-2",
  "col-span-2 row-span-3",
  "col-span-4 row-span-2",
];

export const PhotoGallery = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, dragFree: true });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Generate a completely random layout of 18 images once on mount
  const randomizedGallery = useMemo(() => {
    return Array.from({ length: 18 }).map(() => ({
      src: baseImages[Math.floor(Math.random() * baseImages.length)],
      spanClass: spanClasses[Math.floor(Math.random() * spanClasses.length)]
    }));
  }, []);

  return (
    <section className="relative w-full py-24 bg-[var(--color-bg-main)] overflow-hidden">
      <div className="w-[95vw] max-w-[1800px] mx-auto px-6 relative z-10">
        
        {/* Header - Matching screenshot */}
        <div className="mb-8 border-b border-[var(--color-text-main)]/30 pb-4">
          <h2 className="text-[var(--color-accent-secondary)] font-['Inter'] tracking-[0.3em] mb-2 text-sm font-bold uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
            The Archives
          </h2>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-['Boldonse'] text-[var(--color-text-main)] uppercase tracking-wider drop-shadow-md">
            Photo Gallery
          </h3>
        </div>

        {/* Gallery Container with Arrows */}
        <div className="relative group">
          {/* Scroll Buttons */}
          <button 
            onClick={scrollPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[var(--color-bg-secondary)] border border-[var(--color-accent-primary)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[var(--color-accent-primary)] text-[var(--color-accent-primary)] hover:text-[var(--color-bg-main)] shadow-xl"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button 
            onClick={scrollNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[var(--color-bg-secondary)] border border-[var(--color-accent-primary)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[var(--color-accent-primary)] text-[var(--color-accent-primary)] hover:text-[var(--color-bg-main)] shadow-xl"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Embla Carousel Viewport */}
          <div 
            className="overflow-hidden cursor-grab active:cursor-grabbing pb-8" 
            ref={emblaRef}
          >
            {/* Embla Container */}
            <div className="flex">
              {/* We duplicate the masonry grid 3 times to create the infinite loop illusion */}
              {[1, 2, 3].map((blockId) => (
                <div key={blockId} className="flex-[0_0_auto] min-w-0 pr-3">
                  <div 
                    className="grid gap-3 w-[2400px] h-[500px] md:h-[700px] p-2"
                    style={{
                      gridTemplateColumns: 'repeat(15, minmax(150px, 1fr))',
                      gridTemplateRows: 'repeat(4, 1fr)',
                      gridAutoFlow: 'column dense'
                    }}
                  >
                    {randomizedGallery.map((img, idx) => (
                      <div 
                        key={`${blockId}-${idx}`} 
                        className={`${img.spanClass} relative bg-[var(--color-bg-secondary)] border-[3px] border-[var(--color-accent-secondary)] rounded-sm transition-transform duration-300 hover:scale-[0.98] cursor-pointer shadow-lg overflow-hidden group/img`}
                      >
                        <img 
                          src={img.src} 
                          alt={`Gallery ${idx}`}
                          className="w-full h-full object-cover opacity-70 group-hover/img:opacity-100 group-hover/img:scale-105 transition-all duration-700 ease-out"
                        />
                        {/* Inner subtle glow to match design */}
                        <div className="absolute inset-0 border border-[var(--color-text-main)]/20 pointer-events-none" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
