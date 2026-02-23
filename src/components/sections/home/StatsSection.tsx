// src/components/sections/home/StatsSection.tsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../contexts/ThemeContext';
import { motion, useInView } from "motion/react";

const STATS = [
  { 
    icon: 'bx bx-briefcase-alt', 
    value: 50,  
    suffix: '+', 
    label: 'Projets livrés',
    color: '#3B82F6',
    description: 'Projets web et mobile réussis'
  },
  { 
    icon: 'bx bx-smile', 
    value: 30,  
    suffix: '+', 
    label: 'Clients satisfaits',
    color: '#10B981',
    description: 'Entreprises de toutes tailles'
  },
  { 
    icon: 'bx bx-calendar-star', 
    value: 5,   
    suffix: '+', 
    label: "Ans d'expérience",
    color: '#8B5CF6',
    description: 'À votre service'
  },
  { 
    icon: 'bx bx-star', 
    value: 98,  
    suffix: '%', 
    label: 'Taux de satisfaction',
    color: '#F59E0B',
    description: 'Recommandation client'
  },
];

const StatCard: React.FC<{
  icon: string;
  value: number;
  suffix: string;
  label: string;
  description: string;
  color: string;
  delay: number;
  inView: boolean;
}> = ({ icon, value, suffix, label, description, color, delay, inView }) => {
  const [count, setCount] = useState(0);
  const { isDark } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!inView) return;

    let startTime: number;
    let animationFrame: number;
    const duration = 2000;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing cubic-out
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [inView, value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group"
    >
      <motion.div
        animate={{
          y: isHovered ? -10 : 0,
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={`relative p-8 rounded-2xl overflow-hidden backdrop-blur-sm border transition-all duration-300 ${
          isHovered
            ? 'shadow-2xl border-transparent'
            : 'shadow-lg border-gray-200 dark:border-gray-700'
        }`}
        style={{
          background: isHovered
            ? `linear-gradient(135deg, ${color}20, ${color}05)`
            : isDark ? 'rgba(17, 24, 39, 0.8)' : 'rgba(255, 255, 255, 0.9)',
        }}
      >
        {/* Cercle animé en arrière-plan */}
        <motion.div
          className="absolute -right-10 -top-10 w-32 h-32 rounded-full opacity-20"
          style={{ background: `radial-gradient(circle, ${color}, transparent)` }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Icône avec animation */}
        <motion.div
          animate={{
            rotate: isHovered ? 360 : 0,
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.5 }}
          className="w-16 h-16 rounded-xl mb-6 flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${color}, ${color}80)` }}
        >
          <i className={`${icon} text-3xl text-white`}></i>
        </motion.div>

        {/* Valeur */}
        <motion.div
          className="text-4xl md:text-5xl font-bold font-display mb-2"
          style={{
            background: `linear-gradient(90deg, ${color}, #00e676)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {count}{suffix}
        </motion.div>

        {/* Label */}
        <div className="text-sm font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-2">
          {label}
        </div>

        {/* Description */}
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {description}
        </div>

        {/* Effet de brillance */}
        {isHovered && (
          <motion.div
            className="absolute inset-0"
            initial={{ background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 0%, transparent 50%)' }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

export const StatsSection: React.FC = () => {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className="relative py-24 overflow-hidden">
      {/* Arrière-plan animé */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 ${
          isDark
            ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
            : 'bg-gradient-to-br from-gray-50 via-white to-gray-50'
        }`} />

        {/* Lignes animées */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px"
            style={{
              top: `${20 + i * 15}%`,
              left: 0,
              right: 0,
              background: `linear-gradient(90deg, transparent, ${
                isDark ? 'rgba(0,230,118,0.2)' : 'rgba(0,150,100,0.2)'
              }, transparent)`,
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
        {/* En-tête avec carte témoignage */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-7 h-0.5 rounded-full bg-green-500" />
              <span className="text-xs font-bold tracking-wider uppercase text-green-500">
                {t('stats.eyebrow', 'En chiffres')}
              </span>
            </div>
            <h2 className="font-display font-extrabold text-[clamp(28px,4vw,50px)] leading-tight tracking-tight text-gray-900 dark:text-white mb-4">
              Des résultats qui<br />
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                parlent d'eux-mêmes
              </span>
            </h2>
            <p className="text-base leading-relaxed text-gray-600 dark:text-gray-300">
              {t('stats.subtitle', "Chaque chiffre représente la confiance de nos clients et notre engagement à dépasser leurs attentes.")}
            </p>
          </motion.div>

          {/* Carte témoignage */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative group"
          >
            <div className={`p-8 rounded-2xl backdrop-blur-sm border transition-all duration-300 ${
              isDark
                ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-800/70'
                : 'bg-white/50 border-gray-200 hover:bg-white/70'
            } hover:shadow-2xl`}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center text-2xl">
                  🏆
                </div>
                <div>
                  <div className="font-bold text-gray-900 dark:text-white">
                    {t('stats.award', 'Meilleure agence digitale')}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {t('stats.awardLocation', 'Cameroun Tech Awards 2024')}
                  </div>
                </div>
              </div>

              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                  <strong className="text-gray-900 dark:text-white">4.9/5</strong> · 48 {t('stats.reviews', 'avis')}
                </span>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-300 italic mb-2">
                "{t('stats.testimonial', "DB Digital Agency a transformé notre vision en produit exceptionnel, livré avant le délai prévu.")}"
              </p>

              <div className="text-xs font-bold text-green-500">
                — {t('stats.testimonialAuthor', 'CEO, StartupCM')}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Cartes de statistiques */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat.icon}
              value={stat.value}
              suffix={stat.suffix}
              label={t(`stats.items.${index}`, stat.label)}
              description={stat.description}
              color={stat.color}
              delay={index * 0.1}
              inView={inView}
            />
          ))}
        </div>

        {/* Badge clients */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex items-center justify-center gap-4 mt-12"
        >
          <div className="flex -space-x-3">
            {[
              { initial: 'JD', color: '#3B82F6' },
              { initial: 'MK', color: '#10B981' },
              { initial: 'AL', color: '#8B5CF6' },
              { initial: 'SP', color: '#F59E0B' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.9 + i * 0.1 }}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold border-2 border-white dark:border-gray-800"
                style={{ background: `linear-gradient(135deg, ${item.color}, ${item.color}80)` }}
              >
                {item.initial}
              </motion.div>
            ))}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.3 }}
              className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 text-sm font-bold border-2 border-white dark:border-gray-800"
            >
              +30
            </motion.div>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            <strong className="text-gray-900 dark:text-white">30+</strong> {t('stats.clients', 'clients nous font déjà confiance')}
          </div>
        </motion.div>
      </div>
    </div>
  );
};





