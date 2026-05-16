import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { STATS } from '../../../data/realisationsData';

interface RealisationsHeroProps {
  currentIndex: number;
  progress: number;
  isMobile: boolean;
  onFilterChange: (filter: string) => void;
  activeFilter: string;
  categories: Record<string, { fr: string; en: string }>;
}

export const RealisationsHero: React.FC<RealisationsHeroProps> = ({
  currentIndex,
  progress,
  isMobile,
  onFilterChange,
  activeFilter,
  categories,
}) => {
  const {  i18n } = useTranslation();
  const lang = i18n.language === 'fr' ? 'fr' : 'en';
  // const isDark = true; // ou venant du contexte

  // Images de fond pour le carousel (à personnaliser)
  const heroImages = [
    '/images/realisations/hotel.png',
    '/images/realisations/tara-delivery.png',
    '/images/realisations/perfect-agency.png',
    '/images/realisations/tresorbtp.png',
    '/images/realisations/medolia.png'
  ];

  const bgImage = heroImages[currentIndex % heroImages.length];
  const accentColor = '#a855f7';

  return (
    <section
      style={{
        position: 'relative',
        minHeight: isMobile ? '60svh' : '80vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: '#080808',
      }}
    >
      {/* Fond animé */}
      <AnimatePresence>
        <motion.div
          key={`bg-${currentIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
          style={{ position: 'absolute', inset: 0, zIndex: 0 }}
        >
          <div
            style={{
              position: 'absolute', inset: 0,
              backgroundImage: `url(${bgImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.64)' }} />
        </motion.div>
      </AnimatePresence>

      {/* Grain cinématique */}
      <div
        style={{
          position: 'absolute', inset: 0, zIndex: 2,
          pointerEvents: 'none', opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Layout principal */}
      <div
        style={{
          position: 'relative', zIndex: 10,
          width: '100%', maxWidth: 1280, margin: '0 auto',
          padding: isMobile ? '56px 24px 48px' : '64px 64px',
        }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            marginBottom: 18, padding: '6px 14px', borderRadius: 100,
            border: `1px solid ${accentColor}55`,
            backgroundColor: `${accentColor}15`,
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: accentColor, display: 'inline-block' }} />
          <span style={{
            fontSize: 11, fontWeight: 700, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: accentColor,
          }}>
            {lang === 'fr' ? 'Nos réalisations' : 'Our work'}
          </span>
        </motion.div>

        {/* Titre principal */}
        <motion.h1
          initial={{ opacity: 0, y: 22, filter: 'blur(5px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          style={{
            margin: '0 0 16px', fontWeight: 900,
            fontSize: isMobile ? 'clamp(1.8rem, 8vw, 2.6rem)' : 'clamp(2.4rem, 3.6vw, 4rem)',
            lineHeight: 1.08, letterSpacing: '-0.032em', color: '#fff',
            maxWidth: 700,
          }}
        >
          {lang === 'fr' ? (
            <>Des projets qui<br /><span style={{ color: accentColor }}>parlent d'eux-mêmes</span></>
          ) : (
            <>Projects that<br /><span style={{ color: accentColor }}>speak for themselves</span></>
          )}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.38, delay: 0.09 }}
          style={{
            margin: '0 0 32px', color: 'rgba(255,255,255,0.5)',
            fontSize: isMobile ? '0.9rem' : '1.05rem',
            lineHeight: 1.72, maxWidth: 480,
          }}
        >
          {lang === 'fr'
            ? "Découvrez une sélection de nos projets les plus marquants, chacun racontant une histoire unique de collaboration et d'innovation."
            : "Discover a selection of our most remarkable projects, each telling a unique story of collaboration and innovation."}
        </motion.p>

        {/* Statistiques */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.26 }}
          style={{
            display: 'flex',
            gap: isMobile ? 16 : 32,
            flexWrap: 'wrap',
            marginBottom: 40,
          }}
        >
          {STATS.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ fontSize: isMobile ? '1.6rem' : '2rem', fontWeight: 800, color: '#fff', fontFamily: "'Outfit', sans-serif" }}>
                {s.value}
              </span>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontFamily: "'DM Sans', sans-serif" }}>
                {s[lang]}
              </span>
              {i < STATS.length - 1 && (
                <span style={{ color: 'rgba(255,255,255,0.2)', marginLeft: 8 }}>—</span>
              )}
            </div>
          ))}
        </motion.div>

        {/* Filtres */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          style={{
            display: 'flex',
            gap: 8,
            flexWrap: 'wrap',
          }}
        >
          {Object.entries(categories).map(([key, cat]) => {
            const isActive = activeFilter === key;
            return (
              <button
                key={key}
                onClick={() => onFilterChange(key)}
                style={{
                  cursor: 'pointer',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  fontWeight: 500,
                  padding: '8px 20px',
                  borderRadius: 100,
                  border: '1px solid',
                  transition: 'all 0.22s ease',
                  backgroundColor: isActive ? '#fff' : 'transparent',
                  borderColor: isActive ? 'transparent' : 'rgba(255,255,255,0.2)',
                  color: isActive ? '#0a0a0a' : 'rgba(255,255,255,0.6)',
                }}
              >
                {cat[lang]}
              </button>
            );
          })}
        </motion.div>
      </div>

      {/* Compteur de slides */}
      <div
        style={{
          position: 'absolute', bottom: isMobile ? 16 : 30,
          left: isMobile ? 24 : 68, zIndex: 20,
          display: 'flex', alignItems: 'center', gap: 10,
        }}
      >
        <span style={{ fontWeight: 900, fontSize: '1rem', color: '#fff', letterSpacing: '-0.02em' }}>
          {String(currentIndex + 1).padStart(2, '0')}
        </span>
        <div style={{ position: 'relative', width: 40, height: 1, backgroundColor: 'rgba(255,255,255,0.18)' }}>
          <div
            style={{
              position: 'absolute', left: 0, top: 0, height: '100%',
              width: `${progress}%`, backgroundColor: accentColor,
              transition: 'width 0.03s linear',
            }}
          />
        </div>
        <span style={{ fontWeight: 600, fontSize: '0.82rem', color: 'rgba(255,255,255,0.28)' }}>
          {String(Object.keys(categories).length - 1).padStart(2, '0')}
        </span>
      </div>

      {/* Scroll indicator */}
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{
            position: 'absolute', bottom: 24, left: '50%',
            transform: 'translateX(-50%)', zIndex: 20,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
          }}
        >
          <div
            style={{
              width: 20, height: 32, borderRadius: 10,
              border: '1.5px solid rgba(255,255,255,0.15)',
              display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '4px 0',
            }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              style={{ width: 3, height: 6, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.32)' }}
            />
          </div>
        </motion.div>
      )}
    </section>
  );
};