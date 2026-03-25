import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from "motion/react";
import { useTheme } from '../../../contexts/ThemeContext';

const VALUES = [
  { 
    icon: 'bx bx-flash', 
    titleKey: 'vision.values.speed.title',
    descKey: 'vision.values.speed.desc',
    color: '#F59E0B',
    gradient: 'from-orange-500 to-yellow-500'
  },
  { 
    icon: 'bx bx-diamond', 
    titleKey: 'vision.values.excellence.title',
    descKey: 'vision.values.excellence.desc',
    color: '#3B82F6',
    gradient: 'from-blue-500 to-cyan-500'
  },
  { 
    icon: 'bx bx-handshake', 
    titleKey: 'vision.values.partnership.title',
    descKey: 'vision.values.partnership.desc',
    color: '#10B981',
    gradient: 'from-green-500 to-emerald-500'
  },
  { 
    icon: 'bx bx-trending-up', 
    titleKey: 'vision.values.roi.title',
    descKey: 'vision.values.roi.desc',
    color: '#8B5CF6',
    gradient: 'from-purple-500 to-pink-500'
  },
];

const ORBIT_ITEMS = [
  { icon: 'bx bx-code-alt', color: '#3B82F6', labelKey: 'vision.orbit.web' },
  { icon: 'bx bx-mobile-alt', color: '#10B981', labelKey: 'vision.orbit.mobile' },
  { icon: 'bx bx-server', color: '#8B5CF6', labelKey: 'vision.orbit.backend' },
  { icon: 'bx bx-palette', color: '#F59E0B', labelKey: 'vision.orbit.design' },
  { icon: 'bx bx-cloud', color: '#EC4899', labelKey: 'vision.orbit.cloud' },
  { icon: 'bx bx-brain', color: '#6366F1', labelKey: 'vision.orbit.ai' },
];

export const VisionSection: React.FC = () => {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  // Helper function pour obtenir les traductions
  const getTranslation = (key: string): string => {
    const translated = t(key);
    return typeof translated === 'string' ? translated : key;
  };

  return (
    <section ref={ref} className="relative py-16 sm:py-20 md:py-24 overflow-hidden">
      {/* Arrière-plan animé */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 ${
          isDark
            ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
            : 'bg-gradient-to-br from-gray-50 via-white to-gray-50'
        }`} />

        {/* Grille de points */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle, ${
              isDark ? 'rgba(0,230,118,0.1)' : 'rgba(0,150,100,0.1)'
            } 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Éléments décoratifs mobiles */}
        <div className="lg:hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`deco-${i}`}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: `${10 + i * 15}%`,
                top: `${20 + i * 10}%`,
                background: `linear-gradient(135deg, ${VALUES[i % VALUES.length].color}, transparent)`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3,
                delay: i * 0.4,
                repeat: Infinity,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
          {/* Orbite animée - Desktop uniquement */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-[400px] h-[400px] mx-auto">
              {/* Cercles concentriques */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 border-2 border-dashed border-green-500/30 rounded-full"
              />
              
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-8 border-2 border-dashed border-blue-500/30 rounded-full"
              />

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-16 border-2 border-dashed border-purple-500/30 rounded-full"
              />

              {/* Centre */}
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl shadow-2xl flex flex-col items-center justify-center"
              >
                <i className="bx bx-target-lock text-4xl text-white mb-2"></i>
                <span className="text-lg font-bold text-white">{getTranslation('vision.center')}</span>
              </motion.div>

              {/* Éléments en orbite */}
              {ORBIT_ITEMS.map((item, index) => {
                const angle = (index * 60) * (Math.PI / 180);
                const radius = 160;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                  <motion.div
                    key={index}
                    className="absolute"
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <motion.div
                      animate={{
                        y: [0, -5, 0],
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{
                        duration: 4,
                        delay: index * 0.2,
                        repeat: Infinity,
                      }}
                      className="relative group"
                    >
                      <div 
                        className="w-14 h-14 rounded-xl flex items-center justify-center shadow-xl backdrop-blur-sm"
                        style={{ 
                          background: `linear-gradient(135deg, ${item.color}, ${item.color}80)`,
                        }}
                      >
                        <i className={`${item.icon} text-2xl text-white`}></i>
                      </div>
                      
                      {/* Tooltip */}
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        whileHover={{ opacity: 1, y: 0, scale: 1 }}
                        className="absolute -top-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-gray-900 text-white text-xs px-2 py-1 rounded"
                      >
                        {getTranslation(item.labelKey)}
                      </motion.div>
                    </motion.div>
                  </motion.div>
                );
              })}

              {/* Particules flottantes */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute w-1 h-1 bg-green-500 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    x: [0, Math.random() * 20 - 10, 0],
                    y: [0, Math.random() * 20 - 10, 0],
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Contenu */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full"
          >
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-3 sm:mb-4">
              <span className="w-5 sm:w-7 h-0.5 rounded-full bg-green-500" />
              <span className="text-[10px] sm:text-xs font-bold tracking-wider uppercase text-green-500">
                {getTranslation('vision.eyebrow')}
              </span>
            </div>

            <h2 className="font-display font-extrabold text-[clamp(28px,5vw,50px)] leading-tight tracking-tight text-gray-900 dark:text-white mb-3 sm:mb-4 text-center lg:text-left">
              {getTranslation('vision.title.line1')}<br />
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                {getTranslation('vision.title.line2')}
              </span>
            </h2>

            <p className="text-sm sm:text-base leading-relaxed text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
              {getTranslation('vision.desc')}
            </p>

            <div className="grid gap-3 sm:gap-4">
              {VALUES.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="group relative"
                >
                  <motion.div
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-4 sm:p-5 rounded-xl backdrop-blur-sm border transition-all duration-300 ${
                      isDark
                        ? 'bg-gray-800/70 border-gray-700 hover:bg-gray-800/80'
                        : 'bg-white/70 border-gray-200 hover:bg-white/80'
                    } hover:shadow-lg sm:hover:shadow-xl`}
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <motion.div 
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${value.gradient} shadow-lg flex-shrink-0`}
                        animate={{
                          scale: [1, 1.05, 1],
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                          duration: 4,
                          delay: index * 0.2,
                          repeat: Infinity,
                        }}
                      >
                        <i className={`${value.icon} text-lg sm:text-xl text-white`}></i>
                      </motion.div>
                      
                      <div>
                        <h3 className="font-bold text-sm sm:text-base text-gray-900 dark:text-white mb-1">
                          {getTranslation(value.titleKey)}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                          {getTranslation(value.descKey)}
                        </p>
                      </div>
                    </div>

                    {/* Effet de bordure au hover */}
                    <motion.div
                      className="absolute inset-0 rounded-xl pointer-events-none"
                      style={{
                        background: `linear-gradient(90deg, ${value.color}, transparent)`,
                        opacity: 0,
                      }}
                      whileHover={{ opacity: 0.1 }}
                    />

                    {/* Ligne lumineuse au hover */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5"
                      style={{
                        background: `linear-gradient(90deg, ${value.color}, transparent)`,
                      }}
                      initial={{ scaleX: 0, originX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* CTA Mobile */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
              className="lg:hidden w-full mt-6 sm:mt-8 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              whileTap={{ scale: 0.95 }}
            >
              {getTranslation('vision.cta')}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};


// // src/components/sections/home/VisionSection.tsx
// import React from 'react';
// import { useTranslation } from 'react-i18next';
// import { motion, useInView } from "motion/react";
// import { useTheme } from '../../../contexts/ThemeContext';

// const VALUES = [
//   { 
//     icon: 'bx bx-flash', 
//     title: 'Rapidité d\'exécution', 
//     desc: 'Sprints agiles, deadlines respectées. Nous livrons vite sans sacrifier la qualité.',
//     color: '#F59E0B',
//     gradient: 'from-orange-500 to-yellow-500'
//   },
//   { 
//     icon: 'bx bx-diamond', 
//     title: 'Excellence technique', 
//     desc: 'Code propre, architecture solide, technologies modernes — nous ne faisons pas de compromis.',
//     color: '#3B82F6',
//     gradient: 'from-blue-500 to-cyan-500'
//   },
//   { 
//     icon: 'bx bx-handshake', 
//     title: 'Partenariat durable', 
//     desc: 'Nous ne sommes pas un prestataire, nous sommes votre partenaire tech de confiance.',
//     color: '#10B981',
//     gradient: 'from-green-500 to-emerald-500'
//   },
//   { 
//     icon: 'bx bx-trending-up', 
//     title: 'ROI mesurable', 
//     desc: 'Chaque décision technique est prise en regard de son impact sur vos revenus.',
//     color: '#8B5CF6',
//     gradient: 'from-purple-500 to-pink-500'
//   },
// ];

// const ORBIT_ITEMS = [
//   { icon: 'bx bx-code-alt', color: '#3B82F6', label: 'Web' },
//   { icon: 'bx bx-mobile-alt', color: '#10B981', label: 'Mobile' },
//   { icon: 'bx bx-server', color: '#8B5CF6', label: 'Backend' },
//   { icon: 'bx bx-palette', color: '#F59E0B', label: 'Design' },
//   { icon: 'bx bx-cloud', color: '#EC4899', label: 'Cloud' },
//   { icon: 'bx bx-brain', color: '#6366F1', label: 'AI' },
// ];

// export const VisionSection: React.FC = () => {
//   const { t } = useTranslation();
//   const { isDark } = useTheme();
//   const ref = React.useRef<HTMLDivElement>(null);
//   const inView = useInView(ref, { once: true, margin: '-100px' });

//   return (
//     <section ref={ref} className="relative py-16 sm:py-20 md:py-24 overflow-hidden">
//       {/* Arrière-plan animé */}
//       <div className="absolute inset-0">
//         <div className={`absolute inset-0 ${
//           isDark
//             ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
//             : 'bg-gradient-to-br from-gray-50 via-white to-gray-50'
//         }`} />

//         {/* Grille de points */}
//         <div 
//           className="absolute inset-0 opacity-20"
//           style={{
//             backgroundImage: `radial-gradient(circle, ${
//               isDark ? 'rgba(0,230,118,0.1)' : 'rgba(0,150,100,0.1)'
//             } 1px, transparent 1px)`,
//             backgroundSize: '40px 40px',
//           }}
//         />

//         {/* Éléments décoratifs mobiles */}
//         <div className="lg:hidden">
//           {[...Array(6)].map((_, i) => (
//             <motion.div
//               key={`deco-${i}`}
//               className="absolute w-2 h-2 rounded-full"
//               style={{
//                 left: `${10 + i * 15}%`,
//                 top: `${20 + i * 10}%`,
//                 background: `linear-gradient(135deg, ${VALUES[i % VALUES.length].color}, transparent)`,
//               }}
//               animate={{
//                 scale: [1, 1.5, 1],
//                 opacity: [0.3, 0.8, 0.3],
//               }}
//               transition={{
//                 duration: 3,
//                 delay: i * 0.4,
//                 repeat: Infinity,
//               }}
//             />
//           ))}
//         </div>
//       </div>

//       <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
       

//           {/* Orbite animée - Desktop uniquement */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={inView ? { opacity: 1, scale: 1 } : {}}
//             transition={{ duration: 0.8 }}
//             className="relative hidden lg:block"
//           >
//             <div className="relative w-[400px] h-[400px] mx-auto">
//               {/* Cercles concentriques */}
//               <motion.div
//                 animate={{ rotate: 360 }}
//                 transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
//                 className="absolute inset-0 border-2 border-dashed border-green-500/30 rounded-full"
//               />
              
//               <motion.div
//                 animate={{ rotate: -360 }}
//                 transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
//                 className="absolute inset-8 border-2 border-dashed border-blue-500/30 rounded-full"
//               />

//               <motion.div
//                 animate={{ rotate: 360 }}
//                 transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
//                 className="absolute inset-16 border-2 border-dashed border-purple-500/30 rounded-full"
//               />

//               {/* Centre */}
//               <motion.div
//                 animate={{ scale: [1, 1.1, 1] }}
//                 transition={{ duration: 3, repeat: Infinity }}
//                 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl shadow-2xl flex flex-col items-center justify-center"
//               >
//                 <i className="bx bx-target-lock text-4xl text-white mb-2"></i>
//                 <span className="text-lg font-bold text-white">Vision</span>
//               </motion.div>

//               {/* Éléments en orbite */}
//               {ORBIT_ITEMS.map((item, index) => {
//                 const angle = (index * 60) * (Math.PI / 180);
//                 const radius = 160;
//                 const x = Math.cos(angle) * radius;
//                 const y = Math.sin(angle) * radius;

//                 return (
//                   <motion.div
//                     key={index}
//                     className="absolute"
//                     style={{
//                       left: '50%',
//                       top: '50%',
//                       transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
//                     }}
//                     initial={{ scale: 0 }}
//                     animate={{ scale: 1 }}
//                     transition={{ delay: 0.5 + index * 0.1 }}
//                   >
//                     <motion.div
//                       animate={{
//                         y: [0, -5, 0],
//                         rotate: [0, 10, -10, 0],
//                       }}
//                       transition={{
//                         duration: 4,
//                         delay: index * 0.2,
//                         repeat: Infinity,
//                       }}
//                       className="relative group"
//                     >
//                       <div 
//                         className="w-14 h-14 rounded-xl flex items-center justify-center shadow-xl backdrop-blur-sm"
//                         style={{ 
//                           background: `linear-gradient(135deg, ${item.color}, ${item.color}80)`,
//                         }}
//                       >
//                         <i className={`${item.icon} text-2xl text-white`}></i>
//                       </div>
                      
//                       {/* Tooltip */}
//                       <motion.div
//                         initial={{ opacity: 0, y: 10, scale: 0.8 }}
//                         whileHover={{ opacity: 1, y: 0, scale: 1 }}
//                         className="absolute -top-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-gray-900 text-white text-xs px-2 py-1 rounded"
//                       >
//                         {item.label}
//                       </motion.div>
//                     </motion.div>
//                   </motion.div>
//                 );
//               })}

//               {/* Particules flottantes */}
//               {[...Array(8)].map((_, i) => (
//                 <motion.div
//                   key={`particle-${i}`}
//                   className="absolute w-1 h-1 bg-green-500 rounded-full"
//                   style={{
//                     left: `${Math.random() * 100}%`,
//                     top: `${Math.random() * 100}%`,
//                   }}
//                   animate={{
//                     x: [0, Math.random() * 20 - 10, 0],
//                     y: [0, Math.random() * 20 - 10, 0],
//                     scale: [1, 1.5, 1],
//                     opacity: [0.5, 1, 0.5],
//                   }}
//                   transition={{
//                     duration: 3 + Math.random() * 2,
//                     repeat: Infinity,
//                     delay: i * 0.3,
//                   }}
//                 />
//               ))}
//             </div>
//           </motion.div>

//           {/* Contenu */}
//           <motion.div
//             initial={{ opacity: 0, x: 30 }}
//             animate={inView ? { opacity: 1, x: 0 } : {}}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="w-full"
//           >
//             <div className="flex items-center justify-center lg:justify-start gap-2 mb-3 sm:mb-4">
//               <span className="w-5 sm:w-7 h-0.5 rounded-full bg-green-500" />
//               <span className="text-[10px] sm:text-xs font-bold tracking-wider uppercase text-green-500">
//                 {t('vision.eyebrow', 'Notre Vision')}
//               </span>
//             </div>

//             <h2 className="font-display font-extrabold text-[clamp(28px,5vw,50px)] leading-tight tracking-tight text-gray-900 dark:text-white mb-3 sm:mb-4 text-center lg:text-left">
//               Bâtir l'Afrique<br />
//               <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
//                 digitale de demain
//               </span>
//             </h2>

//             <p className="text-sm sm:text-base leading-relaxed text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
//               {t('vision.desc', "Nous croyons que chaque entreprise africaine mérite des outils numériques de classe mondiale. Notre mission : démocratiser l'excellence technologique.")}
//             </p>

//             <div className="grid gap-3 sm:gap-4">
//               {VALUES.map((value, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, x: 20 }}
//                   animate={inView ? { opacity: 1, x: 0 } : {}}
//                   transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
//                   className="group relative"
//                 >
//                   <motion.div
//                     whileHover={{ x: 5 }}
//                     whileTap={{ scale: 0.98 }}
//                     className={`p-4 sm:p-5 rounded-xl backdrop-blur-sm border transition-all duration-300 ${
//                       isDark
//                         ? 'bg-gray-800/70 border-gray-700 hover:bg-gray-800/80'
//                         : 'bg-white/70 border-gray-200 hover:bg-white/80'
//                     } hover:shadow-lg sm:hover:shadow-xl`}
//                   >
//                     <div className="flex items-start gap-3 sm:gap-4">
//                       <motion.div 
//                         className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${value.gradient} shadow-lg flex-shrink-0`}
//                         animate={{
//                           scale: [1, 1.05, 1],
//                           rotate: [0, 5, -5, 0],
//                         }}
//                         transition={{
//                           duration: 4,
//                           delay: index * 0.2,
//                           repeat: Infinity,
//                         }}
//                       >
//                         <i className={`${value.icon} text-lg sm:text-xl text-white`}></i>
//                       </motion.div>
                      
//                       <div>
//                         <h3 className="font-bold text-sm sm:text-base text-gray-900 dark:text-white mb-1">
//                           {value.title}
//                         </h3>
//                         <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
//                           {value.desc}
//                         </p>
//                       </div>
//                     </div>

//                     {/* Effet de bordure au hover */}
//                     <motion.div
//                       className="absolute inset-0 rounded-xl pointer-events-none"
//                       style={{
//                         background: `linear-gradient(90deg, ${value.color}, transparent)`,
//                         opacity: 0,
//                       }}
//                       whileHover={{ opacity: 0.1 }}
//                     />

//                     {/* Ligne lumineuse au hover */}
//                     <motion.div
//                       className="absolute bottom-0 left-0 right-0 h-0.5"
//                       style={{
//                         background: `linear-gradient(90deg, ${value.color}, transparent)`,
//                       }}
//                       initial={{ scaleX: 0, originX: 0 }}
//                       whileHover={{ scaleX: 1 }}
//                       transition={{ duration: 0.3 }}
//                     />
//                   </motion.div>
//                 </motion.div>
//               ))}
//             </div>

//             {/* CTA Mobile */}
//             <motion.button
//               initial={{ opacity: 0, y: 20 }}
//               animate={inView ? { opacity: 1, y: 0 } : {}}
//               transition={{ delay: 0.8 }}
//               className="lg:hidden w-full mt-6 sm:mt-8 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
//               whileTap={{ scale: 0.95 }}
//             >
//               Découvrir notre vision
//             </motion.button>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };