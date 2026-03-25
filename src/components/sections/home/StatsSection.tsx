import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../contexts/ThemeContext';
import { motion, useInView } from "motion/react";

const STATS = [
  { 
    icon: 'bx bx-briefcase-alt', 
    value: 250,  
    suffix: '+', 
    labelKey: 'stats.items.projects',
    color: '#3B82F6',
    descriptionKey: 'stats.items.projectsDesc'
  },
  { 
    icon: 'bx bx-smile', 
    value: 200,  
    suffix: '+', 
    labelKey: 'stats.items.clients',
    color: '#10B981',
    descriptionKey: 'stats.items.clientsDesc'
  },
  { 
    icon: 'bx bx-calendar-star', 
    value: 10,   
    suffix: '+', 
    labelKey: 'stats.items.experience',
    color: '#8B5CF6',
    descriptionKey: 'stats.items.experienceDesc'
  },
  { 
    icon: 'bx bx-star', 
    value: 100,  
    suffix: '%', 
    labelKey: 'stats.items.satisfaction',
    color: '#F59E0B',
    descriptionKey: 'stats.items.satisfactionDesc'
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
      
      // Easing cubic-out pour un effet plus naturel
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
          y: isHovered ? -5 : 0,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={`relative p-4 sm:p-5 md:p-8 rounded-xl sm:rounded-2xl overflow-hidden backdrop-blur-sm border transition-all duration-300 ${
          isHovered
            ? 'shadow-xl border-transparent'
            : 'shadow-lg border-gray-200 dark:border-gray-700'
        }`}
        style={{
          background: isHovered
            ? `linear-gradient(135deg, ${color}20, ${color}05)`
            : isDark ? 'rgba(17, 24, 39, 0.9)' : 'rgba(255, 255, 255, 0.95)',
        }}
      >
        {/* Cercle animé en arrière-plan */}
        <motion.div
          className="absolute -right-5 sm:-right-10 -top-5 sm:-top-10 w-16 sm:w-32 h-16 sm:h-32 rounded-full opacity-30 sm:opacity-20"
          style={{ background: `radial-gradient(circle, ${color}, transparent)` }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
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
          className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl mb-3 sm:mb-4 md:mb-6 flex items-center justify-center mx-auto sm:mx-0"
          style={{ background: `linear-gradient(135deg, ${color}, ${color}80)` }}
        >
          <i className={`${icon} text-xl sm:text-2xl md:text-3xl text-white`}></i>
        </motion.div>

        {/* Valeur animée */}
        <motion.div
          className="text-3xl sm:text-4xl md:text-5xl font-bold font-display mb-1 sm:mb-2 text-center sm:text-left"
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
        <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-1 text-center sm:text-left">
          {label}
        </div>

        {/* Description */}
        <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 text-center sm:text-left">
          {description}
        </div>

        {/* Effet de brillance */}
        {isHovered && (
          <motion.div
            className="absolute inset-0"
            initial={{ background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)' }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0, 0.4, 0],
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
    <div ref={ref} className="relative py-12 sm:py-16 md:py-24 overflow-hidden">
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
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center mb-8 sm:mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-3 sm:mb-4">
              <span className="w-5 sm:w-7 h-0.5 rounded-full bg-green-500" />
              <span className="text-[10px] sm:text-xs font-bold tracking-wider uppercase text-green-500">
                {t('stats.eyebrow')}
              </span>
            </div>
            <h2 className="font-display font-extrabold text-[clamp(24px,5vw,50px)] leading-tight tracking-tight text-gray-900 dark:text-white mb-3 sm:mb-4">
              {t('stats.title.line1')}<br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                {t('stats.title.line2')}
              </span>
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-gray-600 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0">
              {t('stats.subtitle')}
            </p>
          </motion.div>

          {/* Carte témoignage - adaptée pour une entreprise tech */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative group w-full max-w-md mx-auto lg:mx-0"
          >
            <div className={`p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl backdrop-blur-sm border transition-all duration-300 ${
              isDark
                ? 'bg-gray-800/70 border-gray-700 hover:bg-gray-800/80'
                : 'bg-white/70 border-gray-200 hover:bg-white/80'
            } hover:shadow-xl sm:hover:shadow-2xl`}>
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center text-lg sm:text-xl md:text-2xl">
                  💻
                </div>
                <div>
                  <div className="font-bold text-sm sm:text-base text-gray-900 dark:text-white">
                    {t('stats.award')}
                  </div>
                  <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
                    {t('stats.awardLocation')}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-1 mb-2 sm:mb-3">
                <div className="flex gap-0.5 sm:gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-sm sm:text-base">★</span>
                  ))}
                </div>
                <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 ml-1 sm:ml-2">
                  <strong className="text-gray-900 dark:text-white">4.9/5</strong> · {t('stats.reviewsCount')} {t('stats.reviews')}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 italic mb-2">
                "{t('stats.testimonial')}"
              </p>

              <div className="text-[10px] sm:text-xs font-bold text-green-500">
                — {t('stats.testimonialAuthor')}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Cartes de statistiques */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {STATS.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat.icon}
              value={stat.value}
              suffix={stat.suffix}
              label={t(stat.labelKey)}
              description={t(stat.descriptionKey)}
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
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-10 md:mt-12"
        >
          <div className="flex -space-x-2 sm:-space-x-3">
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
                className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold border-2 border-white dark:border-gray-800"
                style={{ background: `linear-gradient(135deg, ${item.color}, ${item.color}80)` }}
              >
                {item.initial}
              </motion.div>
            ))}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.3 }}
              className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 text-xs sm:text-sm font-bold border-2 border-white dark:border-gray-800"
            >
              +150
            </motion.div>
          </div>
          <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 text-center">
            <strong className="text-gray-900 dark:text-white">150+</strong> {t('stats.clients')}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// // src/components/sections/home/StatsSection.tsx
