// import React, { useRef } from 'react';
// import { motion, useInView } from "motion/react";
// import { useTranslation } from 'react-i18next';
// import { ServiceCard } from './ServiceCard';
// import { ServiceCategory } from '../../../data/servicesData';
// import { useTheme } from '../../../contexts/ThemeContext';

// interface CategorySectionProps {
//   category: ServiceCategory;
//   index: number;
// }

// export const CategorySection: React.FC<CategorySectionProps> = ({ category, index }) => {
//   const { t } = useTranslation();
//   const { isDark } = useTheme();
//   const ref = useRef<HTMLDivElement>(null);
//   const inView = useInView(ref, { once: true, amount: 0.1 });

//   return (
//     <section ref={ref} aria-labelledby={`cat-${category.id}`}>

//       {/* En-tête de catégorie */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={inView ? { opacity: 1, y: 0 } : {}}
//         transition={{ duration: 0.5 }}
//         className="flex items-start gap-4 mb-6"
//       >
//         {/* Icône */}
//         <div className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-lg mt-0.5 ${
//           isDark ? 'bg-gray-800' : 'bg-white border border-stone-200'
//         }`}>
//           <i className={category.icon} aria-hidden="true" />
//         </div>

//         <div>
//           <h2
//             id={`cat-${category.id}`}
//             className={`text-lg sm:text-xl font-semibold tracking-tight leading-snug ${
//               isDark ? 'text-white' : 'text-gray-900'
//             }`}
//           >
//             {t(category.titleKey)}
//           </h2>
//           <p className={`mt-0.5 text-sm font-light leading-relaxed ${
//             isDark ? 'text-gray-400' : 'text-gray-500'
//           }`}>
//             {t(category.descriptionKey)}
//           </p>
//           <span className={`inline-block mt-2 text-xs font-medium px-2.5 py-0.5 rounded-full ${
//             isDark
//               ? 'bg-gray-800 text-gray-400'
//               : 'bg-stone-100 text-stone-500'
//           }`}>
//             {category.services.length} {t('services.available', 'services')}
//           </span>
//         </div>
//       </motion.div>

//       {/* Grille des services */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
//         {category.services.map((service, idx) => (
//           <motion.div
//             key={service.id}
//             initial={{ opacity: 0, y: 16 }}
//             animate={inView ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.4, delay: idx * 0.07 }}
//           >
//             <ServiceCard service={service} index={idx} inView={inView} />
//           </motion.div>
//         ))}
//       </div>

//       {/* Ligne séparatrice douce */}
//       <motion.div
//         initial={{ scaleX: 0 }}
//         animate={inView ? { scaleX: 1 } : {}}
//         transition={{ duration: 0.6, delay: 0.2 }}
//         className={`mt-12 h-px origin-left ${
//           isDark ? 'bg-gray-800' : 'bg-stone-100'
//         }`}
//       />

//     </section>
//   );
// };






import React, { useRef } from 'react';
import { motion, useInView } from "motion/react";
import { useTranslation } from 'react-i18next';
import { ServiceCard } from './ServiceCard';
import { ServiceCategory } from '../../../data/servicesData';
import { useTheme } from '../../../contexts/ThemeContext';

interface CategorySectionProps {
  category: ServiceCategory;
  index: number;
}

export const CategorySection: React.FC<CategorySectionProps> = ({ category }) => {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section ref={sectionRef} className="relative py-3 sm:py-6 first:pt-0 overflow-hidden">
      {/* Overlay de fond avec dégradé */}
      <div className="absolute inset-0 -z-10">
        {/* Image de fond */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80")',
          }}
        />
        
        {/* Overlay avec dégradé */}
        <div 
          className={`absolute inset-0 ${
            isDark 
              ? 'bg-gradient-to-b from-gray-900 via-gray-900/95 to-gray-900' 
              : 'bg-gradient-to-b from-gray-50 via-white/95 to-gray-50'
          }`}
        />
        
        {/* Cercles décoratifs en arrière-plan - encore réduits sur mobile */}
        <motion.div
          className="absolute -top-20 -right-20 w-32 h-32 sm:w-48 sm:h-48 rounded-full opacity-10 hidden sm:block"
          style={{
            background: `radial-gradient(circle, ${isDark ? '#00e676' : '#00b894'}, transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        
        <motion.div
          className="absolute -bottom-20 -left-20 w-32 h-32 sm:w-48 sm:h-48 rounded-full opacity-10 hidden sm:block"
          style={{
            background: `radial-gradient(circle, ${isDark ? '#00a8e8' : '#0088b8'}, transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        />
      </div>

      {/* Ligne décorative - plus fine sur mobile */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute left-2 right-2 sm:left-4 sm:right-4 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${isDark ? '#00e67640' : '#00b89440'}, transparent)`,
        }}
      />

      <div className="relative px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* En-tête de catégorie - marges ultra réduites sur mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-2 sm:mb-6"
        >
          <div className="flex flex-row items-center justify-center gap-1.5 sm:gap-3 mb-1 sm:mb-3">
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className={`w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center shadow-md sm:shadow-lg`}
            >
              <i className={`${category.icon} text-base sm:text-2xl text-white`} />
            </motion.div>
            <h2 className={`text-base sm:text-2xl lg:text-3xl font-bold font-display text-center ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {t(category.titleKey)}
            </h2>
          </div>

          <p className={`text-[11px] sm:text-sm max-w-2xl mx-auto px-1 sm:px-2 line-clamp-2 sm:line-clamp-none ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {t(category.descriptionKey)}
          </p>

          {/* Indicateur de nombre de services - plus compact */}
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block mt-1 sm:mt-3 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-xs font-bold"
            style={{
              background: `linear-gradient(135deg, ${isDark ? '#00e67620' : '#00b89420'}, transparent)`,
              borderColor: isDark ? '#00e67640' : '#00b89440',
              borderWidth: '1px',
            }}
          >
            {category.services.length} {t('services.available', 'services')}
          </motion.div>
        </motion.div>

        {/* Grille des services - gap réduit sur mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
          {category.services.map((service, idx) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={idx}
              inView={inView}
            />
          ))}
        </div>

        {/* Bouton "Voir plus" - margin réduit sur mobile */}
        {category.services.length > 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center mt-4 sm:mt-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 sm:px-8 py-1.5 sm:py-2.5 rounded-lg font-bold text-xs sm:text-base transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, ${isDark ? '#00e676' : '#00b894'}, ${isDark ? '#00a8e8' : '#0088b8'})`,
                color: 'white',
                boxShadow: `0 4px 15px ${isDark ? '#00e67640' : '#00b89440'}`,
              }}
            >
              <span className="flex items-center gap-1 sm:gap-2">
                {t('common.seeAll', 'Voir tous')}
                <i className="bx bx-right-arrow-alt text-sm sm:text-lg" />
              </span>
            </motion.button>
          </motion.div>
        )}

        {/* Éléments décoratifs - cachés sur mobile pour économiser l'espace */}
        <motion.div
          className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-10 pointer-events-none hidden sm:block"
          style={{
            background: `radial-gradient(circle, ${isDark ? '#00e676' : '#00b894'}, transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />

        <motion.div
          className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full opacity-10 pointer-events-none hidden sm:block"
          style={{
            background: `radial-gradient(circle, ${isDark ? '#00a8e8' : '#0088b8'}, transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        />
      </div>
    </section>
  );
};