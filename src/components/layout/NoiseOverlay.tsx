import React from 'react';
import { usePerformance } from '../../hooks/usePerformance';

export const NoiseOverlay = () => {
  const { isLowEnd } = usePerformance();

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.03] mix-blend-difference select-none">
      <svg className="absolute inset-0 w-full h-full opacity-50" xmlns="http://www.w3.org/2000/svg">
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
      <style>
        {`
          @keyframes grain {
            0%, 100% { transform: translate(0, 0); }
            10% { transform: translate(-5%, -10%); }
            20% { transform: translate(-15%, 5%); }
            30% { transform: translate(7%, -25%); }
            40% { transform: translate(-5%, 25%); }
            50% { transform: translate(-15%, 10%); }
            60% { transform: translate(15%, 0%); }
            70% { transform: translate(0%, 15%); }
            80% { transform: translate(3%, 35%); }
            90% { transform: translate(-10%, 10%); }
          }
          
          .noise-animate {
            animation: ${isLowEnd ? 'none' : 'grain 8s steps(10) infinite'};
            width: 300%;
            height: 300%;
            left: -100%;
            top: -100%;
            position: absolute;
          }
        `}
      </style>
      <div className={`pointer-events-none ${isLowEnd ? 'absolute inset-0' : 'noise-animate'}`}>
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>
    </div>
  );
};
