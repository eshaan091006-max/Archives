import { useState, useEffect } from 'react';
import { getGPUTier } from 'detect-gpu';

export const usePerformance = () => {
  const [isLowEnd, setIsLowEnd] = useState(false);

  useEffect(() => {
    const checkPerformance = async () => {
      try {
        const gpuTier = await getGPUTier();
        
        // Tier 0 or 1 usually indicates an integrated or very weak GPU, or mobile device
        // If the framerate drops below 15 on their GPU benchmark, it's considered low end
        if (gpuTier.tier < 2 || gpuTier.isMobile) {
          setIsLowEnd(true);
        }
      } catch (error) {
        // Fallback checks if GPU detection fails
        const lowCores = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
        // @ts-ignore
        const lowMemory = navigator.deviceMemory && navigator.deviceMemory <= 4;
        
        if (lowCores || lowMemory) {
          setIsLowEnd(true);
        }
      }
    };

    checkPerformance();
  }, []);

  return { isLowEnd };
};
