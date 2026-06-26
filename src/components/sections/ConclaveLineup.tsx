import React, { useState } from 'react';
import { motion } from 'framer-motion';

import { YearKey } from '../../lib/themeData';

const conclaveData: Record<YearKey, Array<{ id: number; name: string; role: string; desc: string; image: string }>> = {
  '2023': [
    {
      id: 1,
      name: 'Rohit Saraf, Prajakta Koli & The Ourange Juice Gang',
      role: 'Media & Digital Creators Panel',
      desc: 'Highlighting the boom of digital media, content creation, and cinematic evolution for the modern youth.',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 2,
      name: 'Abhinandan Sekhri, Sachin Kalbag, Dr. Nitin Gokhale & Manjeet Kripalani',
      role: 'Journalism & Geopolitics Panel',
      desc: 'Critical discussions on new media, global relations, investigative journalism, and editorial integrity.',
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 3,
      name: 'Kirti Kulhari, Dr. Prateek Makwana, Vadam Girish Luthra, Dr. Amit Julka, Dr. Anil Kakodkar, Shaheen Mistri & Dr. Harinder Sekhon',
      role: 'Science, Education & Culture Panel',
      desc: 'An exceptional panel bringing together actor, nuclear scientist, educational changemaker, and historians.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800'
    }
  ],
  '2024': [
    {
      id: 1,
      name: 'Anubhav Sinha, Vijay Varma, Dia Mirza, Ananya Birla',
      role: 'Creative Arts & Culture Panel (Day 1)',
      desc: 'Prominent figures from Bollywood, arts, and music sharing their perspectives on cinema, expression, and societal change.',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 2,
      name: 'Vishwas Nangare Patil, Dr. Radhakrishnan Pillai, Dr. Sameer Patil, Akshath Acharya',
      role: 'Governance & Leadership Panel (Day 1)',
      desc: 'Distinguished thinkers from public service, security strategy, and academia sharing insights on leadership and youth engagement.',
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 3,
      name: 'Imran Khan, Anaita Shroff Adajania, Taha Shah Badussha',
      role: 'Fashion & Stardom Panel (Day 2)',
      desc: 'Celebrated actors and fashion stylists speaking on self-identity, changing trends, and long-term career growth in style industries.',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 4,
      name: 'Dr. Ryan Fernando, Dr. Ruksheda, Dr. Khuzaima Mama, Dr. Akanksha Jambusaria, Dr. Rahul Baxi',
      role: 'Health & Wellness Panel (Day 2)',
      desc: 'Renowned doctors and clinical nutritionists discussing health trends, mental resilience, and balanced lifestyles for youth.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800'
    }
  ],
  '2025': [
    {
      id: 1,
      name: 'Dr. Seema Rao',
      role: "India's First Female Commando Trainer",
      desc: 'An authority on close quarter battle, a combat shooting pioneer, and a motivational speaker empowering youth across the nation.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 2,
      name: 'Pratik Gandhi, Sunny Hinduja, Kritika Kamra, Anup Soni, Suhail Nayyar',
      role: 'Entertainment Panel',
      desc: 'Leading personalities of the screen discussing the evolution of narrative forms, the OTT revolution, and the future of Indian performance arts.',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 3,
      name: 'Saiyami Kher',
      role: 'Actor & Sports Enthusiast',
      desc: 'Acclaimed actress known for her versatile roles and her passion for sports, sharing her journey of balancing athletic discipline and cinematic expression.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 4,
      name: 'Benne-Akhil & Shirya',
      role: 'Digital Content Creators',
      desc: 'Popular content creation duo sharing their insights on digital storytelling, creative engagement, and navigating the dynamic landscape of social media.',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 5,
      name: 'Amol Muzumdar, Suma Shirur, Bhagyashree Jadhav',
      role: 'Sports Panel',
      desc: "Distinguished sports achievers and coaches coming together to speak on discipline, resilience, sportsmanship, and shaping India's athletic future.",
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 6,
      name: 'Aditya Roy Kapur',
      role: 'Actor',
      desc: "One of Bollywood's most charismatic leading men, sharing his insights on longevity in the film industry, artist identity, and the magic of cinema.",
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 7,
      name: 'Supriya Sule',
      role: 'Member of Parliament',
      desc: 'Renowned political leader and policy expert talking about education, gender equality, youth development, and active public service.',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 8,
      name: 'Justice Revati Mohite Dere & CJ Devendra Kumar Upadhyaya',
      role: 'Judiciary Panel',
      desc: 'Esteemed figures of the judiciary exploring law, ethics, democratic principles, and the role of justice in the contemporary era.',
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 9,
      name: 'Ashwin Sanghi',
      role: 'Author',
      desc: 'One of India\'s highest-selling conspiracy-thriller and mythological fiction authors, diving into the craft of writing and connecting past stories to modern audiences.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800'
    }
  ]
};

