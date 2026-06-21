import React from 'react';
import { motion } from 'framer-motion';

export const AnimatedDivider = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`w-full h-px relative ${className}`}>
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <motion.line
          x1="0%"
          y1="50%"
          x2="100%"
          y2="50%"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="1 1"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
};