// import React, { useState, useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
// import { useTheme } from '../../../contexts/ThemeContext';
// import { motion, useInView } from "motion/react";

// const STATS = [
//   { 
//     icon: 'bx bx-briefcase-alt', 
//     value: 50,  
//     suffix: '+', 
//     label: 'Projets livrés',
//     color: '#3B82F6',
//     description: 'Projets web et mobile réussis'
//   },
//   { 
//     icon: 'bx bx-smile', 
//     value: 30,  
//     suffix: '+', 
//     label: 'Clients satisfaits',
//     color: '#10B981',
//     description: 'Entreprises de toutes tailles'
//   },
//   { 
//     icon: 'bx bx-calendar-star', 
//     value: 5,   
//     suffix: '+', 
//     label: "Ans d'expérience",
//     color: '#8B5CF6',
//     description: 'À votre service'
//   },
//   { 
//     icon: 'bx bx-star', 
//     value: 98,  
//     suffix: '%', 
//     label: 'Taux de satisfaction',
//     color: '#F59E0B',
//     description: 'Recommandation client'
//   },
// ];

// const StatCard: React.FC<{
//   icon: string;
//   value: number;
//   suffix: string;
//   label: string;
//   description: string;
//   color: string;
//   delay: number;
//   inView: boolean;
// }> = ({ icon, value, suffix, label, description, color, delay, inView }) => {
//   const [count, setCount] = useState(0);
//   const { isDark } = useTheme();
//   const [isHovered, setIsHovered] = useState(false);

//   useEffect(() => {
//     if (!inView) return;

//     let startTime: number;
//     let animationFrame: number;
//     const duration = 2000;

//     const animate = (timestamp: number) => {
//       if (!startTime) startTime = timestamp;
//       const progress = Math.min((timestamp - startTime) / duration, 1);
      
//       // Easing cubic-out
//       const eased = 1 - Math.pow(1 - progress, 3);
//       setCount(Math.floor(eased * value));

//       if (progress < 1) {
//         animationFrame = requestAnimationFrame(animate);
//       } else {
//         setCount(value);
//       }
//     };

//     animationFrame = requestAnimationFrame(animate);

//     return () => cancelAnimationFrame(animationFrame);
//   }, [inView, value]);

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 30 }}
//       animate={inView ? { opacity: 1, y: 0 } : {}}
//       transition={{ duration: 0.6, delay }}
//       onHoverStart={() => setIsHovered(true)}
//       onHoverEnd={() => setIsHovered(false)}
//       className="relative group"
//     >
//       <motion.div
//         animate={{
//           y: isHovered ? -5 : 0,
//           scale: isHovered ? 1.02 : 1,
//         }}
//         transition={{ type: 'spring', stiffness: 300, damping: 20 }}
//         className={`relative p-4 sm:p-5 md:p-8 rounded-xl sm:rounded-2xl overflow-hidden backdrop-blur-sm border transition-all duration-300 ${
//           isHovered
//             ? 'shadow-xl border-transparent'
//             : 'shadow-lg border-gray-200 dark:border-gray-700'
//         }`}
//         style={{
//           background: isHovered
//             ? `linear-gradient(135deg, ${color}20, ${color}05)`
//             : isDark ? 'rgba(17, 24, 39, 0.9)' : 'rgba(255, 255, 255, 0.95)',
//         }}
//       >
//         {/* Cercle animé en arrière-plan */}
//         <motion.div
//           className="absolute -right-5 sm:-right-10 -top-5 sm:-top-10 w-16 sm:w-32 h-16 sm:h-32 rounded-full opacity-30 sm:opacity-20"
//           style={{ background: `radial-gradient(circle, ${color}, transparent)` }}
//           animate={{
//             scale: [1, 1.2, 1],
//             opacity: [0.2, 0.4, 0.2],
//           }}
//           transition={{
//             duration: 3,
//             repeat: Infinity,
//             ease: 'easeInOut',
//           }}
//         />

