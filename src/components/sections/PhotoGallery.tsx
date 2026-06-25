import React, { useCallback, useMemo, useState, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export const PhotoGallery = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, dragFree: true }, [
    AutoScroll({ playOnInit: true, stopOnInteraction: false, stopOnMouseEnter: true, speed: 1.5 }),
  ]);

  const [selectedImg, setSelectedImg] = useState<{ src: string, id: string } | null>(null);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const randomizedGallery = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => {
      const chunkWidth = 2400 / 18;
      const x = i * chunkWidth + (Math.random() * 60 - 30);
      const y = Math.random() * 300 + 50;
      const rotation = (Math.random() - 0.5) * 24;
      const size = Math.random() * 60 + 220;
      const zIndex = Math.floor(Math.random() * 20);

      return {
        src: `https://picsum.photos/seed/${i + 15}/800/600`,
        x,
        y,
        rotation,
        size,
        zIndex,
      };
    });
  }, []);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (selectedImg) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedImg]);

  return (
    <section id="gallery" className="relative w-full py-24 bg-[var(--color-bg-main)] overflow-hidden">
      <div className="w-[95vw] max-w-[1800px] mx-auto px-6 relative z-10">
        {/* Header - Matching screenshot */}
        <div className="mb-8 border-b border-[var(--color-text-main)]/30 pb-4">
          <h2 className="text-[var(--color-accent-secondary)] font-['Inter'] tracking-[0.3em] mb-2 text-sm font-bold uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
            The Archives
          </h2>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-['Boldonse'] uppercase tracking-wider text-metallic-gradient">
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
            className="overflow-hidden cursor-grab active:cursor-grabbing py-12 -my-12 group/gallery"
            ref={emblaRef}
          >
            {/* Embla Container */}
            <div className="flex">
              {/* We duplicate the masonry grid 3 times to create the infinite loop illusion */}
              {[1, 2, 3].map(blockId => (
                <div key={blockId} className="flex-[0_0_auto] min-w-0 pr-3">
                  <div className="relative w-[2400px] h-[700px]">
                    {randomizedGallery.map((img, idx) => {
                      const layoutIdStr = `gallery-img-${blockId}-${idx}`;
                      return (
                        <motion.div
                          layoutId={layoutIdStr}
                          key={layoutIdStr}
                          initial={{
                            rotate: img.rotation,
                            scale: 1,
                            zIndex: img.zIndex,
                            x: img.x,
                            y: img.y,
                          }}
                          whileHover={{ scale: 1.15, rotate: 0, zIndex: 100 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                          onClick={() => setSelectedImg({ src: img.src, id: layoutIdStr })}
                          className="absolute top-0 left-0 bg-[#Fdfbf7] p-3 pb-12 shadow-[0_10px_30px_rgba(0,0,0,0.15)] cursor-pointer group/img group-hover/gallery:opacity-40 hover:!opacity-100 border border-neutral-200"
                          style={{
                            width: `${img.size}px`,
                            height: `${img.size * 1.15}px`,
                          }}
                        >
                          <img
                            src={img.src}
                            alt={`Gallery ${idx}`}
                            className="w-full h-full object-cover opacity-90 group-hover/img:opacity-100 transition-opacity duration-300 pointer-events-none"
                            loading="lazy"
                          />
                          {/* Polaroid tape */}
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/60 backdrop-blur-sm shadow-sm rotate-[-3deg] border border-white/30 pointer-events-none" />
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Cinematic Lightbox Overlay */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 md:p-12 cursor-pointer"
            onClick={() => setSelectedImg(null)}
          >
            {/* Deep Blur Backdrop */}
            <div className="absolute inset-0 bg-[var(--color-bg-main)]/80 backdrop-blur-xl" />

            {/* Close Button */}
            <button 
              className="absolute top-6 right-6 z-[110] w-12 h-12 flex items-center justify-center rounded-full bg-[var(--color-bg-secondary)]/50 border border-[var(--color-border-main)]/30 text-[var(--color-text-main)] hover:bg-[var(--color-accent-primary)] hover:text-[var(--color-bg-main)] transition-colors duration-300"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImg(null);
              }}
            >
              <X className="w-6 h-6" />
            </button>

            {/* Expanded Image */}
            <motion.div
              layoutId={selectedImg.id}
              className="relative z-[105] bg-[#Fdfbf7] p-4 pb-16 md:p-6 md:pb-24 shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-neutral-200 max-w-[90vw] max-h-[90vh] cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImg.src}
                alt="Expanded view"
                className="w-full h-full max-h-[70vh] object-contain shadow-inner pointer-events-none"
                loading="lazy"
              />
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-white/60 backdrop-blur-md shadow-sm rotate-[-2deg] border border-white/30 pointer-events-none" />
              <div className="absolute bottom-6 md:bottom-8 left-0 w-full text-center pointer-events-none">
                <span className="font-['Caveat'] text-2xl md:text-4xl text-neutral-600 opacity-60">Malhar Archives</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