export const ConclaveLineup = ({ year }: { year: YearKey }) => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const activeLineup = conclaveData[year] || conclaveData['2025'];

  // Duplicating the array twice to ensure seamless infinite scroll
  const scrollData = [...activeLineup, ...activeLineup, ...activeLineup];

  return (
    <>
      <style>
        {`
          @keyframes scroll-infinite {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-100% / 3)); }
          }
          .animate-scroll-infinite {
            animation: scroll-infinite 45s linear infinite;
            will-change: transform;
          }
          .group-hover\\/marquee:hover .animate-scroll-infinite {
            animation-play-state: paused;
          }
        `}
      </style>

      <div className="w-full overflow-hidden py-12 relative group/marquee">
        
        {/* Massive edge gradients for seamless fading */}
        <div className="absolute top-0 left-0 w-32 md:w-64 h-full bg-gradient-to-r from-[var(--color-bg-main)] via-[var(--color-bg-main)]/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-32 md:w-64 h-full bg-gradient-to-l from-[var(--color-bg-main)] via-[var(--color-bg-main)]/80 to-transparent z-10 pointer-events-none" />

        {/* Scrolling Track */}
        <div className="flex gap-6 w-max animate-scroll-infinite" style={{ paddingLeft: '1.5rem' }}>
          {scrollData.map((person, index) => {
            const isHovered = hoveredId === person.id;
            
            return (
              <motion.div
                key={`${person.id}-${index}`}
                onMouseEnter={() => setHoveredId(person.id)}
                onMouseLeave={() => setHoveredId(null)}
                layout
                transition={{ type: 'spring', stiffness: 200, damping: 25, mass: 1 }}
                className={`relative h-[450px] md:h-[600px] rounded-[2rem] overflow-hidden cursor-pointer bg-[var(--color-bg-secondary)] border border-[var(--color-border-main)]/20 shadow-2xl shrink-0 group ${
                  isHovered ? 'w-[400px] md:w-[650px]' : 'w-[280px] md:w-[350px]'
                }`}
              >
                <img 
                  src={person.image} 
                  alt={person.name} 
                  className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
                  loading="lazy"
                />
                
                {/* Glowing Overlay that activates on hover */}
                <div className={`absolute inset-0 bg-[var(--color-accent-primary)]/20 mix-blend-overlay transition-opacity duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
                
                {/* Deep bottom gradient for text readability */}
                <div className={`absolute inset-0 bg-gradient-to-t transition-all duration-700 ${
                  isHovered 
                    ? 'from-[var(--color-bg-main)] via-[var(--color-bg-main)]/80 to-transparent' 
                    : 'from-[var(--color-bg-main)] via-[var(--color-bg-main)]/40 to-transparent'
                }`} />

                {/* Normal State Name (Unhovered) */}
                <div className={`absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end h-full transition-all duration-500 ${isHovered ? 'opacity-0 translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'}`}>
                  <h3 className="text-2xl md:text-3xl font-['Britannic_Bold'] text-[var(--color-text-main)] uppercase tracking-widest drop-shadow-lg">
                    {person.name}
                  </h3>
                  <div className="w-10 h-[2px] bg-[var(--color-accent-primary)] mt-3" />
                </div>

                {/* Expanded Content (Hovered state) */}
                <div className={`absolute bottom-0 left-0 w-full p-8 md:p-10 flex flex-col justify-end h-full transition-all duration-700 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
                  <motion.div 
                    initial={false}
                    animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-[2px] bg-[var(--color-accent-primary)] shadow-[0_0_10px_var(--color-accent-primary)]" />
                      <p className="text-[var(--color-accent-primary)] font-['Inter'] font-black tracking-[0.3em] uppercase text-xs md:text-sm drop-shadow-md">
                        {person.role}
                      </p>
                    </div>
                    
                    <h3 className="text-3xl md:text-5xl font-['Britannic_Bold'] text-[var(--color-text-main)] uppercase tracking-[0.1em] mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                      {person.name}
                    </h3>
                    
                    <p className="text-[var(--color-text-main)]/90 font-['Inter'] text-sm md:text-lg leading-[1.8] font-medium max-w-[90%] drop-shadow-md">
                      {person.desc}
                    </p>
                  </motion.div>
                </div>
                
                {/* Decorative glowing border on hover */}
                <div className={`absolute inset-0 border-2 rounded-[2rem] transition-colors duration-500 pointer-events-none ${isHovered ? 'border-[var(--color-accent-primary)]/50 shadow-[inset_0_0_30px_rgba(var(--color-accent-primary-rgb),0.2)]' : 'border-transparent'}`} />

              </motion.div>
            );
          })}
        </div>
      </div>
    </>
  );
};