//         {/* Icône avec animation - adaptée pour mobile */}
//         <motion.div
//           animate={{
//             rotate: isHovered ? 360 : 0,
//             scale: isHovered ? 1.1 : 1,
//           }}
//           transition={{ duration: 0.5 }}
//           className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl mb-3 sm:mb-4 md:mb-6 flex items-center justify-center mx-auto sm:mx-0"
//           style={{ background: `linear-gradient(135deg, ${color}, ${color}80)` }}
//         >
//           <i className={`${icon} text-xl sm:text-2xl md:text-3xl text-white`}></i>
//         </motion.div>

//         {/* Valeur - plus grande et plus visible sur mobile */}
//         <motion.div
//           className="text-3xl sm:text-4xl md:text-5xl font-bold font-display mb-1 sm:mb-2 text-center sm:text-left"
//           style={{
//             background: `linear-gradient(90deg, ${color}, #00e676)`,
//             WebkitBackgroundClip: 'text',
//             WebkitTextFillColor: 'transparent',
//             backgroundClip: 'text',
//           }}
//         >
//           {count}{suffix}
//         </motion.div>

//         {/* Label - adapté pour mobile */}
//         <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-1 text-center sm:text-left">
//           {label}
//         </div>

//         {/* Description - visible sur mobile avec taille adaptée */}
//         <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 text-center sm:text-left">
//           {description}
//         </div>

//         {/* Effet de brillance */}
//         {isHovered && (
//           <motion.div
//             className="absolute inset-0"
//             initial={{ background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)' }}
//             animate={{
//               scale: [1, 1.5, 1],
//               opacity: [0, 0.4, 0],
//             }}
//             transition={{
//               duration: 2,
//               repeat: Infinity,
//             }}
//           />
//         )}
//       </motion.div>
//     </motion.div>
//   );
// };

// export const StatsSection: React.FC = () => {
//   const { t } = useTranslation();
//   const { isDark } = useTheme();
//   const ref = React.useRef<HTMLDivElement>(null);
//   const inView = useInView(ref, { once: true, margin: '-100px' });

//   return (
//     <div ref={ref} className="relative py-12 sm:py-16 md:py-24 overflow-hidden">
//       {/* Arrière-plan animé */}
//       <div className="absolute inset-0">
//         <div className={`absolute inset-0 ${
//           isDark
//             ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
//             : 'bg-gradient-to-br from-gray-50 via-white to-gray-50'
//         }`} />

//         {/* Lignes animées */}
//         {[...Array(5)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute h-px"
//             style={{
//               top: `${20 + i * 15}%`,
//               left: 0,
//               right: 0,
//               background: `linear-gradient(90deg, transparent, ${
//                 isDark ? 'rgba(0,230,118,0.2)' : 'rgba(0,150,100,0.2)'
//               }, transparent)`,
//             }}
//             animate={{
//               x: ['-100%', '100%'],
//             }}
//             transition={{
//               duration: 8 + i * 2,
//               repeat: Infinity,
//               ease: 'linear',
//               delay: i * 1.5,
//             }}
//           />
//         ))}
//       </div>

