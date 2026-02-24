// src/components/sections/home/TickerSection.tsx
import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView, Variants } from "motion/react";
import { useTheme } from '../../../contexts/ThemeContext';

const TickerSection: React.FC = () => {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.3 });
  
  const items = t('home.ticker.items', { returnObjects: true }) as string[];

  // Configuration des icônes et couleurs
  const itemConfig = [
    { icon: 'bx bx-code-alt', color: '#3B82F6', gradient: 'from-blue-500 to-cyan-500' },
    { icon: 'bx bx-mobile-alt', color: '#10B981', gradient: 'from-green-500 to-emerald-500' },
    { icon: 'bx bx-palette', color: '#8B5CF6', gradient: 'from-purple-500 to-pink-500' },
    { icon: 'bx bx-server', color: '#F59E0B', gradient: 'from-orange-500 to-yellow-500' },
    { icon: 'bx bx-line-chart', color: '#EC4899', gradient: 'from-pink-500 to-rose-500' },
    { icon: 'bx bx-chalkboard', color: '#6366F1', gradient: 'from-indigo-500 to-purple-500' },
    { icon: 'bx bx-cloud', color: '#06B6D4', gradient: 'from-cyan-500 to-blue-500' },
    { icon: 'bx bx-cart-alt', color: '#F97316', gradient: 'from-orange-500 to-red-500' },
  ];

  // Animation variants avec la nouvelle syntaxe
  const tickerVariants: Variants = {
    animate: {
      x: [0, -1920],
      transition: {
        x: {
          duration: 25,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop" as const,
        },
      },
    },
    pause: {
      x: 0,
      transition: {
        duration: 0,
      },
    },
  };

  // Animation pour les particules
  const particleVariants: Variants = {
    initial: { opacity: 0, scale: 0 },
    animate: (i: number) => ({
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      x: Math.cos(i * 60 * Math.PI / 180) * 20,
      y: Math.sin(i * 60 * Math.PI / 180) * 20,
      transition: {
        duration: 0.8,
        repeat: Infinity,
        delay: i * 0.1,
      },
    }),
  };

  // Animation pour les lignes lumineuses
  const lineVariants: Variants = {
    animate: {
      x: ['-100%', '100%'],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "linear",
        repeatType: "loop" as const,
      },
    },
  };

  const lineReverseVariants : Variants= {
    animate: {
      x: ['100%', '-100%'],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "linear",
        repeatType: "loop" as const,
      },
    },
  };

  return (
    <div ref={sectionRef} className="relative overflow-hidden">
      {/* Bande supérieure avec effet de profondeur */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent" />
      
      {/* Conteneur principal avec glassmorphisme */}
      <div className={`relative backdrop-blur-xl transition-colors duration-500 ${
        isDark 
          ? 'bg-gray-900/90 border-y border-green-500/20' 
          : 'bg-white/90 border-y border-green-500/10'
      }`}>
        
        {/* Effet de lumière en arrière-plan */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Grille de points animés */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle, ${isDark ? '#00e676' : '#00b894'} 1px, transparent 1px)`,
              backgroundSize: '30px 30px',
            }} />
          </div>

          {/* Lignes de lumière diagonales */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`light-${i}`}
              className="absolute h-[200%] w-20 bg-gradient-to-r from-transparent via-green-500/10 to-transparent"
              style={{
                left: `${i * 25}%`,
                top: '-50%',
                rotate: '45deg',
              }}
              animate={{
                x: ['-100%', '200%'],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: 'linear',
                delay: i * 1.5,
                repeatType: 'loop',
              }}
            />
          ))}
        </div>

        {/* Contenu principal */}
        <div className="relative py-6 md:py-10">
          {/* Badge "EN DIRECT" animé - caché sur mobile */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="absolute left-8 top-1/2 transform -translate-y-1/2 z-30 hidden lg:block"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <motion.div
                  className="absolute inset-0 bg-green-500 rounded-full"
                  animate={{ scale: [1, 2, 1], opacity: [0.8, 0, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <span className={`text-xs font-bold uppercase tracking-wider ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                EN DIRECT • {items.length} EXPERTISES
              </span>
            </div>
          </motion.div>

          {/* Badge interactif à droite - caché sur mobile */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="absolute right-8 top-1/2 transform -translate-y-1/2 z-30 hidden lg:block"
          >
            <motion.button
              onClick={() => setIsPaused(!isPaused)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md border transition-all duration-300 ${
                isDark
                  ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-800'
                  : 'bg-white/50 border-gray-200 hover:bg-white'
              }`}
            >
              <motion.div
                animate={{ rotate: isPaused ? 0 : 360 }}
                transition={{ duration: 2, repeat: isPaused ? 0 : Infinity, ease: 'linear' }}
              >
                <i className={`bx ${isPaused ? 'bx-play' : 'bx-pause'} text-lg ${
                  isDark ? 'text-green-400' : 'text-green-600'
                }`}></i>
              </motion.div>
              <span className="text-sm font-medium">
                {isPaused ? 'Reprendre' : 'Pause'}
              </span>
            </motion.button>
          </motion.div>

          {/* Zone de ticker avec effet de profondeur */}
          <div className="relative overflow-hidden">
            {/* Overlays latéraux avec effet de fondu - cachés sur mobile */}
            <div className={`absolute left-0 top-0 bottom-0 w-64 z-20 pointer-events-none hidden lg:block ${
              isDark
                ? 'bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent'
                : 'bg-gradient-to-r from-white via-white/80 to-transparent'
            }`} />
            
            <div className={`absolute right-0 top-0 bottom-0 w-64 z-20 pointer-events-none hidden lg:block ${
              isDark
                ? 'bg-gradient-to-l from-gray-900 via-gray-900/80 to-transparent'
                : 'bg-gradient-to-l from-white via-white/80 to-transparent'
            }`} />

            {/* Lignes lumineuses flottantes */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background: 'linear-gradient(90deg, transparent, #00e676, #00a8e8, #00e676, transparent)',
              }}
              variants={lineVariants}
              animate="animate"
            />

            <motion.div
              className="absolute bottom-0 left-0 right-0 h-px"
              style={{
                background: 'linear-gradient(90deg, transparent, #00a8e8, #00e676, #00a8e8, transparent)',
              }}
              variants={lineReverseVariants}
              animate="animate"
            />

            {/* Ticker principal - adapté pour mobile */}
            <div className="block lg:hidden">
              {/* Version mobile : grille 2 colonnes */}
              <div className="grid grid-cols-2 gap-4 p-4">
                {items.map((item, itemIndex) => {
                  const config = itemConfig[itemIndex % itemConfig.length];
                  const isHovered = hoveredIndex === itemIndex;
                  
                  return (
                    <motion.div
                      key={`mobile-${itemIndex}`}
                      className="relative group/item w-full"
                      onHoverStart={() => setHoveredIndex(itemIndex)}
                      onHoverEnd={() => setHoveredIndex(null)}
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    >
                      {/* Carte principale */}
                      <motion.div
                        animate={{
                          scale: isHovered ? 1.05 : 1,
                          y: isHovered ? -2 : 0,
                        }}
                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                        className="relative"
                      >
                        {/* Effet de glow au hover */}
                        <motion.div
                          className="absolute inset-0 rounded-xl"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: isHovered ? 0.5 : 0 }}
                          style={{
                            background: `radial-gradient(circle at 50% 50%, ${config.color}, transparent 70%)`,
                            filter: 'blur(20px)',
                          }}
                        />

                        {/* Contenu de la carte */}
                        <div className={`relative flex flex-col items-center gap-2 p-4 rounded-xl backdrop-blur-sm border-2 transition-all duration-300 ${
                          isDark
                            ? 'bg-gray-800/50 border-gray-700'
                            : 'bg-white/50 border-gray-200'
                        } ${isHovered ? 'border-transparent' : ''}`}
                        style={{
                          borderColor: isHovered ? config.color : undefined,
                        }}>
                          {/* Icône avec animations multiples */}
                          <motion.div
                            animate={{
                              rotate: isHovered ? [0, -5, 5, -2, 2, 0] : 0,
                              scale: isHovered ? 1.1 : 1,
                            }}
                            transition={{ duration: 0.5 }}
                            className="relative"
                          >
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center shadow-lg`}>
                              <i className={`${config.icon} text-xl text-white`}></i>
                            </div>
                            
                            {/* Particules autour de l'icône */}
                            {isHovered && (
                              <>
                                {[...Array(4)].map((_, i) => (
                                  <motion.div
                                    key={`particle-${i}`}
                                    className="absolute w-1 h-1 rounded-full"
                                    style={{ background: config.color }}
                                    variants={particleVariants}
                                    initial="initial"
                                    animate="animate"
                                    custom={i}
                                  />
                                ))}
                              </>
                            )}
                          </motion.div>

                          {/* Texte */}
                          <div className="flex flex-col items-center text-center">
                            <motion.span
                              animate={{
                                color: isHovered ? config.color : undefined,
                              }}
                              className={`text-sm font-bold uppercase tracking-wider transition-colors duration-300 ${
                                isDark ? 'text-white' : 'text-gray-900'
                              }`}
                            >
                              {item}
                            </motion.span>
                            
                            {/* Sous-titre qui apparaît au hover */}
                            <motion.span
                              initial={{ opacity: 0, height: 0 }}
                              animate={{
                                opacity: isHovered ? 1 : 0,
                                height: isHovered ? 'auto' : 0,
                              }}
                              className="text-[10px] text-gray-500 dark:text-gray-400 overflow-hidden mt-1"
                            >
                              En savoir plus
                            </motion.span>
                          </div>

                          {/* Badge de tendance */}
                          {itemIndex % 3 === 0 && (
                            <motion.div
                              animate={{
                                scale: [1, 1.2, 1],
                                rotate: [0, 5, -5, 0],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                              }}
                              className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white text-[8px] font-bold"
                            >
                              🔥
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Version desktop : ticker défilant */}
            <motion.div
              className="hidden lg:flex gap-8 whitespace-nowrap py-6"
              variants={tickerVariants}
              animate={isPaused || !inView ? "pause" : "animate"}
              onHoverStart={() => setIsPaused(true)}
              onHoverEnd={() => setIsPaused(false)}
            >
              {/* Multiplier les items pour un effet infini */}
              {[...Array(6)].map((_, arrayIndex) => (
                <React.Fragment key={`block-${arrayIndex}`}>
                  {items.map((item, itemIndex) => {
                    const config = itemConfig[itemIndex % itemConfig.length];
                    const isHovered = hoveredIndex === (arrayIndex * items.length + itemIndex);
                    
                    return (
                      <motion.div
                        key={`${arrayIndex}-${itemIndex}`}
                        className="relative group/item"
                        onHoverStart={() => setHoveredIndex(arrayIndex * items.length + itemIndex)}
                        onHoverEnd={() => setHoveredIndex(null)}
                      >
                        {/* ... reste du code desktop inchangé ... */}
                        {/* Carte principale */}
                        <motion.div
                          animate={{
                            scale: isHovered ? 1.1 : 1,
                            y: isHovered ? -4 : 0,
                          }}
                          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                          className="relative"
                        >
                          {/* Effet de glow au hover */}
                          <motion.div
                            className="absolute inset-0 rounded-2xl"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isHovered ? 0.5 : 0 }}
                            style={{
                              background: `radial-gradient(circle at 50% 50%, ${config.color}, transparent 70%)`,
                              filter: 'blur(20px)',
                            }}
                          />

                          {/* Contenu de la carte */}
                          <div className={`relative flex items-center gap-4 px-8 py-4 rounded-2xl backdrop-blur-sm border-2 transition-all duration-300 ${
                            isDark
                              ? 'bg-gray-800/50 border-gray-700'
                              : 'bg-white/50 border-gray-200'
                          } ${isHovered ? 'border-transparent' : ''}`}
                          style={{
                            borderColor: isHovered ? config.color : undefined,
                          }}>
                            {/* Icône avec animations multiples */}
                            <motion.div
                              animate={{
                                rotate: isHovered ? [0, -10, 10, -5, 5, 0] : 0,
                                scale: isHovered ? 1.2 : 1,
                              }}
                              transition={{ duration: 0.5 }}
                              className="relative"
                            >
                              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center shadow-lg`}>
                                <i className={`${config.icon} text-xl text-white`}></i>
                              </div>
                              
                              {/* Particules autour de l'icône */}
                              {isHovered && (
                                <>
                                  {[...Array(6)].map((_, i) => (
                                    <motion.div
                                      key={`particle-${i}`}
                                      className="absolute w-1 h-1 rounded-full"
                                      style={{ background: config.color }}
                                      variants={particleVariants}
                                      initial="initial"
                                      animate="animate"
                                      custom={i}
                                    />
                                  ))}
                                </>
                              )}
                            </motion.div>

                            {/* Texte */}
                            <div className="flex flex-col">
                              <motion.span
                                animate={{
                                  color: isHovered ? config.color : undefined,
                                }}
                                className={`text-base font-black uppercase tracking-wider transition-colors duration-300 ${
                                  isDark ? 'text-white' : 'text-gray-900'
                                }`}
                              >
                                {item}
                              </motion.span>
                              
                              {/* Sous-titre qui apparaît au hover */}
                              <motion.span
                                initial={{ opacity: 0, height: 0 }}
                                animate={{
                                  opacity: isHovered ? 1 : 0,
                                  height: isHovered ? 'auto' : 0,
                                }}
                                className="text-xs text-gray-500 dark:text-gray-400 overflow-hidden"
                              >
                                Cliquez pour en savoir plus
                              </motion.span>
                            </div>

                            {/* Badge de tendance */}
                            {itemIndex % 3 === 0 && (
                              <motion.div
                                animate={{
                                  scale: [1, 1.2, 1],
                                  rotate: [0, 5, -5, 0],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                }}
                                className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold"
                              >
                                🔥
                              </motion.div>
                            )}
                          </div>
                        </motion.div>

                        {/* Séparateur animé */}
                        <motion.div
                          animate={{
                            scale: isHovered ? [1, 1.5, 1] : 1,
                            rotate: isHovered ? [0, 90, 0] : 0,
                          }}
                          transition={{ duration: 0.5 }}
                          className="absolute -right-4 top-1/2 transform -translate-y-1/2"
                        >
                          <div className="relative">
                            <div className={`w-2 h-2 rounded-full ${
                              isDark ? 'bg-green-500/30' : 'bg-green-500/50'
                            }`}>
                              <motion.div
                                className="absolute inset-0 rounded-full"
                                animate={{
                                  scale: [1, 2, 1],
                                  opacity: [0.5, 0, 0.5],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  delay: itemIndex * 0.1,
                                }}
                                style={{
                                  background: isDark ? 'rgba(0,230,118,0.2)' : 'rgba(0,150,100,0.2)',
                                }}
                              />
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </React.Fragment>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Barre de progression en bas */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500"
          variants={lineVariants}
          animate="animate"
        />
      </div>

      {/* Éléments décoratifs flottants */}
      <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-green-500/10 rounded-full blur-2xl" />
      <div className="absolute -top-6 -right-6 w-20 h-20 bg-blue-500/10 rounded-full blur-2xl" />
      
      {/* Particules flottantes */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`floating-${i}`}
          className="absolute w-1 h-1 bg-green-500 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            repeatType: "loop",
          }}
        />
      ))}
    </div>
  );
};

export default TickerSection;