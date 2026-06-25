import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import { HomePage } from './components/pages/HomePage';
import { YearKey } from './lib/themeData';
import { Preloader } from './components/layout/Preloader';
import { NoiseOverlay } from './components/layout/NoiseOverlay';
import { GamificationProvider, useGamification, GamificationNotification } from './context/GamificationContext';

const DepartmentPage = React.lazy(() => import('./components/pages/DepartmentPage').then(m => ({ default: m.DepartmentPage })));
const DomainPage = React.lazy(() => import('./components/pages/DomainPage').then(m => ({ default: m.DomainPage })));
const TeamPage = React.lazy(() => import('./components/pages/TeamPage').then(m => ({ default: m.TeamPage })));

const ThemeWrapper = ({ year, children }: { year: YearKey, children: React.ReactNode }) => {
  const { foundFrogs } = useGamification();
  const themeClass = foundFrogs.length >= 5 ? 'theme-vip-gold' : `theme-${year}`;
  
  return (
    <div className={themeClass}>
      {children}
      <GamificationNotification />
    </div>
  );
};

function App() {
  const [year, setYear] = useState<YearKey>(() => {
    const saved = localStorage.getItem('magicpath-theme');
    return (saved as YearKey) || '2025';
  });
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<any>(null);
  const [currentDomain, setCurrentDomain] = useState<any>(null);
  const [currentTeam, setCurrentTeam] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('magicpath-theme', year);
  }, [year]);

  return (
    <ReactLenis root>
      <GamificationProvider>
        <ThemeWrapper year={year}>
          <NoiseOverlay />
        <AnimatePresence mode="wait">
          {loading && <Preloader key="preloader" onComplete={() => setLoading(false)} />}
        </AnimatePresence>

        {!loading && (
          <HomePage
            year={year}
            setYear={setYear}
            onNavigate={setCurrentPage}
            onNavigateDomain={setCurrentDomain}
          />
        )}

        <AnimatePresence>
          <React.Suspense fallback={null}>
            {currentPage && (
              <DepartmentPage
                key="dept"
                id={currentPage.id}
                name={currentPage.name}
                year={year}
                onBack={() => setCurrentPage(null)}
              />
            )}
            {currentDomain && !currentTeam && (
              <DomainPage
                key="domain"
                id={currentDomain.id}
                title={currentDomain.title}
                image={currentDomain.image}
                description={currentDomain.description}
                departments={currentDomain.departments}
                onBack={() => setCurrentDomain(null)}
                onNavigateTeam={setCurrentTeam}
              />
            )}
            {currentTeam && (
              <TeamPage
                key="team"
                department={currentTeam}
                year={year}
                onBack={() => setCurrentTeam(null)}
              />
            )}
          </React.Suspense>
        </AnimatePresence>
        </ThemeWrapper>
      </GamificationProvider>
    </ReactLenis>
  );
}

export default App;
