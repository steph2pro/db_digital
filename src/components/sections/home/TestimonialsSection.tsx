import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView, AnimatePresence, Variants } from "motion/react";
import { useTheme } from '../../../contexts/ThemeContext';

// Données des témoignages avec avatars réels (Unsplash - photos de personnes réelles)
const TESTIMONIALS = [
  {
    id: 1,
    nameKey: 'testimonials.items.0.name',
    positionKey: 'testimonials.items.0.position',
    contentKey: 'testimonials.items.0.content',
    projectKey: 'testimonials.items.0.project',
    dateKey: 'testimonials.items.0.date',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces',
    rating: 5,
    gradient: 'from-blue-500 to-cyan-500',
    color: '#3B82F6',
  },
  {
    id: 2,
    nameKey: 'testimonials.items.1.name',
    positionKey: 'testimonials.items.1.position',
    contentKey: 'testimonials.items.1.content',
    projectKey: 'testimonials.items.1.project',
    dateKey: 'testimonials.items.1.date',
    avatar: 'https://tse1.mm.bing.net/th/id/OIP.SR6u7VNyDXaweQW0oqhtPAHaE8?rs=1&pid=ImgDetMain&o=7&rm=3',
    rating: 5,
    gradient: 'from-green-500 to-emerald-500',
    color: '#10B981',
  },
  {
    id: 3,
    nameKey: 'testimonials.items.2.name',
    positionKey: 'testimonials.items.2.position',
    contentKey: 'testimonials.items.2.content',
    projectKey: 'testimonials.items.2.project',
    dateKey: 'testimonials.items.2.date',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=faces',
    rating: 5,
    gradient: 'from-purple-500 to-pink-500',
    color: '#8B5CF6',
  },
  {
    id: 4,
    nameKey: 'testimonials.items.3.name',
    positionKey: 'testimonials.items.3.position',
    contentKey: 'testimonials.items.3.content',
    projectKey: 'testimonials.items.3.project',
    dateKey: 'testimonials.items.3.date',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces',
    rating: 5,
    gradient: 'from-orange-500 to-red-500',
    color: '#F59E0B',
  },
  {
    id: 5,
    nameKey: 'testimonials.items.4.name',
    positionKey: 'testimonials.items.4.position',
    contentKey: 'testimonials.items.4.content',
    projectKey: 'testimonials.items.4.project',
    dateKey: 'testimonials.items.4.date',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&h=200&fit=crop&crop=faces',
    rating: 5,
    gradient: 'from-yellow-500 to-amber-500',
    color: '#EAB308',
  },
  {
    id: 6,
    nameKey: 'testimonials.items.5.name',
    positionKey: 'testimonials.items.5.position',
    contentKey: 'testimonials.items.5.content',
    projectKey: 'testimonials.items.5.project',
    dateKey: 'testimonials.items.5.date',
    avatar: 'https://tse2.mm.bing.net/th/id/OIP.m-sqAhm-tw_bZoVkAa9EJwHaJl?rs=1&pid=ImgDetMain&o=7&rm=3',
    rating: 5,
    gradient: 'from-indigo-500 to-purple-500',
    color: '#6366F1',
  },
];

// Avatars alternatifs pour fallback (aussi des photos réelles)
const FALLBACK_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces',
  'https://tse1.mm.bing.net/th/id/OIP.SR6u7VNyDXaweQW0oqhtPAHaE8?rs=1&pid=ImgDetMain&o=7&rm=3',
  'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop&crop=faces',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop&crop=faces',
  'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=200&h=200&fit=crop&crop=faces',
  'https://tse2.mm.bing.net/th/id/OIP.m-sqAhm-tw_bZoVkAa9EJwHaJl?rs=1&pid=ImgDetMain&o=7&rm=3',
];

const Eyebrow: React.FC<{ children: React.ReactNode; center?: boolean }> = ({ children, center }) => (
  <div className={`flex items-center gap-2.5 mb-4 ${center ? 'justify-center' : 'justify-start'}`}>
    <span className="w-7 h-0.5 rounded-full bg-green-500 flex-shrink-0" />
    <span className="text-xs font-bold tracking-wider uppercase text-green-500 font-body">
      {children}
    </span>
  </div>
);

const SectionTitle: React.FC<{ children: React.ReactNode; center?: boolean }> = ({ children, center }) => (
  <h2 className={`font-display font-extrabold text-[clamp(28px,4vw,50px)] leading-tight tracking-tight text-gray-900 dark:text-white mb-4 ${center ? 'text-center' : 'text-left'}`}>
    {children}
  </h2>
);

