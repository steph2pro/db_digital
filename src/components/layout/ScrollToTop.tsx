// src/components/common/ScrollToTop.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from "motion/react";
import { useTheme } from '../../contexts/ThemeContext';

export const ScrollToTop: React.FC = () => {
  const { isDark } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // Détection du scroll pour afficher/masquer le bouton
  useEffect(() => {
    const handleScroll = () => {
      // Afficher le bouton après 300px de scroll
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 300);

      // Calculer la progression du scroll (pour l'animation du cercle)
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fonction pour remonter en haut
  const scrollToTop = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 500);

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Variants d'animation
  const buttonVariants: Variants = {
    initial: { 
      scale: 0, 
      opacity: 0,
      rotate: -180,
      y: 20
    },
    animate: { 
      scale: 1, 
      opacity: 1, 
      rotate: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 0.6
      }
    },
    exit: { 
      scale: 0, 
      opacity: 0, 
      rotate: 180,
      y: 20,
      transition: { duration: 0.3 }
    },
    hover: {
      scale: 1.15,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { 
      scale: 0.9,
      transition: { duration: 0.1 }
    }
  };

  const progressVariants: Variants = {
    initial: { pathLength: 0 },
    animate: { 
      pathLength: scrollProgress / 100,
      transition: { duration: 0.3 }
    }
  };

  const particleVariants: Variants = {
    initial: { opacity: 0, scale: 0, x: 0, y: 0 },
    animate: (i: number) => ({
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      x: [0, Math.cos(i * 45 * Math.PI / 180) * 40],
      y: [0, Math.sin(i * 45 * Math.PI / 180) * 40],
      transition: {
        duration: 1,
        repeat: Infinity,
        delay: i * 0.1,
        ease: "easeOut"
      }
    })
  };

  const waveVariants: Variants = {
    initial: { scale: 1, opacity: 0.5 },
    animate: {
      scale: [1, 1.5, 2],
      opacity: [0.5, 0.3, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeOut"
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed z-50 cursor-pointer"
          style={{
            bottom: 24,
            right: 24,
          }}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={buttonVariants}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          onClick={scrollToTop}
        >
          {/* Conteneur principal */}
          <div className="relative">
            {/* Cercles de pulsation */}
            <motion.div
              variants={waveVariants}
              initial="initial"
              animate="animate"
              className={`absolute inset-0 rounded-full ${
                isDark 
                  ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30' 
                  : 'bg-gradient-to-r from-blue-500/30 to-cyan-500/30'
              }`}
              style={{ filter: 'blur(8px)' }}
            />

            {/* Particules autour du bouton */}
            {isHovered && (
              <>
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={`particle-${i}`}
                    className={`absolute w-1.5 h-1.5 rounded-full ${
                      isDark ? 'bg-purple-400' : 'bg-blue-400'
                    }`}
                    variants={particleVariants}
                    initial="initial"
                    animate="animate"
                    custom={i}
                    style={{
                      left: '50%',
                      top: '50%',
                    }}
                  />
                ))}
              </>
            )}

            {/* Bouton principal */}
            <motion.div
              className={`relative w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-2xl overflow-hidden ${
                isDark
                  ? 'bg-gradient-to-br from-purple-600 via-purple-500 to-pink-600'
                  : 'bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500'
              }`}
              animate={{
                boxShadow: isHovered 
                  ? isDark
                    ? '0 20px 40px rgba(168, 85, 247, 0.6), 0 0 0 2px rgba(255,255,255,0.8)'
                    : '0 20px 40px rgba(59, 130, 246, 0.6), 0 0 0 2px rgba(255,255,255,0.8)'
                  : isDark
                    ? '0 10px 30px rgba(168, 85, 247, 0.4)'
                    : '0 10px 30px rgba(59, 130, 246, 0.4)',
              }}
            >
              {/* Vagues d'impact au clic */}
              <AnimatePresence>
                {isClicked && (
                  <>
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={`wave-${i}`}
                        className="absolute inset-0 rounded-full border-2 border-white"
                        initial={{ scale: 1, opacity: 0.8 }}
                        animate={{ 
                          scale: 1.5 + i * 0.3, 
                          opacity: 0,
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ 
                          duration: 0.6,
                          delay: i * 0.1,
                          ease: "easeOut"
                        }}
                      />
                    ))}
                  </>
                )}
              </AnimatePresence>

              {/* Cercle de progression SVG */}
              <svg
                className="absolute inset-0 w-full h-full -rotate-90"
                viewBox="0 0 100 100"
              >
                {/* Cercle de fond */}
                <circle
                  cx="50"
                  cy="50"
                  r="46"
                  fill="none"
                  stroke={isDark ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.3)'}
                  strokeWidth="4"
                />
                
                {/* Cercle de progression */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="46"
                  fill="none"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                  variants={progressVariants}
                  initial="initial"
                  animate="animate"
                  style={{
                    pathLength: scrollProgress / 100,
                    strokeDasharray: "289.0272", // Circonférence approximative
                    strokeDashoffset: 289.0272 * (1 - scrollProgress / 100)
                  }}
                />
              </svg>

              {/* Effet de brillance */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                  repeatDelay: 1
                }}
              />

              {/* Icône */}
              <motion.i 
                className="bx bx-chevron-up text-3xl md:text-4xl text-white relative z-10"
                animate={{
                  y: isHovered ? [-2, 2, -2] : 0,
                  scale: isHovered ? 1.1 : 1,
                }}
                transition={{
                  y: {
                    duration: 0.8,
                    repeat: isHovered ? Infinity : 0,
                    ease: "easeInOut"
                  }
                }}
              />

              {/* Petit indicateur de progression */}
              <motion.div
                className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg"
                animate={{
                  scale: isHovered ? 1.1 : 1,
                }}
              >
                <span className={isDark ? 'text-purple-600' : 'text-blue-600'}>
                  {Math.round(scrollProgress)}%
                </span>
              </motion.div>
            </motion.div>

            {/* Tooltip au survol */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  className="absolute right-full mr-4 top-1/2 -translate-y-1/2 whitespace-nowrap"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={`relative px-4 py-2 rounded-xl shadow-lg backdrop-blur-sm ${
                    isDark
                      ? 'bg-gray-800/90 text-white border border-gray-700'
                      : 'bg-white/90 text-gray-900 border border-gray-200'
                  }`}>
                    <span className="text-sm font-medium">Retour en haut</span>
                    <div className={`absolute left-full top-1/2 -translate-y-1/2 -ml-1 w-2 h-2 transform rotate-45 ${
                      isDark
                        ? 'bg-gray-800 border-t border-r border-gray-700'
                        : 'bg-white border-t border-r border-gray-200'
                    }`} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;