import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { ServicesThumbnailStrip } from './ServicesThumbnailStrip';
import { serviceCategories, ServiceCategory } from '../../../data/servicesData';
import { CATEGORY_ACCENT, CATEGORY_IMAGES, CATEGORY_TAGLINES } from '../../../data/servicesConstants';

interface ServicesHeroProps {
  currentCategory: ServiceCategory;
  currentIndex: number;
  progress: number;
  stripX: any;
  thumbRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  expandingIndex: number | null;
  expandRect: { x: number; y: number; w: number; h: number } | null;
  isMobile: boolean;
  onThumbClick: (index: number) => void;
  heroRef: React.RefObject<HTMLElement | null>;  // ← MODIFICATION ICI
}

export const ServicesHero: React.FC<ServicesHeroProps> = ({
  currentCategory,
  currentIndex,
  progress,
  stripX,
  thumbRefs,
  expandingIndex,
  expandRect,
  isMobile,
  onThumbClick,
  heroRef,
}) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === 'fr' ? 'fr' : 'en';
  const accentColor = CATEGORY_ACCENT[currentCategory.id] ?? '#10b981';
  const bgImage = CATEGORY_IMAGES[currentCategory.id];

  return (
    <section
      ref={heroRef}
      style={{
        position: 'relative',
        minHeight: isMobile ? '60svh' : '92vh',
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

      {/* Animation d'expansion */}
      <AnimatePresence>
        {expandingIndex !== null && expandRect && (
          <motion.div
            key="expand"
            initial={{
              left: expandRect.x, top: expandRect.y,
              width: expandRect.w, height: expandRect.h,
              borderRadius: 10, opacity: 1,
            }}
            animate={{
              left: 0, top: 0,
              width: '100%', height: '100%',
              borderRadius: 0, opacity: 0.88,
            }}
            exit={{ opacity: 0, transition: { duration: 0.22 } }}
            transition={{ duration: 0.65, ease: [0.4, 0, 0.15, 1] }}
            style={{
              position: 'absolute', zIndex: 1,
              backgroundImage: `url(${CATEGORY_IMAGES[`category_${expandingIndex}`]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              pointerEvents: 'none',
            }}
          />
        )}
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
          padding: isMobile ? '56px 24px 48px' : '0 64px',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr auto',
          alignItems: 'center',
          gap: isMobile ? 24 : 60,
        }}
      >
        {/* Colonne gauche - texte */}
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={`badge-${currentIndex}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                marginBottom: 18, padding: '6px 14px', borderRadius: 100,
                border: `1px solid ${accentColor}55`,
                backgroundColor: `${accentColor}15`,
              }}
            >
              <i className={currentCategory.icon} style={{ color: accentColor, fontSize: 14 }} />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: accentColor }}>
                {t(currentCategory.titleKey)}
              </span>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.h1
              key={`tag-${currentIndex}`}
              initial={{ opacity: 0, y: 22, filter: 'blur(5px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -14, filter: 'blur(4px)' }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              style={{
                margin: '0 0 16px', fontWeight: 900,
                fontSize: isMobile ? 'clamp(1.5rem, 7vw, 2rem)' : 'clamp(2.4rem, 3.6vw, 4rem)',
                lineHeight: 1.08, letterSpacing: '-0.032em', color: '#fff',
              }}
            >
              {CATEGORY_TAGLINES[currentCategory.id]?.[lang] ?? t(currentCategory.titleKey)}
            </motion.h1>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.p
              key={`desc-${currentIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.38, delay: 0.09 }}
              style={{
                margin: '0 0 28px', color: 'rgba(255,255,255,0.5)',
                fontSize: isMobile ? '0.85rem' : '1.05rem',
                lineHeight: 1.72, maxWidth: 480,
              }}
            >
              {t(currentCategory.descriptionKey)}
            </motion.p>
          </AnimatePresence>

          {/* Chips services */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`chips-${currentIndex}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, delay: 0.12 }}
              style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}
            >
              {currentCategory.services.slice(0, 3).map((svc) => (
                <span
                  key={svc.id}
                  style={{
                    fontSize: 11, fontWeight: 600, padding: '5px 12px', borderRadius: 8,
                    backgroundColor: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.65)', letterSpacing: '0.02em',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  {t(svc.titleKey)}
                </span>
              ))}
              {currentCategory.services.length > 3 && (
                <span
                  style={{
                    fontSize: 11, fontWeight: 700, padding: '5px 12px', borderRadius: 8,
                    backgroundColor: `${accentColor}20`, border: `1px solid ${accentColor}40`,
                    color: accentColor,
                  }}
                >
                  +{currentCategory.services.length - 3}
                </span>
              )}
            </motion.div>
          </AnimatePresence>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '13px 26px', backgroundColor: '#fff', color: '#0a0a0a',
                fontWeight: 700, fontSize: '0.9rem', borderRadius: 9,
                textDecoration: 'none', letterSpacing: '-0.01em', whiteSpace: 'nowrap',
                boxShadow: '0 3px 16px rgba(0,0,0,0.35)',
              }}
            >
              {t('services.cta.button', 'Demander un devis')}
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>

            <motion.a
              href="#services-list"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '13px 26px', backgroundColor: 'rgba(255,255,255,0.07)',
                backdropFilter: 'blur(10px)', color: 'rgba(255,255,255,0.82)',
                fontWeight: 600, fontSize: '0.9rem', borderRadius: 9,
                border: '1px solid rgba(255,255,255,0.13)', textDecoration: 'none', whiteSpace: 'nowrap',
              }}
            >
              {lang === 'fr' ? 'Voir nos services' : 'Explore services'}
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </motion.a>
          </div>
        </div>

        {/* Colonne droite - thumbnail strip (desktop uniquement) */}
        {!isMobile && (
          <ServicesThumbnailStrip
            current={currentIndex}
            progress={progress}
            stripX={stripX}
            thumbRefs={thumbRefs}
            onThumbClick={onThumbClick}
          />
        )}
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
          {String(serviceCategories.length).padStart(2, '0')}
        </span>
      </div>

      {/* Scroll indicator (desktop uniquement) */}
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