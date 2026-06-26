import React from 'react';
import { Navbar } from '../layout/Navbar';
import { BackgroundEffects } from '../layout/BackgroundEffects';
import { ScrollToTop } from '../layout/ScrollToTop';
import { Hero } from '../sections/Hero';
import { Stats } from '../sections/Stats';
import { Quartet } from '../sections/Quartet';
import { Domains } from '../sections/Domains';
import { Events } from '../sections/Events';
import { Creatives } from '../sections/Creatives';
import { PhotoGallery } from '../sections/PhotoGallery';
import { FunFacts } from '../sections/FunFacts';
import { Aftermovie } from '../sections/Aftermovie';
import { Footer } from '../layout/Footer';
import { YearKey } from '../../lib/themeData';
import { ScrollTransition } from '../layout/ScrollTransition';

interface HomePageProps {
  year: YearKey;
  setYear: (year: YearKey) => void;
  onNavigate: (dept: any) => void;
  onNavigateDomain: (domain: any) => void;
}

export const HomePage = ({ year, setYear, onNavigate, onNavigateDomain }: HomePageProps) => {
  return (
    <main className="min-h-screen md:cursor-none bg-[var(--color-bg-main)] selection:bg-[var(--color-accent-primary)] selection:text-[var(--color-bg-main)] transition-colors duration-500 overflow-x-hidden">
      <BackgroundEffects />
      <ScrollToTop />
      <Navbar year={year} setYear={setYear} />

      <ScrollTransition type="parallax" className="z-0">
        <Hero year={year} />
      </ScrollTransition>

      <ScrollTransition
        type="mask"
        className="z-10 relative bg-[var(--color-bg-main)] shadow-[0_-20px_50px_rgba(0,0,0,0.5)]"
      >
        <Stats />
      </ScrollTransition>

      {/* QUARTET SECTION (Scroll-linked scrub, no mask so sticky works) */}
      <div className="z-20 relative bg-[var(--color-bg-main)]">
        <Quartet year={year} />
      </div>

      <ScrollTransition type="mask" className="z-30 relative bg-[var(--color-bg-main)]">
        <Domains onNavigateDomain={onNavigateDomain} />
      </ScrollTransition>

      <ScrollTransition type="mask" className="z-40 relative bg-[var(--color-bg-main)]">
        <Events onNavigate={onNavigate} year={year} />
      </ScrollTransition>

      <ScrollTransition type="mask" className="z-45 relative bg-[var(--color-bg-main)]">
        <Creatives year={year} />
      </ScrollTransition>

      <ScrollTransition type="mask" className="z-50 relative bg-[var(--color-bg-main)]">
        <Aftermovie year={year} />
      </ScrollTransition>

      <ScrollTransition type="mask" className="z-[60] relative bg-[var(--color-bg-main)]">
        <PhotoGallery />
      </ScrollTransition>

      <ScrollTransition type="mask" className="z-[65] relative bg-[var(--color-bg-main)]">
        <FunFacts />
      </ScrollTransition>

      <div className="relative z-[70] bg-[var(--color-bg-main)]">
        <Footer />
      </div>
    </main>
  );
};
