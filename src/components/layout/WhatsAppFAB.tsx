import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from "motion/react";
import { useTheme } from '../../contexts/ThemeContext';

export const WhatsAppFAB: React.FC = () => {
  const { isDark } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const [pulseLevel, setPulseLevel] = useState(1);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Détection du scroll pour ajuster la position
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simulation de messages non lus (effet de notification)
  useEffect(() => {
    const interval = setInterval(() => {
      setNotificationCount(prev => prev === 0 ? 3 : 0);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Animation de pulsation dynamique
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseLevel(prev => prev === 1 ? 1.2 : 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Variants d'animation - Corrigé
  const fabVariants: Variants = {
    initial: { scale: 0, opacity: 0, rotate: -180 },
    animate: { 
      scale: 1, 
      opacity: 1, 
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 1
      }
    },
    hover: {
      scale: 1.15,
      rotate: [0, -10, 10, -5, 5, 0],
      transition: {
        rotate: {
          duration: 0.5,
          ease: "easeInOut"
        }
      }
    },
    tap: { 
      scale: 0.9,
      rotate: 0,
      transition: { duration: 0.1 }
    }
  };

  const particleVariants: Variants = {
    initial: { opacity: 0, scale: 0, x: 0, y: 0 },
    animate: (i: number) => ({
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      x: [0, Math.cos(i * 45 * Math.PI / 180) * 50],
      y: [0, Math.sin(i * 45 * Math.PI / 180) * 50],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        delay: i * 0.1,
        ease: "easeOut"
      }
    })
  };

  const ringVariants: Variants = {
    initial: { scale: 1, opacity: 0.5 },
    animate: {
      scale: [1, 1.5, 2],
      opacity: [0.5, 0.3, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeOut"
      }
    }
  };

  const tooltipVariants: Variants = {
    initial: { opacity: 0, y: 10, x: "-50%", scale: 0.8 },
    animate: { 
      opacity: 1, 
      y: 0, 
      x: "-50%", 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 25
      }
    },
    exit: { 
      opacity: 0, 
      y: -10, 
      x: "-50%", 
      scale: 0.8,
      transition: { duration: 0.2 }
    }
  };

  const messageVariants: Variants = {
    initial: { opacity: 0, x: 20 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0, 
      x: 20,
      transition: { duration: 0.2 }
    }
  };

  // Messages de bienvenue dynamiques
  const welcomeMessages = [
    "💬 Besoin d'aide ?",
    "🚀 Discutons de votre projet !",
    "⭐ Devis gratuit en 24h",
    "🎯 Transformation digitale",
    "💡 Une idée ? On la réalise !",
    "🤝 Devenez partenaire"
  ];
  const [currentMessage, setCurrentMessage] = useState(0);

  // Rotation des messages
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % welcomeMessages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Calcul de la position Y en fonction du scroll
  const getYPosition = () => {
    // Position de base : 120px du bas (au-dessus du bouton de retour en haut)
    const basePosition = 100;
    // Si on est en bas de la page, on remonte légèrement
    if (window.innerHeight + scrollPosition >= document.documentElement.scrollHeight - 100) {
      return basePosition + 50;
    }
    return basePosition;
  };

  return (
    <motion.div 
      className="fixed z-50"
      style={{
        bottom: getYPosition(),
        right: 24,
      }}
      animate={{
        bottom: getYPosition(),
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30
      }}
    >
      {/* Cercles de pulsation */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(37,211,102,0.3) 0%, transparent 70%)',
          filter: 'blur(8px)',
        }}
        animate={{
          scale: pulseLevel,
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Anneaux de notification */}
      <AnimatePresence>
        {notificationCount > 0 && (
          <>
            <motion.div
              className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white dark:border-gray-900"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: 1 
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatDelay: 2
              }}
            >
              {notificationCount}
            </motion.div>
            
            <motion.div
              className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full"
              variants={ringVariants}
              initial="initial"
              animate="animate"
            />
          </>
        )}
      </AnimatePresence>

      {/* Bouton principal */}
      <motion.a
        href="https://wa.me/237697374910?text=Bonjour%20DB%20Digital%20Agency%2C%20je%20souhaite%20en%20savoir%20plus%20sur%20vos%20services."
        target="_blank"
        rel="noopener noreferrer"
        className="relative block"
        variants={fabVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        whileTap="tap"
        onHoverStart={() => {
          setIsHovered(true);
          setShowTooltip(true);
        }}
        onHoverEnd={() => {
          setIsHovered(false);
          setShowTooltip(false);
        }}
        onClick={() => {
          setIsClicked(true);
          setTimeout(() => setIsClicked(false), 300);
        }}
      >
        {/* Effet de glow */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(37,211,102,0.6) 0%, transparent 70%)',
            filter: 'blur(12px)',
          }}
          animate={{
            scale: isHovered ? 1.3 : 1.1,
            opacity: isHovered ? 0.8 : 0.4,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Conteneur du bouton */}
        <motion.div
          className={`relative w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-2xl overflow-hidden ${
            isDark 
              ? 'bg-gradient-to-br from-green-500 to-emerald-600' 
              : 'bg-gradient-to-br from-green-500 to-green-600'
          }`}
          animate={{
            boxShadow: isHovered 
              ? '0 20px 40px rgba(37,211,102,0.6), 0 0 0 2px rgba(255,255,255,0.8)' 
              : '0 10px 30px rgba(37,211,102,0.4)',
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

          {/* Particules autour du bouton */}
          {isHovered && (
            <>
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute w-2 h-2 bg-green-400 rounded-full"
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

          {/* Icône WhatsApp */}
          <motion.i 
            className="bx bxl-whatsapp text-3xl md:text-4xl text-white"
            animate={{
              rotate: isHovered ? [0, -5, 5, -5, 5, 0] : 0,
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Effet de brillance */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>
      </motion.a>

      {/* Tooltip dynamique - apparaît à gauche sur mobile */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            className="absolute right-10 mb-20 bottom-1/2 w-64"
            variants={tooltipVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className={`relative rounded-2xl shadow-2xl overflow-hidden backdrop-blur-lg ${
              isDark
                ? 'bg-gray-800/90 border border-gray-700'
                : 'bg-white/90 border border-gray-200'
            }`}>
              {/* En-tête du tooltip */}
              <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-600">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                      <i className="bx bxl-whatsapp text-2xl text-white"></i>
                    </div>
                    <motion.div
                      className="absolute -top-1 -right-1 w-3 h-3 bg-green-300 rounded-full"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">WhatsApp</h4>
                    <p className="text-xs text-white/80">Réponse sous 5min</p>
                  </div>
                </div>
              </div>

              {/* Message dynamique */}
              <div className="p-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentMessage}
                    variants={messageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="flex items-center gap-2 text-sm mb-3"
                  >
                    <span className="text-2xl">{welcomeMessages[currentMessage].split(' ')[0]}</span>
                    <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {welcomeMessages[currentMessage].slice(2)}
                    </span>
                  </motion.div>
                </AnimatePresence>

                {/* Barre de progression des messages */}
                <div className="flex gap-1 mb-4">
                  {welcomeMessages.map((_, i) => (
                    <motion.div
                      key={i}
                      className={`h-1 flex-1 rounded-full ${
                        i === currentMessage
                          ? 'bg-green-500'
                          : isDark ? 'bg-gray-700' : 'bg-gray-200'
                      }`}
                      animate={{
                        scale: i === currentMessage ? [1, 1.2, 1] : 1,
                      }}
                      transition={{
                        duration: 0.3,
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </div>

                {/* Statistiques en direct */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className={`p-2 rounded-lg ${
                    isDark ? 'bg-gray-700/50' : 'bg-gray-100'
                  }`}>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Temps moyen</div>
                    <div className="font-bold text-green-500">2 min</div>
                  </div>
                  <div className={`p-2 rounded-lg ${
                    isDark ? 'bg-gray-700/50' : 'bg-gray-100'
                  }`}>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Satisfaction</div>
                    <div className="font-bold text-green-500">98%</div>
                  </div>
                </div>

                {/* Bouton d'action rapide */}
                <motion.a
                  href="https://wa.me/237697374910?text=Bonjour%20DB%20Digital%20Agency%2C%20je%20souhaite%20en%20savoir%20plus%20sur%20vos%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full py-3 px-4 rounded-xl text-center font-bold transition-all duration-300 ${
                    isDark
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-green-500 hover:bg-green-600 text-white'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center justify-center gap-2">
                    <i className="bx bxl-whatsapp"></i>
                    <span>Démarrer la discussion</span>
                  </span>
                </motion.a>
              </div>

              {/* Flèche du tooltip - ajustée pour la nouvelle position */}
              <div className={`absolute -bottom-2 right-6 w-4 h-4 transform rotate-45 sm:hidden ${
                isDark
                  ? 'bg-gray-800 border-r border-b border-gray-700'
                  : 'bg-white border-r border-b border-gray-200'
              }`} />
              
              {/* Flèche pour la position à gauche sur desktop */}
              <div className={`absolute hidden sm:block left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45 w-4 h-4 ${
                isDark
                  ? 'bg-gray-800 border-l border-b border-gray-700'
                  : 'bg-white border-l border-b border-gray-200'
              }`} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};

export default WhatsAppFAB;