import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next'; // ← Ajouter cet import
import { useTheme } from '../contexts/ThemeContext';
import { REALISATIONS_DATA, CATEGORIES, Project } from '../data/realisationsData';
import { useRealisationsCarousel } from '../hooks/useRealisationsCarousel';
import { RealisationsHero } from '../components/sections/realisations/RealisationsHero';
import { RealisationsCTA } from '../components/sections/realisations/RealisationsCTA';
import { RealisationsModal } from '../components/sections/realisations/RealisationsModal';
import { RealisationsCard } from '../components/sections/realisations/RealisationsCard';

export const RealisationsPage: React.FC = () => {
  const { i18n } = useTranslation(); // ← Ajouter i18n
  const { isDark } = useTheme();
  const [isMobile, setIsMobile] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { currentIndex, progress } = useRealisationsCarousel(
    Object.keys(CATEGORIES).length - 1
  );

  // ← Déterminer la langue dynamique
  const lang = i18n.language === 'fr' ? 'fr' : 'en';

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const filteredProjects = REALISATIONS_DATA.filter(
    (p) => activeFilter === 'all' || p.category === activeFilter
  );

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: isDark ? '#070707' : '#f8f8f6',
        fontFamily: "'Outfit', 'DM Sans', sans-serif",
      }}
    >
      <RealisationsHero
        currentIndex={currentIndex}
        progress={progress}
        isMobile={isMobile}
        onFilterChange={handleFilterChange}
        activeFilter={activeFilter}
        categories={CATEGORIES}
      />

      {/* Grille des projets */}
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: isMobile ? '40px 20px 80px' : '60px 64px 100px',
        }}
      >
        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile
              ? '1fr'
              : 'repeat(auto-fill, minmax(360px, 1fr))',
            gap: isMobile ? 20 : 24,
          }}
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <RealisationsCard
                key={project.id}
                project={project}
                lang={lang} // ← Utiliser la langue dynamique
                index={idx}
                onOpen={() => setSelectedProject(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              textAlign: 'center',
              padding: '80px 0',
              color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
            }}
          >
            {activeFilter === 'all'
              ? (lang === 'fr' ? "Aucun projet trouvé." : "No projects found.")
              : (lang === 'fr' 
                  ? `Aucun projet dans la catégorie "${CATEGORIES[activeFilter]?.fr}".`
                  : `No projects in category "${CATEGORIES[activeFilter]?.en}".`)}
          </motion.div>
        )}
      </div>

      <RealisationsCTA isMobile={isMobile} />

      <RealisationsModal
        project={selectedProject}
        lang={lang} // ← Utiliser la langue dynamique
        isMobile={isMobile}
        onClose={() => setSelectedProject(null)}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap');
      `}</style>
    </div>
  );
};

export default RealisationsPage;