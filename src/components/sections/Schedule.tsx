import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, MapPin } from 'lucide-react';

const scheduleData = {
  'Day 1': [
    { time: '10:00 AM', title: 'Opening Ceremony', location: 'Main Auditorium' },
    { time: '12:00 PM', title: 'Debate Prelims', location: 'Seminar Hall 1' },
    { time: '02:30 PM', title: 'Acoustic Band Competition', location: 'Open Air Theatre' },
    { time: '06:00 PM', title: 'Standup Comedy Showcase', location: 'Main Stage' },
  ],
  'Day 2': [
    { time: '09:00 AM', title: 'Treasure Hunt', location: 'Campus Grounds' },
    { time: '11:00 AM', title: 'Street Dance Battle', location: 'Quadrangle' },
    { time: '03:00 PM', title: 'Fashion Show Prelims', location: 'Main Auditorium' },
    { time: '07:00 PM', title: 'EDM Night', location: 'Main Stage' },
  ],
  'Day 3': [
    { time: '10:00 AM', title: 'Fine Arts Exhibition', location: 'Art Gallery' },
    { time: '01:00 PM', title: 'Fashion Show Finals', location: 'Main Auditorium' },
    { time: '05:00 PM', title: 'Closing Ceremony', location: 'Main Stage' },
    { time: '08:00 PM', title: 'The Concert', location: 'Main Stage' },
  ],
};

export const Schedule = () => {
  const [activeDay, setActiveDay] = useState<'Day 1' | 'Day 2' | 'Day 3'>('Day 1');

  return (
    <section
      id="schedule"
      className="py-24 bg-[var(--color-bg-main)] transition-colors duration-500 relative z-10"
    >
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-['Britannic_Bold'] text-[var(--color-accent-primary)] uppercase tracking-widest mb-6">
            Schedule
          </h2>
          <div className="w-24 h-1 bg-[var(--color-accent-secondary)] mx-auto opacity-50" />
        </motion.div>

        {/* Day Tabs */}
        <div className="flex justify-center gap-4 md:gap-8 mb-12">
          {(['Day 1', 'Day 2', 'Day 3'] as const).map(day => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`px-8 py-3 rounded-full font-['Boldonse'] text-xl uppercase transition-all duration-300 ${
                activeDay === day
                  ? 'bg-[var(--color-accent-primary)] text-[var(--color-bg-main)]'
                  : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-main)] hover:bg-[var(--color-bg-tertiary)]'
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Timeline Content */}
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[var(--color-border-main)]/30 transform md:-translate-x-1/2" />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeDay}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {scheduleData[activeDay].map((event, index) => (
                <div
                  key={index}
                  className="relative flex flex-col md:flex-row items-center justify-between w-full"
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-[var(--color-accent-secondary)] border-4 border-[var(--color-bg-main)] transform -translate-x-1/2 z-10" />

                  {/* Desktop Layout - Alternating Cards */}
                  <div
                    className={`w-full md:w-5/12 pl-12 md:pl-0 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:ml-auto md:pl-12'}`}
                  >
                    <div className="bg-[var(--color-bg-secondary)]/50 backdrop-blur-sm border border-[var(--color-border-main)]/20 p-6 rounded-2xl hover:border-[var(--color-accent-primary)]/50 transition-colors duration-300 group">
                      <h3 className="text-2xl font-bold font-['Instrument_Sans'] text-[var(--color-text-main)] mb-3 group-hover:text-[var(--color-accent-primary)] transition-colors">
                        {event.title}
                      </h3>
                      <div
                        className={`flex flex-col gap-2 text-[var(--color-text-main)]/60 font-['Inter'] text-sm ${index % 2 === 0 ? 'md:items-end' : 'md:items-start'}`}
                      >
                        <span className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-[var(--color-accent-secondary)]" />
                          {event.time}
                        </span>
                        <span className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[var(--color-accent-secondary)]" />
                          {event.location}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
