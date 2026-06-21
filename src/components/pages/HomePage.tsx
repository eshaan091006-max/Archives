import React from 'react';
import { Navbar } from '../layout/Navbar';
import { BackgroundEffects } from '../layout/BackgroundEffects';
import { CustomCursor } from '../layout/CustomCursor';
import { Hero } from '../sections/Hero';
import { Stats } from '../sections/Stats';
import { Domains } from '../sections/Domains';
import { Events } from '../sections/Events';
import { PhotoGallery } from '../sections/PhotoGallery';
import { Spotlight } from '../sections/Spotlight';
import { Aftermovie } from '../sections/Aftermovie';
import { Footer } from '../layout/Footer';
import { YearKey } from '../../lib/themeData';

interface HomePageProps {
  year: YearKey;
  setYear: (year: YearKey) => void;
  onNavigate: (dept: any) => void;
  onNavigateDomain: (domain: any) => void;
}

export const HomePage = ({ year, setYear, onNavigate, onNavigateDomain }: HomePageProps) => {
  return (
    <main className="min-h-screen md:cursor-none bg-[var(--color-bg-main)] selection:bg-[var(--color-accent-primary)] selection:text-[var(--color-bg-main)] transition-colors duration-500 overflow-x-hidden">
      <CustomCursor />
      <BackgroundEffects />
      <Navbar year={year} setYear={setYear} />
      <Hero year={year} />
      <Spotlight />
      <Stats />
      <Events onNavigate={onNavigate} />
      <Domains onNavigateDomain={onNavigateDomain} />
      <Aftermovie year={year} />
      <PhotoGallery />
      <Footer />
    </main>
  );
};
