import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../../../data/realisationsData';

interface RealisationsModalProps {
  project: Project | null;
  lang: 'fr' | 'en';
  isMobile: boolean;
  onClose: () => void;
}

export const RealisationsModal: React.FC<RealisationsModalProps> = ({
  project,
  lang,
  isMobile,
  onClose,
}) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.32 }}
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9990,
          backgroundColor: 'rgba(0,0,0,0.70)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
      />

      {/* Modal Panel - Version style WelcomeModal */}
      <motion.div
        key="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        // Version mobile : bottom sheet, version desktop : centré
        initial={isMobile ? { opacity: 0, y: '100%' } : { opacity: 0, scale: 0.88, y: 40 }}
        animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, scale: 1, y: 0 }}
        exit={isMobile ? { opacity: 0, y: '100%' } : { opacity: 0, scale: 0.92, y: 24 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9991,
          // Sur mobile : pas de flex centré (bottom sheet)
          // Sur desktop : flex centré
          ...(!isMobile && {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
          }),
          pointerEvents: 'none',
        }}
      >
        {/* Card */}
        <div
          style={{
            pointerEvents: 'auto',
            width: '100%',
            // Desktop : largeur fixe, Mobile : plein écran horizontal
            maxWidth: isMobile ? undefined : '680px',
            // Mobile : bottom sheet avec coins arrondis en haut
            borderRadius: isMobile ? '24px 24px 0 0' : '28px',
            overflow: 'hidden',
            position: 'relative',
            background: '#141414',
            border: '1px solid rgba(255,255,255,0.08)',
            // Mobile : ancré en bas, Desktop : ombre normale
            ...(isMobile && {
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              maxHeight: '90dvh',
              overflowY: 'auto',
            }),
            ...(!isMobile && {
              boxShadow: '0 40px 120px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.05)',
              maxHeight: '85vh',
              overflowY: 'auto',
            }),
          }}
        >
          {/* Top gradient accent (comme WelcomeModal) */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '3px',
              zIndex: 3,
              background: `linear-gradient(90deg, ${project.accent}, #06b6d4, #8b5cf6, ${project.accent})`,
              backgroundSize: '300% 100%',
              animation: 'modal-gradient 4s linear infinite',
            }}
          />

          {/* Orbs déco (comme WelcomeModal) */}
          <div
            style={{
              position: 'absolute',
              top: '-80px',
              left: '-60px',
              width: '260px',
              height: '260px',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${project.accent}15 0%, transparent 70%)`,
              filter: 'blur(35px)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '-60px',
              right: '-40px',
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(139,92,246,0.09) 0%, transparent 70%)',
              filter: 'blur(35px)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />

          {/* Drag handle (mobile only) */}
          {isMobile && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                paddingTop: '10px',
                paddingBottom: '2px',
                position: 'relative',
                zIndex: 2,
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '4px',
                  borderRadius: '2px',
                  background: 'rgba(255,255,255,0.14)',
                }}
              />
            </div>
          )}

          {/* Content */}
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              padding: isMobile ? '18px 20px 24px' : '28px 32px 32px',
            }}
          >
            {/* Close button (X) - style WelcomeModal */}
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.12, rotate: 90 }}
              whileTap={{ scale: 0.88 }}
              transition={{ duration: 0.15 }}
              aria-label="Fermer"
              style={{
                position: 'absolute',
                top: isMobile ? '2px' : '18px',
                right: isMobile ? '14px' : '18px',
                width: '34px',
                height: '34px',
                borderRadius: '10px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(255,255,255,0.42)',
                cursor: 'pointer',
                fontSize: '15px',
                lineHeight: 1,
              }}
            >
              ✕
            </motion.button>

            {/* Image section */}
            <div
              style={{
                position: 'relative',
                height: isMobile ? 180 : 220,
                overflow: 'hidden',
                borderRadius: isMobile ? '16px' : '20px',
                marginBottom: isMobile ? '16px' : '20px',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `url(${project.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 60%)',
                }}
              />

              {/* Year badge */}
              <div
                style={{
                  position: 'absolute',
                  top: 14,
                  right: 14,
                  fontSize: 11,
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: 6,
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  backdropFilter: 'blur(8px)',
                  color: 'rgba(255,255,255,0.8)',
                  letterSpacing: '0.05em',
                }}
              >
                {project.year}
              </div>

              {/* Accent dot */}
              <div
                style={{
                  position: 'absolute',
                  top: 14,
                  left: 14,
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: project.accent,
                  boxShadow: `0 0 12px ${project.accent}`,
                }}
              />
            </div>

            {/* Title */}
            <div style={{ marginBottom: isMobile ? '12px' : '16px' }}>
              <h2
                id="modal-title"
                style={{
                  margin: 0,
                  fontSize: isMobile ? '1.3rem' : '1.6rem',
                  fontWeight: 800,
                  color: '#fff',
                  letterSpacing: '-0.03em',
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                {project.title[lang]}
              </h2>
              <p
                style={{
                  margin: '6px 0 0',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  color: project.accent,
                }}
              >
                {project.tagline[lang]}
              </p>
            </div>

            {/* Description */}
            <p
              style={{
                fontSize: '0.92rem',
                lineHeight: 1.7,
                color: 'rgba(255,255,255,0.6)',
                margin: '0 0 20px',
              }}
            >
              {project.description[lang]}
            </p>

            {/* Tags */}
            <div
              style={{
                display: 'flex',
                gap: 6,
                flexWrap: 'wrap',
                marginBottom: 20,
              }}
            >
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    padding: '4px 10px',
                    borderRadius: 6,
                    backgroundColor: `${project.accent}15`,
                    color: project.accent,
                    border: `1px solid ${project.accent}30`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Challenge & Result */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                gap: 12,
                marginBottom: 24,
              }}
            >
              {[
                { key: 'challenge' as const, label: { fr: 'Défi', en: 'Challenge' } },
                { key: 'result' as const, label: { fr: 'Résultat', en: 'Result' } },
              ].map(({ key, label }) => (
                <div
                  key={key}
                  style={{
                    padding: 14,
                    borderRadius: 12,
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: project.accent,
                      marginBottom: 6,
                    }}
                  >
                    {label[lang]}
                  </div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: '0.84rem',
                      lineHeight: 1.6,
                      color: 'rgba(255,255,255,0.55)',
                    }}
                  >
                    {project[key][lang]}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <motion.a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 9,
                padding: '12px 24px',
                borderRadius: 12,
                backgroundColor: project.accent,
                color: '#fff',
                fontWeight: 700,
                fontSize: '0.9rem',
                textDecoration: 'none',
                letterSpacing: '-0.01em',
                boxShadow: `0 6px 20px ${project.accent}40`,
              }}
            >
              {lang === 'fr' ? 'Visiter le site' : 'Visit website'}
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </motion.a>

            {/* Esc indicator (desktop only) */}
            {!isMobile && (
              <p
                style={{
                  textAlign: 'center',
                  marginTop: '20px',
                  fontSize: '10px',
                  color: 'rgba(255,255,255,0.16)',
                  letterSpacing: '0.03em',
                }}
              >
                Appuyez sur{' '}
                <kbd
                  style={{
                    padding: '1px 6px',
                    borderRadius: '4px',
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    fontSize: '9px',
                  }}
                >
                  Esc
                </kbd>{' '}
                pour fermer
              </p>
            )}

            {/* Safe area iOS (mobile only) */}
            {isMobile && <div style={{ height: 'env(safe-area-inset-bottom, 8px)' }} />}
          </div>
        </div>
      </motion.div>

      {/* Animation keyframes */}
      <style>{`
        @keyframes modal-gradient {
          0%   { background-position: 0% 50%; }
          100% { background-position: 300% 50%; }
        }
      `}</style>
    </AnimatePresence>
  );
};