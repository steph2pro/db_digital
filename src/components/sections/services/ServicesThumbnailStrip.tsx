import React from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { serviceCategories } from '../../../data/servicesData';
import { CATEGORY_ACCENT, CATEGORY_IMAGES, CATEGORY_TAGLINES, STRIP_WIDTH, THUMB_GAP, THUMB_H, THUMB_W } from '../../../data/servicesConstants';

interface ServicesThumbnailStripProps {
  current: number;
  progress: number;
  stripX: any;
  thumbRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  onThumbClick: (index: number) => void;
}

export const ServicesThumbnailStrip: React.FC<ServicesThumbnailStripProps> = ({
  current,
  progress,
  stripX,
  thumbRefs,
  onThumbClick,
}) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === 'fr' ? 'fr' : 'en';

  // Tripler les catégories pour l'effet de boucle infinie
  const tripleCategories = [...serviceCategories, ...serviceCategories, ...serviceCategories];

  return (
    <div
      style={{
        position: 'relative',
        width: STRIP_WIDTH,
        flexShrink: 0,
        overflow: 'hidden',
        marginRight: -32,
      }}
    >
      <motion.div
        style={{
          display: 'flex',
          gap: THUMB_GAP,
          paddingBottom: 4,
          x: stripX,
          willChange: 'transform',
        }}
      >
        {tripleCategories.map((cat, i) => {
          const realIndex = i % serviceCategories.length;
          const isActive = realIndex === current;
          const accent = CATEGORY_ACCENT[cat.id] ?? '#fff';

          return (
            <motion.div
              key={`thumb-${cat.id}-${i}`}
              ref={(el) => {
                if (i < serviceCategories.length) thumbRefs.current[realIndex] = el;
              }}
              onClick={() => onThumbClick(realIndex)}
              whileHover={{ scale: 1.03, y: -3 }}
              animate={{ opacity: isActive ? 1 : 0.42, scale: isActive ? 1 : 0.95 }}
              transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
              style={{
                flexShrink: 0,
                width: THUMB_W,
                height: THUMB_H,
                borderRadius: 10,
                overflow: 'hidden',
                cursor: 'pointer',
                position: 'relative',
                border: isActive
                  ? `2px solid ${accent}`
                  : '2px solid rgba(255,255,255,0.07)',
              }}
            >
              {/* Image de fond */}
              <div
                style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: `url(${CATEGORY_IMAGES[cat.id]})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />

              {/* Voile sombre */}
              <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.46)' }} />

              {/* Barre accent gauche */}
              {isActive && (
                <div
                  style={{
                    position: 'absolute', left: 0, top: 0, bottom: 0,
                    width: 3, backgroundColor: accent, zIndex: 3,
                  }}
                />
              )}

              {/* Contenu */}
              <div
                style={{
                  position: 'absolute', inset: 0, zIndex: 4,
                  display: 'flex', flexDirection: 'column',
                  justifyContent: 'space-between', padding: '9px 11px 8px',
                }}
              >
                <i
                  className={cat.icon}
                  style={{ fontSize: 16, color: isActive ? accent : 'rgba(255,255,255,0.5)' }}
                />
                <div>
                  <div style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 2 }}>
                    {cat.services.length} {lang === 'fr' ? 'services' : 'services'}
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>
                    {CATEGORY_TAGLINES[cat.id]?.[lang]?.split(' ').slice(0, 3).join(' ') ?? t(cat.titleKey)}
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              {isActive && (
                <div
                  style={{
                    position: 'absolute', bottom: 0, left: 0, height: 2,
                    width: `${progress}%`, backgroundColor: accent,
                    zIndex: 5, transition: 'width 0.03s linear',
                  }}
                />
              )}
            </motion.div>
          );
        })}
      </motion.div>

      {/* Dots indicators */}
      <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginTop: 12 }}>
        {serviceCategories.map((_, i) => (
          <button
            key={i}
            onClick={() => onThumbClick(i)}
            style={{
              height: 3,
              width: i === current ? 22 : 6,
              borderRadius: 2,
              backgroundColor: i === current ? CATEGORY_ACCENT[serviceCategories[current].id] : 'rgba(255,255,255,0.22)',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>
    </div>
  );
};