// // src/components/sections/home/StatsSection.tsx
// import React, { useEffect, useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import {  useInView } from 'framer-motion';
// import { motion } from "motion/react"
// import { useTheme } from '../../../contexts/ThemeContext';
// import { SectionTitle } from './SectionTitle';

// // Hook personnalisé pour l'animation des compteurs
// const useCounter = (end: number, duration: number = 2000, start: boolean) => {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     if (!start) return;

//     let startTime: number;
//     let animationFrame: number;

//     const animate = (timestamp: number) => {
//       if (!startTime) startTime = timestamp;
//       const progress = Math.min((timestamp - startTime) / duration, 1);
      
//       // Easing cubic-out
//       const eased = 1 - Math.pow(1 - progress, 3);
//       setCount(Math.floor(eased * end));

//       if (progress < 1) {
//         animationFrame = requestAnimationFrame(animate);
//       } else {
//         setCount(end);
//       }
//     };

//     animationFrame = requestAnimationFrame(animate);

//     return () => cancelAnimationFrame(animationFrame);
//   }, [end, duration, start]);

//   return count;
// };

// const StatCard: React.FC<{
//   icon: string;
//   value: number;
//   suffix: string;
//   label: string;
//   delay: number;
//   inView: boolean;
// }> = ({ icon, value, suffix, label, delay, inView }) => {
//   const count = useCounter(value, 2000, inView);

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 30 }}
//       animate={inView ? { opacity: 1, y: 0 } : {}}
//       transition={{ duration: 0.6, delay }}
//       className="text-center p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 group"
//     >
//       <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
//         {icon}
//       </div>
//       <div className="text-3xl md:text-4xl font-bold font-display text-green-600 dark:text-green-400 mb-2">
//         {count}{suffix}
//       </div>
//       <div className="text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider">
//         {label}
//       </div>
//     </motion.div>
//   );
// };

// const StatsSection: React.FC = () => {
//   const { t } = useTranslation();
//   const { isDark } = useTheme();
//   const ref = React.useRef<HTMLDivElement>(null);
//   const inView = useInView(ref, { once: true, margin: '-100px' });

//   const stats = [
//     { icon: '💼', value: 50, suffix: '+' },
//     { icon: '😊', value: 30, suffix: '+' },
//     { icon: '📅', value: 5, suffix: '+' },
//     { icon: '⭐', value: 98, suffix: '%' },
//   ];

//   const labels = t('home.stats.items', { returnObjects: true }) as string[];

//   return (
//     <section ref={ref} className="py-24 relative overflow-hidden">
//       {/* Arrière-plan avec lignes animées */}
//       <div className={`absolute inset-0 ${
//         isDark 
//           ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
//           : 'bg-gradient-to-br from-gray-50 via-white to-gray-50'
//       }`}>
//         {[...Array(3)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent"
//             style={{ top: `${30 + i * 20}%`, left: 0, right: 0 }}
//             animate={{ x: ['-100%', '100%'] }}
//             transition={{
//               duration: 8 + i * 2,
//               repeat: Infinity,
//               ease: 'linear',
//               delay: i * 2,
//             }}
//           />
//         ))}
//       </div>

//       <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
//           <SectionTitle
//             eyebrow={t('home.stats.eyebrow')}
//             title={t('home.stats.title')}
//             subtitle={t('home.stats.subtitle')}
//             inView={inView}
//           />

//           {/* Carte témoignage */}
//           <motion.div
//             initial={{ opacity: 0, x: 30 }}
//             animate={inView ? { opacity: 1, x: 0 } : {}}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg"
//           >
//             <div className="flex items-center gap-4 mb-4">
//               <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center text-white text-xl">
//                 🏆
//               </div>
//               <div>
//                 <div className="font-bold text-gray-900 dark:text-white">
//                   {t('home.stats.award')}
//                 </div>
//                 <div className="text-sm text-gray-500 dark:text-gray-400">
//                   {t('home.stats.awardLocation')}
//                 </div>
//               </div>
//             </div>
            
//             <div className="flex gap-1 mb-3">
//               {[...Array(5)].map((_, i) => (
//                 <span key={i} className="text-yellow-400">★</span>
//               ))}
//               <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
//                 <strong className="text-gray-900 dark:text-white">4.9/5</strong> · 48 {t('home.stats.reviews')}
//               </span>
//             </div>
            
//             <p className="text-gray-600 dark:text-gray-300 text-sm italic mb-2">
//               "{t('home.stats.testimonial')}"
//             </p>
            
//             <div className="text-sm font-bold text-green-600 dark:text-green-400">
//               — {t('home.stats.testimonialAuthor')}
//             </div>
//           </motion.div>
//         </div>

//         {/* Cartes de statistiques */}
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
//           {stats.map((stat, index) => (
//             <StatCard
//               key={index}
//               icon={stat.icon}
//               value={stat.value}
//               suffix={stat.suffix}
//               label={labels[index]}
//               delay={index * 0.1}
//               inView={inView}
//             />
//           ))}
//         </div>

//         {/* Badge clients */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.6, delay: 0.6 }}
//           className="flex items-center justify-center gap-4 mt-12"
//         >
//           <div className="flex -space-x-3">
//             {['JD', 'MK', 'AL', 'SP'].map((initials, i) => (
//               <div
//                 key={i}
//                 className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center text-white text-sm font-bold border-2 border-white dark:border-gray-800"
//               >
//                 {initials}
//               </div>
//             ))}
//             <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 text-sm font-bold border-2 border-white dark:border-gray-800">
//               +30
//             </div>
//           </div>
//           <div className="text-sm text-gray-600 dark:text-gray-300">
//             <strong className="text-gray-900 dark:text-white">30+</strong> {t('home.stats.clients')}
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default StatsSection;