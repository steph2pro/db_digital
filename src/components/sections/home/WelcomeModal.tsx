// src/components/modals/WelcomeModal.tsx
//
// v2 — Mobile-first + contrôle de fréquence d'affichage
//
// Sur mobile  : bottom sheet remontant du bas (natif iOS/Android)
// Sur desktop : modal centré avec animation scale
//
// Modes d'affichage via la prop `displayMode` :
//   "once"    → localStorage  : affiché une seule fois, jamais de nouveau
//   "session" → sessionStorage : affiché une fois par session (défaut)
//   "always"  → pas de stockage : affiché à chaque actualisation
//
// Exemples d'usage dans Home.tsx :
//   <WelcomeModal />                       ← session (défaut)
//   <WelcomeModal displayMode="once" />    ← une seule fois pour toujours
//   <WelcomeModal displayMode="always" />  ← à chaque actualisation

import React, { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';

// ─── Types ────────────────────────────────────────────────────────────────────
type DisplayMode = 'once' | 'session' | 'always';

interface WelcomeModalProps {
  displayMode?: DisplayMode;
}

const STORAGE_KEY = 'db_welcome_seen';

const hasBeenSeen = (mode: DisplayMode): boolean => {
  if (mode === 'always') return false;
  try {
    const storage = mode === 'once' ? localStorage : sessionStorage;
    return !!storage.getItem(STORAGE_KEY);
  } catch {
    return false;
  }
};

const markAsSeen = (mode: DisplayMode): void => {
  if (mode === 'always') return;
  try {
    const storage = mode === 'once' ? localStorage : sessionStorage;
    storage.setItem(STORAGE_KEY, Date.now().toString());
  } catch { /* silent */ }
};

// ─── Composant ────────────────────────────────────────────────────────────────
const WelcomeModal: React.FC<WelcomeModalProps> = ({ displayMode = 'session' }) => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (!hasBeenSeen(displayMode)) {
      const timer = setTimeout(() => setIsVisible(true), 700);
      return () => clearTimeout(timer);
    }
  }, [displayMode]);

  const close = useCallback(() => {
    markAsSeen(displayMode);
    setIsVisible(false);
  }, [displayMode]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [close]);

  useEffect(() => {
    document.body.style.overflow = isVisible ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isVisible]);

  const tags = [t('welcome.tag1'), t('welcome.tag2'), t('welcome.tag3'), t('welcome.tag4')];
  const stats = [
    { value: t('welcome.stat1value'), label: t('welcome.stat1label') },
    { value: t('welcome.stat2value'), label: t('welcome.stat2label') },
    { value: t('welcome.stat3value'), label: t('welcome.stat3label') },
  ];

  // ─── Variants ──────────────────────────────────────────────────────────────
  // const mobileVariants = {
  //   initial: { y: '100%', opacity: 0 },
  //   animate: { y: 0, opacity: 1, transition: { type: 'spring' as const, damping: 26, stiffness: 280 } },
  //   exit:    { y: '100%', opacity: 0, transition: { duration: 0.26, ease: [0.4, 0, 1, 1] as number[] } },
  // };

  // const desktopVariants = {
  //   initial: { scale: 0.88, opacity: 0, y: 36 },
  //   animate: { scale: 1, opacity: 1, y: 0, transition: { duration: 0.44, ease: [0.22, 1, 0.36, 1] as number[] } },
  //   exit:    { scale: 0.93, opacity: 0, y: 20, transition: { duration: 0.26, ease: [0.4, 0, 1, 1] as number[] } },
  // };

  // ─── Render ─────────────────────────────────────────────────────────────────
  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <>
            {/* Backdrop */}
            <motion.div
              key="wb-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.32 }}
              onClick={close}
              style={{
                position: 'fixed', inset: 0, zIndex: 9990,
                background: 'rgba(0,0,0,0.70)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
              }}
            />

            {/* Modal */}
            <motion.div
              key="wb-modal"
            //   variants={isMobile ? mobileVariants : desktopVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              role="dialog"
              aria-modal="true"
              aria-labelledby="welcome-title"
              style={isMobile ? {
                position: 'fixed', bottom: 0, left: 0, right: 0,
                zIndex: 9991, pointerEvents: 'auto',
              } : {
                position: 'fixed', inset: 0, zIndex: 9991,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '16px', pointerEvents: 'none',
              }}
            >
              {/* Card */}
              <div style={{
                pointerEvents: 'auto',
                width: '100%',
                maxWidth: isMobile ? undefined : '660px',
                borderRadius: isMobile ? '24px 24px 0 0' : '28px',
                overflow: 'hidden',
                position: 'relative',
                background: 'linear-gradient(155deg, rgba(8,18,16,0.98) 0%, rgba(4,10,22,0.99) 100%)',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: isMobile
                  ? '0 -20px 60px rgba(0,0,0,0.55)'
                  : '0 40px 120px rgba(0,0,0,0.65), 0 0 0 1px rgba(16,185,129,0.07)',
                maxHeight: isMobile ? '92dvh' : undefined,
                overflowY: isMobile ? 'auto' : undefined,
              }}>

                {/* Barre gradient top */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0,
                  height: '3px', zIndex: 3,
                  background: 'linear-gradient(90deg, #10b981, #06b6d4, #8b5cf6, #10b981)',
                  backgroundSize: '300% 100%',
                  animation: 'wm-gradient 4s linear infinite',
                }} />

                {/* Orbs déco */}
                <div style={{ position: 'absolute', top: '-80px', left: '-60px', width: '260px', height: '260px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)', filter: 'blur(35px)', pointerEvents: 'none', zIndex: 0 }} />
                <div style={{ position: 'absolute', bottom: '-60px', right: '-40px', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.09) 0%, transparent 70%)', filter: 'blur(35px)', pointerEvents: 'none', zIndex: 0 }} />

                {/* Drag handle (mobile only) */}
                {isMobile && (
                  <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '10px', paddingBottom: '2px', position: 'relative', zIndex: 2 }}>
                    <div style={{ width: '36px', height: '4px', borderRadius: '2px', background: 'rgba(255,255,255,0.14)' }} />
                  </div>
                )}

                {/* ── Contenu ──────────────────────────────────────────── */}
                <div style={{
                  position: 'relative', zIndex: 2,
                  padding: isMobile ? '18px 20px 24px' : '38px 40px 32px',
                }}>

                  {/* Bouton X */}
                  <motion.button
                    onClick={close}
                    whileHover={{ scale: 1.12, rotate: 90 }}
                    whileTap={{ scale: 0.88 }}
                    transition={{ duration: 0.15 }}
                    aria-label="Fermer"
                    style={{
                      position: 'absolute',
                      top: isMobile ? '2px' : '18px',
                      right: isMobile ? '14px' : '18px',
                      width: '34px', height: '34px',
                      borderRadius: '10px',
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'rgba(255,255,255,0.42)', cursor: 'pointer',
                      fontSize: '15px', lineHeight: 1,
                    }}
                  >✕</motion.button>

                  {/* Logo + badge */}
                  <div style={{
                    display: 'flex', alignItems: 'center',
                    gap: isMobile ? '10px' : '14px',
                    marginBottom: isMobile ? '18px' : '24px',
                  }}>
                    <motion.div
                      animate={{ scale: [1, 1.04, 1] }}
                      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                      style={{
                        width: isMobile ? '44px' : '52px',
                        height: isMobile ? '44px' : '52px',
                        flexShrink: 0,
                        borderRadius: isMobile ? '13px' : '16px',
                        background: 'linear-gradient(135deg, #10b981, #06b6d4)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 8px 22px rgba(16,185,129,0.32)',
                      }}
                    >
                      <img
                        src="/images/logo/logo-trans.png"
                        alt="DB Digital Agency"
                        style={{ width: isMobile ? '27px' : '33px', height: isMobile ? '27px' : '33px', objectFit: 'contain' }}
                      />
                    </motion.div>
                    <div>
                      <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                        padding: '4px 10px',
                        background: 'rgba(16,185,129,0.1)',
                        border: '1px solid rgba(16,185,129,0.2)',
                        borderRadius: '100px', marginBottom: '4px',
                      }}>
                        <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 5px #10b981', flexShrink: 0, animation: 'wm-pulse 2s infinite' }} />
                        <span style={{ color: '#34d399', fontSize: '10px', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase' }}>
                          {t('welcome.badge')}
                        </span>
                      </div>
                      <p style={{ color: 'rgba(255,255,255,0.28)', fontSize: '11px', margin: 0 }}>
                        DB Digital Agency 
                      </p>
                    </div>
                  </div>

                  {/* Titre */}
                  <div id="welcome-title" style={{ marginBottom: isMobile ? '12px' : '16px' }}>
                    {[t('welcome.title1'), t('welcome.title2'), t('welcome.title3')].map((line, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -14 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.18 + i * 0.07, duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <span style={{
                          display: 'block',
                          fontSize: isMobile ? 'clamp(1.65rem,7.5vw,2.1rem)' : 'clamp(1.9rem,3.2vw,2.6rem)',
                          fontWeight: 900, lineHeight: 1.06,
                          letterSpacing: '-0.04em',
                          fontFamily: "'Outfit', 'DM Sans', sans-serif",
                          ...(i === 1
                            ? { background: 'linear-gradient(90deg,#10b981,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }
                            : { color: i === 2 ? 'rgba(255,255,255,0.42)' : '#fff' }
                          ),
                        }}>{line}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.38, duration: 0.32 }}
                    style={{
                      color: 'rgba(255,255,255,0.46)',
                      fontSize: isMobile ? '0.83rem' : '0.92rem',
                      lineHeight: 1.72,
                      marginBottom: isMobile ? '14px' : '20px',
                    }}
                  >
                    {t('welcome.body')}
                  </motion.p>

                  {/* Tags */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.44, duration: 0.28 }}
                    style={{ display: 'flex', flexWrap: 'wrap', gap: isMobile ? '6px' : '7px', marginBottom: isMobile ? '16px' : '22px' }}
                  >
                    {tags.map((tag, i) => (
                      <span key={i} style={{
                        padding: isMobile ? '4px 10px' : '5px 13px',
                        borderRadius: '100px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.09)',
                        color: 'rgba(255,255,255,0.52)',
                        fontSize: isMobile ? '10px' : '11px',
                        fontWeight: 500,
                        letterSpacing: '0.02em',
                      }}>{tag}</span>
                    ))}
                  </motion.div>

                  {/* Stats */}
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                    style={{
                      display: 'flex',
                      marginBottom: isMobile ? '18px' : '26px',
                      padding: isMobile ? '12px 14px' : '15px 22px',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      borderRadius: '13px',
                    }}
                  >
                    {stats.map((s, i) => (
                      <React.Fragment key={i}>
                        <div style={{ flex: 1, textAlign: 'center' }}>
                          <div style={{ fontSize: isMobile ? '1.2rem' : '1.45rem', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1 }}>{s.value}</div>
                          <div style={{ fontSize: isMobile ? '8px' : '9px', color: 'rgba(255,255,255,0.28)', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{s.label}</div>
                        </div>
                        {i < 2 && <div style={{ width: '1px', background: 'rgba(255,255,255,0.07)', margin: isMobile ? '0 2px' : '0 4px' }} />}
                      </React.Fragment>
                    ))}
                  </motion.div>

                  {/* Boutons */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.56, duration: 0.3 }}
                    style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '9px' : '11px' }}
                  >
                    <motion.a
                      href="/about"
                      onClick={close}
                      whileHover={!isMobile ? { scale: 1.03, y: -2 } : {}}
                      whileTap={{ scale: 0.97 }}
                      style={{
                        flex: isMobile ? undefined : '1',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                        padding: isMobile ? '13px 18px' : '14px 22px',
                        background: 'linear-gradient(135deg, #10b981, #06b6d4)',
                        color: '#fff', fontWeight: 700,
                        fontSize: isMobile ? '0.88rem' : '0.93rem',
                        borderRadius: '13px', textDecoration: 'none',
                        boxShadow: '0 8px 26px rgba(16,185,129,0.28), inset 0 1px 0 rgba(255,255,255,0.16)',
                        letterSpacing: '-0.01em', cursor: 'pointer',
                      }}
                    >
                      {t('welcome.cta')}
                      <i className="bx bx-right-arrow-alt" style={{ fontSize: '1.1rem' }} />
                    </motion.a>

                    <motion.button
                      onClick={close}
                      whileHover={!isMobile ? { scale: 1.02 } : {}}
                      whileTap={{ scale: 0.97 }}
                      style={{
                        flex: isMobile ? undefined : '1',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                        padding: isMobile ? '13px 18px' : '14px 22px',
                        background: 'rgba(255,255,255,0.05)',
                        color: 'rgba(255,255,255,0.56)', fontWeight: 600,
                        fontSize: isMobile ? '0.88rem' : '0.93rem',
                        borderRadius: '13px',
                        border: '1px solid rgba(255,255,255,0.09)',
                        cursor: 'pointer', letterSpacing: '-0.01em',
                      }}
                    >
                      {t('welcome.skip')}
                      <i className="bx bx-chevron-right" style={{ fontSize: '1.1rem' }} />
                    </motion.button>
                  </motion.div>

                  {/* Indication Esc (desktop uniquement) */}
                  {!isMobile && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.85 }}
                      style={{ textAlign: 'center', marginTop: '16px', fontSize: '10px', color: 'rgba(255,255,255,0.16)', letterSpacing: '0.03em' }}
                    >
                      Appuyez sur{' '}
                      <kbd style={{ padding: '1px 6px', borderRadius: '4px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', fontSize: '9px' }}>Esc</kbd>
                      {' '}pour fermer
                    </motion.p>
                  )}

                  {/* Safe area iOS */}
                  {isMobile && <div style={{ height: 'env(safe-area-inset-bottom, 8px)' }} />}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes wm-gradient {
          0%   { background-position: 0% 50%; }
          100% { background-position: 300% 50%; }
        }
        @keyframes wm-pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 5px #10b981; }
          50%       { opacity: 0.35; box-shadow: 0 0 2px #10b981; }
        }
      `}</style>
    </>
  );
};

export default WelcomeModal;



// // src/components/modals/WelcomeModal.tsx
// //
// // Modal de bienvenue affiché au premier chargement de la page.
// // Fermé via le bouton, la touche Escape, ou un clic en dehors.
// // Mémorisé dans sessionStorage pour ne pas réapparaître sur la même session.
// //
// // Clés i18n à ajouter dans fr.json / en.json :
// //
// //  "welcome": {
// //    "badge": "Bienvenue chez nous",          // "Welcome to our agency"
// //    "title1": "Transformons",                 // "Let's Transform"
// //    "title2": "vos idées",                   // "your ideas"
// //    "title3": "en succès digital",           // "into digital success"
// //    "body": "DB Digital Agency conçoit ...", // description
// //    "cta": "Découvrir l'agence",             // "Explore the agency"
// //    "skip": "Continuer la visite",           // "Continue browsing"
// //    "tag1": "Développement Web",             // "Web Development"
// //    "tag2": "Mobile & Flutter",              // "Mobile & Flutter"
// //    "tag3": "Design UI/UX",                  // "UI/UX Design"
// //    "tag4": "Stratégie Digitale",            // "Digital Strategy"
// //    "stat1value": "200+",
// //    "stat1label": "Projets livrés",          // "Projects delivered"
// //    "stat2value": "98%",
// //    "stat2label": "Satisfaction client",     // "Client satisfaction"
// //    "stat3value": "7 ans",                   // "7 years"
// //    "stat3label": "D'expertise"              // "of expertise"
// //  }

// import React, { useEffect, useState, useCallback } from 'react';
// import { useTranslation } from 'react-i18next';
// import { motion, AnimatePresence } from 'motion/react';

// const STORAGE_KEY = 'db_welcome_seen2';

// const WelcomeModal: React.FC = () => {
//   const { t } = useTranslation();
//   const [isVisible, setIsVisible] = useState(false);
//   const [isClosing, setIsClosing] = useState(false);

//   // Afficher seulement si pas encore vu dans cette session
//   useEffect(() => {
//     const seen = sessionStorage.getItem(STORAGE_KEY);
//     if (!seen) {
//       const timer = setTimeout(() => setIsVisible(true), 800);
//       return () => clearTimeout(timer);
//     }
//   }, []);

//   const close = useCallback(() => {
//     setIsClosing(true);
//     sessionStorage.setItem(STORAGE_KEY, '1');
//     setTimeout(() => {
//       setIsVisible(false);
//       setIsClosing(false);
//     }, 400);
//   }, []);

//   // Fermer avec Escape
//   useEffect(() => {
//     const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
//     window.addEventListener('keydown', onKey);
//     return () => window.removeEventListener('keydown', onKey);
//   }, [close]);

//   // Bloquer le scroll quand ouvert
//   useEffect(() => {
//     if (isVisible) document.body.style.overflow = 'hidden';
//     else document.body.style.overflow = '';
//     return () => { document.body.style.overflow = ''; };
//   }, [isVisible]);

//   const tags = [
//     t('welcome.tag1'), t('welcome.tag2'), t('welcome.tag3'), t('welcome.tag4')
//   ];

//   const stats = [
//     { value: t('welcome.stat1value'), label: t('welcome.stat1label') },
//     { value: t('welcome.stat2value'), label: t('welcome.stat2label') },
//     { value: t('welcome.stat3value'), label: t('welcome.stat3label') },
//   ];

//   return (
//     <AnimatePresence>
//       {isVisible && (
//         <>
//           {/* ── Backdrop ── */}
//           <motion.div
//             key="backdrop"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.4 }}
//             onClick={close}
//             style={{
//               position: 'fixed',
//               inset: 0,
//               zIndex: 9998,
//               background: 'rgba(0,0,0,0.75)',
//               backdropFilter: 'blur(12px)',
//               WebkitBackdropFilter: 'blur(12px)',
//             }}
//           />

//           {/* ── Modal ── */}
//           <motion.div
//             key="modal"
//             role="dialog"
//             aria-modal="true"
//             aria-labelledby="welcome-title"
//             initial={{ opacity: 0, scale: 0.88, y: 40 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.92, y: 24 }}
//             transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
//             style={{
//               position: 'fixed',
//               inset: 0,
//               zIndex: 9999,
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               padding: '16px',
//               pointerEvents: 'none',
//             }}
//           >
//             <div
//               style={{
//                 pointerEvents: 'auto',
//                 width: '100%',
//                 maxWidth: '680px',
//                 borderRadius: '28px',
//                 overflow: 'hidden',
//                 position: 'relative',
//                 background: 'linear-gradient(145deg, rgba(10,20,18,0.97) 0%, rgba(5,12,22,0.98) 100%)',
//                 border: '1px solid rgba(255,255,255,0.08)',
//                 boxShadow: '0 40px 120px rgba(0,0,0,0.7), 0 0 0 1px rgba(16,185,129,0.1)',
//               }}
//             >
//               {/* ── Noise texture ── */}
//               <div style={{
//                 position: 'absolute', inset: 0, borderRadius: '28px', pointerEvents: 'none', zIndex: 0,
//                 backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
//                 opacity: 0.5
//               }} />

//               {/* ── Top gradient accent ── */}
//               <div style={{
//                 position: 'absolute', top: 0, left: 0, right: 0, height: '3px', zIndex: 1,
//                 background: 'linear-gradient(90deg, #10b981, #06b6d4, #8b5cf6, #10b981)',
//                 backgroundSize: '300% 100%',
//                 animation: 'gradientShift 4s linear infinite',
//               }} />

//               {/* ── Glow orbs ── */}
//               <div style={{ position: 'absolute', top: '-60px', left: '-60px', width: '220px', height: '220px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)', filter: 'blur(30px)', pointerEvents: 'none', zIndex: 0 }} />
//               <div style={{ position: 'absolute', bottom: '-40px', right: '-40px', width: '180px', height: '180px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)', filter: 'blur(30px)', pointerEvents: 'none', zIndex: 0 }} />

//               {/* ── Content ── */}
//               <div style={{ position: 'relative', zIndex: 2, padding: '40px 40px 36px' }}>

//                 {/* Close button */}
//                 <motion.button
//                   onClick={close}
//                   whileHover={{ scale: 1.1, rotate: 90 }}
//                   whileTap={{ scale: 0.9 }}
//                   transition={{ duration: 0.18 }}
//                   aria-label="Fermer"
//                   style={{
//                     position: 'absolute', top: '20px', right: '20px',
//                     width: '36px', height: '36px',
//                     borderRadius: '10px',
//                     background: 'rgba(255,255,255,0.06)',
//                     border: '1px solid rgba(255,255,255,0.1)',
//                     display: 'flex', alignItems: 'center', justifyContent: 'center',
//                     color: 'rgba(255,255,255,0.5)',
//                     cursor: 'pointer',
//                     fontSize: '18px',
//                     lineHeight: 1,
//                   }}
//                 >
//                   ✕
//                 </motion.button>

//                 {/* ── Header row ── */}
//                 <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
//                   {/* Logo */}
//                   <motion.div
//                     animate={{ scale: [1, 1.05, 1] }}
//                     transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
//                     style={{
//                       width: '52px', height: '52px', flexShrink: 0,
//                       borderRadius: '16px',
//                       background: 'linear-gradient(135deg, #10b981, #06b6d4)',
//                       display: 'flex', alignItems: 'center', justifyContent: 'center',
//                       boxShadow: '0 8px 24px rgba(16,185,129,0.35)',
//                     }}
//                   >
//                     <img src="/images/logo/logo-trans.png" alt="DB Digital Agency" style={{ width: '34px', height: '34px', objectFit: 'contain' }} />
//                   </motion.div>

//                   {/* Badge */}
//                   <div>
//                     <div style={{
//                       display: 'inline-flex', alignItems: 'center', gap: '7px',
//                       padding: '5px 12px',
//                       background: 'rgba(16,185,129,0.1)',
//                       border: '1px solid rgba(16,185,129,0.2)',
//                       borderRadius: '100px',
//                       marginBottom: '4px',
//                     }}>
//                       <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 6px #10b981', flexShrink: 0, animation: 'pulse 2s infinite' }} />
//                       <span style={{ color: '#34d399', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
//                         {t('welcome.badge')}
//                       </span>
//                     </div>
//                     <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '12px', margin: 0 }}>DB Digital Agency </p>
//                   </div>
//                 </div>

//                 {/* ── Main title ── */}
//                 <div style={{ marginBottom: '20px' }}>
//                   {[t('welcome.title1'), t('welcome.title2'), t('welcome.title3')].map((line, i) => (
//                     <motion.div
//                       key={i}
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: 0.25 + i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
//                     >
//                       {i === 1 ? (
//                         <span style={{
//                           display: 'block',
//                           fontSize: 'clamp(2rem, 5vw, 2.8rem)',
//                           fontWeight: 900,
//                           lineHeight: 1.05,
//                           letterSpacing: '-0.04em',
//                           background: 'linear-gradient(90deg, #10b981, #06b6d4)',
//                           WebkitBackgroundClip: 'text',
//                           WebkitTextFillColor: 'transparent',
//                           backgroundClip: 'text',
//                           fontFamily: "'Outfit', 'DM Sans', sans-serif",
//                         }}>{line}</span>
//                       ) : (
//                         <span style={{
//                           display: 'block',
//                           fontSize: 'clamp(2rem, 5vw, 2.8rem)',
//                           fontWeight: 900,
//                           lineHeight: 1.05,
//                           letterSpacing: '-0.04em',
//                           color: i === 2 ? 'rgba(255,255,255,0.55)' : '#ffffff',
//                           fontFamily: "'Outfit', 'DM Sans', sans-serif",
//                         }}>{line}</span>
//                       )}
//                     </motion.div>
//                   ))}
//                 </div>

//                 {/* ── Body text ── */}
//                 <motion.p
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.45, duration: 0.4 }}
//                   style={{
//                     color: 'rgba(255,255,255,0.5)',
//                     fontSize: '0.95rem',
//                     lineHeight: 1.75,
//                     marginBottom: '24px',
//                     maxWidth: '520px',
//                   }}
//                 >
//                   {t('welcome.body')}
//                 </motion.p>

//                 {/* ── Tags ── */}
//                 <motion.div
//                   initial={{ opacity: 0, y: 8 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.52, duration: 0.35 }}
//                   style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '28px' }}
//                 >
//                   {tags.map((tag, i) => (
//                     <span key={i} style={{
//                       padding: '6px 14px',
//                       borderRadius: '100px',
//                       background: 'rgba(255,255,255,0.05)',
//                       border: '1px solid rgba(255,255,255,0.09)',
//                       color: 'rgba(255,255,255,0.6)',
//                       fontSize: '12px',
//                       fontWeight: 500,
//                       letterSpacing: '0.02em',
//                     }}>{tag}</span>
//                   ))}
//                 </motion.div>

//                 {/* ── Stats ── */}
//                 <motion.div
//                   initial={{ opacity: 0, y: 8 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.58, duration: 0.35 }}
//                   style={{
//                     display: 'flex',
//                     gap: '0',
//                     marginBottom: '32px',
//                     padding: '18px 24px',
//                     background: 'rgba(255,255,255,0.03)',
//                     border: '1px solid rgba(255,255,255,0.07)',
//                     borderRadius: '16px',
//                   }}
//                 >
//                   {stats.map((s, i) => (
//                     <React.Fragment key={i}>
//                       <div style={{ flex: 1, textAlign: 'center' }}>
//                         <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1 }}>{s.value}</div>
//                         <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', marginTop: '5px', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{s.label}</div>
//                       </div>
//                       {i < 2 && <div style={{ width: '1px', background: 'rgba(255,255,255,0.08)', margin: '0 4px' }} />}
//                     </React.Fragment>
//                   ))}
//                 </motion.div>

//                 {/* ── CTAs ── */}
//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.65, duration: 0.35 }}
//                   style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}
//                 >
//                   {/* Primary CTA */}
//                   <motion.a
//                     href="/about"
//                     whileHover={{ scale: 1.03, y: -2 }}
//                     whileTap={{ scale: 0.97 }}
//                     onClick={close}
//                     style={{
//                       flex: '1',
//                       minWidth: '180px',
//                       display: 'inline-flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       gap: '8px',
//                       padding: '15px 24px',
//                       background: 'linear-gradient(135deg, #10b981, #06b6d4)',
//                       color: '#fff',
//                       fontWeight: 700,
//                       fontSize: '0.95rem',
//                       borderRadius: '14px',
//                       textDecoration: 'none',
//                       boxShadow: '0 8px 28px rgba(16,185,129,0.35), inset 0 1px 0 rgba(255,255,255,0.2)',
//                       letterSpacing: '-0.01em',
//                       cursor: 'pointer',
//                     }}
//                   >
//                     {t('welcome.cta')}
//                     <i className="bx bx-arrow-back" style={{ transform: 'rotate(180deg)', fontSize: '1.1rem' }} />
//                   </motion.a>

//                   {/* Skip */}
//                   <motion.button
//                     onClick={close}
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.97 }}
//                     style={{
//                       flex: '1',
//                       minWidth: '160px',
//                       display: 'inline-flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       gap: '8px',
//                       padding: '15px 24px',
//                       background: 'rgba(255,255,255,0.05)',
//                       backdropFilter: 'blur(8px)',
//                       color: 'rgba(255,255,255,0.65)',
//                       fontWeight: 600,
//                       fontSize: '0.95rem',
//                       borderRadius: '14px',
//                       border: '1px solid rgba(255,255,255,0.1)',
//                       cursor: 'pointer',
//                       letterSpacing: '-0.01em',
//                     }}
//                   >
//                     {t('welcome.skip')}
//                     <i className="bx bx-x-circle" style={{ fontSize: '1.1rem' }} />
//                   </motion.button>
//                 </motion.div>

//                 {/* ── Footer note ── */}
//                 <motion.p
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.8 }}
//                   style={{
//                     textAlign: 'center',
//                     marginTop: '20px',
//                     fontSize: '11px',
//                     color: 'rgba(255,255,255,0.2)',
//                     letterSpacing: '0.04em',
//                   }}
//                 >
//                   Appuyez sur <kbd style={{ padding: '1px 6px', borderRadius: '4px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', fontSize: '10px' }}>Esc</kbd> pour fermer
//                 </motion.p>
//               </div>
//             </div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// };

// export default WelcomeModal;