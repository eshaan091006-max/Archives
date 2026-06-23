import React, { useRef } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';

export const VideoScrub = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  useMotionValueEvent(scrollYProgress, 'change', latest => {
    if (videoRef.current && !isNaN(videoRef.current.duration)) {
      // Scrub the video based on scroll percentage smoothly
      videoRef.current.currentTime = latest * videoRef.current.duration;
    }
  });

  return (
    <section ref={containerRef} className="relative w-full h-[250vh] bg-black">
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center">
        <video
          ref={videoRef}
          src="https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-connection-lines-loop-28822-large.mp4"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          muted
          playsInline
          preload="auto"
        />
        <div className="relative z-10 text-center pointer-events-none p-6">
          <h2 className="text-4xl md:text-6xl font-['Boldonse'] text-white uppercase tracking-widest mb-4 opacity-90 drop-shadow-2xl">
            Control Time
          </h2>
          <p className="text-white/70 font-['Inter'] tracking-[0.3em] uppercase text-sm font-bold">
            Scroll to scrub reality
          </p>
        </div>
      </div>
    </section>
  );
};