export const TestimonialsSection: React.FC = () => {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Gestionnaire d'erreur d'image
  const handleImageError = (index: number) => {
    setImageErrors(prev => ({ ...prev, [index]: true }));
  };

  // Obtenir l'URL de l'avatar avec fallback
  const getAvatarUrl = (index: number) => {
    if (imageErrors[index]) {
      return FALLBACK_AVATARS[index % FALLBACK_AVATARS.length];
    }
    return TESTIMONIALS[index].avatar;
  };

  // Variants d'animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 12 },
    },
  };

  const cardVariants: Variants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.02,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const slideVariants: Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 },
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 },
      },
    }),
  };

  const particleVariants = {
    animate: (i: number) => ({
      x: [0, Math.cos(i * 30) * 50, 0],
      y: [0, Math.sin(i * 30) * 50, 0],
      scale: [0, 1, 0],
      opacity: [0, 0.5, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        delay: i * 0.1,
      },
    }),
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden">
      {/* Arrière-plan animé */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 ${
          isDark 
            ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
            : 'bg-gradient-to-br from-gray-50 via-white to-gray-50'
        }`} />

        {/* Grille de points */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle, ${isDark ? '#00e676' : '#00b894'} 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }} />
        </div>

        {/* Cercles lumineux flottants */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`circle-${i}`}
            className="absolute rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl"
            style={{
              background: `radial-gradient(circle, ${['#00e676', '#00a8e8', '#8B5CF6', '#F59E0B', '#EC4899'][i]} 0%, transparent 70%)`,
              width: 300 + i * 100,
              height: 300 + i * 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, 50, -50, 0],
              y: [0, -50, 50, 0],
              scale: [1, 1.2, 0.8, 1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

        {/* Lignes de lumière */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`line-${i}`}
            className="absolute h-px w-full"
            style={{
              top: `${30 + i * 30}%`,
              background: 'linear-gradient(90deg, transparent, #00e676, #00a8e8, #00e676, transparent)',
            }}
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 1.5,
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Eyebrow center>
            {t('testimonials.eyebrow')}
          </Eyebrow>
          <SectionTitle center>
            {t('testimonials.title')}
          </SectionTitle>
          <p className="text-base leading-relaxed text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </motion.div>

        {/* Carrousel principal */}
        <div className="relative max-w-5xl mx-auto">
          {/* Carte active */}
          <div className="relative h-[450px] md:h-[400px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0"
              >
                <motion.div
                  variants={cardVariants}
                  whileHover="hover"
                  className={`relative h-full rounded-3xl overflow-hidden backdrop-blur-xl border ${
                    isDark 
                      ? 'bg-gray-800/50 border-gray-700' 
                      : 'bg-white/50 border-gray-200'
                  }`}
                  style={{
                    boxShadow: `0 20px 40px -15px ${TESTIMONIALS[activeIndex].color}40`,
                  }}
                >
                  {/* Effet de gradient de fond */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${TESTIMONIALS[activeIndex].gradient} opacity-5`} />

                  {/* Particules animées */}
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={`particle-${i}`}
                      className="absolute w-1 h-1 rounded-full"
                      style={{
                        background: TESTIMONIALS[activeIndex].color,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      variants={particleVariants}
                      animate="animate"
                      custom={i}
                    />
                  ))}

                  <div className="relative p-8 md:p-12 h-full flex flex-col">
                    {/* Quote icon */}
                    <motion.div
                      animate={{
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                      }}
                      className="absolute top-8 right-8 text-6xl opacity-20"
                      style={{ color: TESTIMONIALS[activeIndex].color }}
                    >
                      "
                    </motion.div>

                    {/* Contenu */}
                    <div className="flex items-start gap-6 mb-6">
                      {/* Avatar avec animation */}
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="relative flex-shrink-0"
                      >
                        <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${TESTIMONIALS[activeIndex].gradient} p-1`}>
                          <div className="w-full h-full rounded-xl bg-gray-200 dark:bg-gray-700 overflow-hidden">
                            <img
                              src={getAvatarUrl(activeIndex)}
                              alt={t(TESTIMONIALS[activeIndex].nameKey) as string}
                              className="w-full h-full object-cover"
                              onError={() => handleImageError(activeIndex)}
                            />
                          </div>
                        </div>
                        
                        {/* Anneau lumineux */}
                        <motion.div
                          className="absolute -inset-1 rounded-3xl"
                          animate={{
                            boxShadow: [
                              `0 0 0 0 ${TESTIMONIALS[activeIndex].color}40`,
                              `0 0 20px 5px ${TESTIMONIALS[activeIndex].color}80`,
                              `0 0 0 0 ${TESTIMONIALS[activeIndex].color}40`,
                            ],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                          }}
                        />
                      </motion.div>

                      {/* Infos client */}
                      <div className="flex-1">
                        <h3 className={`text-2xl font-bold font-display mb-1 ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}>
                          {t(TESTIMONIALS[activeIndex].nameKey)}
                        </h3>
                        <p className="text-sm text-green-500 mb-2">
                          {t(TESTIMONIALS[activeIndex].positionKey)}
                        </p>
                        
                        {/* Étoiles */}
                        <div className="flex gap-1">
                          {[...Array(TESTIMONIALS[activeIndex].rating)].map((_, i) => (
                            <motion.i
                              key={i}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.1 }}
                              className="bx bxs-star text-yellow-400"
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Témoignage */}
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className={`text-lg leading-relaxed flex-1 ${
                        isDark ? 'text-gray-300' : 'text-gray-600'
                      }`}
                    >
                      "{t(TESTIMONIALS[activeIndex].contentKey)}"
                    </motion.p>

                    {/* Footer */}
                    <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                          isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                        }`}>
                          {t(TESTIMONIALS[activeIndex].projectKey)}
                        </span>
                        <span className="text-sm text-gray-500">
                          {t(TESTIMONIALS[activeIndex].dateKey)}
                        </span>
                      </div>
                      
                      {/* Badge de satisfaction */}
                      <motion.div
                        animate={{
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                        className="flex items-center gap-1 text-green-500"
                      >
                        <i className="bx bx-check-shield text-xl" />
                        <span className="text-xs font-bold">{t('testimonials.badge.satisfied')}</span>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Contrôles de navigation */}
          <div className="flex justify-center gap-4 mt-8">
            <motion.button
              onClick={handlePrev}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md border ${
                isDark
                  ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-800'
                  : 'bg-white/50 border-gray-200 hover:bg-white'
              }`}
              aria-label={t('testimonials.navigation.previous') as string}
            >
              <i className="bx bx-chevron-left text-2xl" />
            </motion.button>
            
            {/* Indicateurs */}
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setDirection(index > activeIndex ? 1 : -1);
                    setActiveIndex(index);
                  }}
                  className="relative"
                  whileHover={{ scale: 1.2 }}
                  aria-label={t('testimonials.navigation.goTo', { index: index + 1 }) as string}
                >
                  <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? 'w-8 bg-green-500'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`} />
                  
                  {/* Effet de pulse sur l'indicateur actif */}
                  {index === activeIndex && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-green-500"
                      animate={{
                        scale: [1, 2, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            <motion.button
              onClick={handleNext}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md border ${
                isDark
                  ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-800'
                  : 'bg-white/50 border-gray-200 hover:bg-white'
              }`}
              aria-label={t('testimonials.navigation.next') as string}
            >
              <i className="bx bx-chevron-right text-2xl" />
            </motion.button>
          </div>

          {/* Miniatures des autres témoignages */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-3 md:grid-cols-6 gap-3 mt-12"
          >
            {TESTIMONIALS.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                variants={itemVariants}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                onClick={() => {
                  setDirection(index > activeIndex ? 1 : -1);
                  setActiveIndex(index);
                }}
                className={`relative cursor-pointer rounded-xl overflow-hidden transition-all duration-300 ${
                  activeIndex === index ? 'ring-2 ring-green-500' : ''
                }`}
              >
                <motion.div
                  animate={{
                    scale: hoveredIndex === index ? 1.1 : 1,
                  }}
                  className="relative aspect-square"
                >
                  <img
                    src={getAvatarUrl(index)}
                    alt={t(testimonial.nameKey) as string}
                    className="w-full h-full object-cover"
                    onError={() => handleImageError(index)}
                  />
                  
                  {/* Overlay avec gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${
                    testimonial.gradient
                  } opacity-60`} />

                  {/* Nom au hover */}
                  <AnimatePresence>
                    {hoveredIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="absolute inset-0 flex items-end p-2"
                      >
                        <span className="text-xs font-bold text-white line-clamp-2 drop-shadow-lg">
                          {t(testimonial.nameKey)}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Indicateur actif */}
                  {activeIndex === index && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full"
                    />
                  )}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Éléments décoratifs flottants */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`float-${i}`}
          className="absolute w-1 h-1 bg-green-500 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, Math.random() * 30 - 15, 0],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 4,
          }}
        />
      ))}
    </section>
  );
};

export default TestimonialsSection;