//       <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
//         {/* En-tête avec carte témoignage - adapté pour mobile */}
//         <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center mb-8 sm:mb-12 lg:mb-16">
//           <motion.div
//             initial={{ opacity: 0, x: -30 }}
//             animate={inView ? { opacity: 1, x: 0 } : {}}
//             transition={{ duration: 0.6 }}
//             className="text-center lg:text-left"
//           >
//             <div className="flex items-center justify-center lg:justify-start gap-2 mb-3 sm:mb-4">
//               <span className="w-5 sm:w-7 h-0.5 rounded-full bg-green-500" />
//               <span className="text-[10px] sm:text-xs font-bold tracking-wider uppercase text-green-500">
//                 {t('stats.eyebrow', 'En chiffres')}
//               </span>
//             </div>
//             <h2 className="font-display font-extrabold text-[clamp(24px,5vw,50px)] leading-tight tracking-tight text-gray-900 dark:text-white mb-3 sm:mb-4">
//               Des résultats qui<br className="hidden sm:block" />
//               <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
//                 parlent d'eux-mêmes
//               </span>
//             </h2>
//             <p className="text-sm sm:text-base leading-relaxed text-gray-600 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0">
//               {t('stats.subtitle', "Chaque chiffre représente la confiance de nos clients et notre engagement à dépasser leurs attentes.")}
//             </p>
//           </motion.div>

//           {/* Carte témoignage - adaptée pour mobile */}
//           <motion.div
//             initial={{ opacity: 0, x: 30 }}
//             animate={inView ? { opacity: 1, x: 0 } : {}}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             className="relative group w-full max-w-md mx-auto lg:mx-0"
//           >
//             <div className={`p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl backdrop-blur-sm border transition-all duration-300 ${
//               isDark
//                 ? 'bg-gray-800/70 border-gray-700 hover:bg-gray-800/80'
//                 : 'bg-white/70 border-gray-200 hover:bg-white/80'
//             } hover:shadow-xl sm:hover:shadow-2xl`}>
//               <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
//                 <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center text-lg sm:text-xl md:text-2xl">
//                   🏆
//                 </div>
//                 <div>
//                   <div className="font-bold text-sm sm:text-base text-gray-900 dark:text-white">
//                     {t('stats.award', 'Meilleure agence digitale')}
//                   </div>
//                   <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
//                     {t('stats.awardLocation', 'Cameroun Tech Awards 2024')}
//                   </div>
//                 </div>
//               </div>

//               <div className="flex flex-wrap items-center gap-1 mb-2 sm:mb-3">
//                 <div className="flex gap-0.5 sm:gap-1">
//                   {[...Array(5)].map((_, i) => (
//                     <span key={i} className="text-yellow-400 text-sm sm:text-base">★</span>
//                   ))}
//                 </div>
//                 <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 ml-1 sm:ml-2">
//                   <strong className="text-gray-900 dark:text-white">4.9/5</strong> · 48 {t('stats.reviews', 'avis')}
//                 </span>
//               </div>

//               <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 italic mb-2">
//                 "{t('stats.testimonial', "DB Digital Agency a transformé notre vision en produit exceptionnel, livré avant le délai prévu.")}"
//               </p>

//               <div className="text-[10px] sm:text-xs font-bold text-green-500">
//                 — {t('stats.testimonialAuthor', 'CEO, StartupCM')}
//               </div>
//             </div>
//           </motion.div>
//         </div>

//         {/* Cartes de statistiques - grille responsive avec espacement adapté */}
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
//           {STATS.map((stat, index) => (
//             <StatCard
//               key={index}
//               icon={stat.icon}
//               value={stat.value}
//               suffix={stat.suffix}
//               label={t(`stats.items.${index}`, stat.label)}
//               description={stat.description}
//               color={stat.color}
//               delay={index * 0.1}
//               inView={inView}
//             />
//           ))}
//         </div>

//         {/* Badge clients - adapté pour mobile */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.6, delay: 0.8 }}
//           className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-10 md:mt-12"
//         >
//           <div className="flex -space-x-2 sm:-space-x-3">
//             {[
//               { initial: 'JD', color: '#3B82F6' },
//               { initial: 'MK', color: '#10B981' },
//               { initial: 'AL', color: '#8B5CF6' },
//               { initial: 'SP', color: '#F59E0B' },
//             ].map((item, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ scale: 0 }}
//                 animate={{ scale: 1 }}
//                 transition={{ delay: 0.9 + i * 0.1 }}
//                 className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold border-2 border-white dark:border-gray-800"
//                 style={{ background: `linear-gradient(135deg, ${item.color}, ${item.color}80)` }}
//               >
//                 {item.initial}
//               </motion.div>
//             ))}
//             <motion.div
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               transition={{ delay: 1.3 }}
//               className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 text-xs sm:text-sm font-bold border-2 border-white dark:border-gray-800"
//             >
//               +30
//             </motion.div>
//           </div>
//           <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 text-center">
//             <strong className="text-gray-900 dark:text-white">30+</strong> {t('stats.clients', 'clients nous font déjà confiance')}
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };