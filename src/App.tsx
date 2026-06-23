import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import { HomePage } from './components/pages/HomePage';
import { DepartmentPage } from './components/pages/DepartmentPage';
import { DomainPage } from './components/pages/DomainPage';
import { TeamPage } from './components/pages/TeamPage';
import { YearKey } from './lib/themeData';
import { Preloader } from './components/layout/Preloader';
import { NoiseOverlay } from './components/layout/NoiseOverlay';

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
      <div className={`theme-${year}`}>
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
              onBack={() => setCurrentTeam(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </ReactLenis>
  );
}

export default App;
