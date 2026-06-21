import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Calendar, Users, Briefcase, Clock } from 'lucide-react';

export const Stats = () => {
  const stats = [
    { label: 'Total Events', value: '58+', color: 'text-[var(--color-text-highlight)]', icon: Calendar },
    { label: 'Attendees', value: '30k+', color: 'text-[var(--color-text-main)]', icon: Users },
    { label: 'Workforce', value: '1k+', color: 'text-[var(--color-text-main)]', icon: Briefcase },
    { label: 'Days', value: '3', color: 'text-[var(--color-text-main)]', icon: Clock },
  ];

  return (
    <section className="relative z-20 -mt-20 px-6 max-w-6xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-[var(--color-bg-secondary)]/80 backdrop-blur-xl border-2 border-[var(--color-border-main)]/30 rounded-3xl p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-colors duration-500"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 divide-x-0 md:divide-x divide-[var(--color-border-main)]/20">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="flex flex-col items-center justify-center text-center group">
                <Icon className="w-8 h-8 mb-4 text-[var(--color-accent-primary)] opacity-70 group-hover:scale-110 group-hover:opacity-100 transition-all duration-300" />
                <span className={`text-4xl md:text-5xl font-['Boldonse'] mb-2 ${stat.color} transition-colors duration-500`}>
                  {stat.value}
                </span>
                <span className="text-sm md:text-base font-['Inter'] font-semibold tracking-[0.2em] text-[var(--color-text-main)]/50 uppercase transition-colors duration-500">
                  {stat.label}
                </span>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};
