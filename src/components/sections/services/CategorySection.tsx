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
    <section ref={sectionRef} className="relative py-12 sm:py-16 first:pt-0 overflow-hidden">
      {/* Overlay de fond avec dégradé */}
      <div className="absolute inset-0 -z-10">
        {/* Image de fond (optionnelle - à remplacer par votre image) */}
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
        
        {/* Cercles décoratifs en arrière-plan */}
        <motion.div
          className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-10"
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
          className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full opacity-10"
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

      {/* Ligne décorative */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute left-4 right-4 sm:left-0 sm:right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${isDark ? '#00e67640' : '#00b89440'}, transparent)`,
        }}
      />

      <div className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* En-tête de catégorie */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center shadow-lg`}
            >
              <i className={`${category.icon} text-xl sm:text-2xl text-white`} />
            </motion.div>
            <h2 className={`text-xl sm:text-2xl lg:text-3xl font-bold font-display text-center ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {t(category.titleKey)}
            </h2>
          </div>

          <p className={`text-xs sm:text-sm max-w-2xl mx-auto px-2 ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {t(category.descriptionKey)}
          </p>

          {/* Indicateur de nombre de services */}
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block mt-3 sm:mt-4 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold"
            style={{
              background: `linear-gradient(135deg, ${isDark ? '#00e67620' : '#00b89420'}, transparent)`,
              borderColor: isDark ? '#00e67640' : '#00b89440',
              borderWidth: '1px',
            }}
          >
            {category.services.length} {t('services.available', 'services disponibles')}
          </motion.div>
        </motion.div>

        {/* Grille des services */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {category.services.map((service, idx) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={idx}
              inView={inView}
            />
          ))}
        </div>

        {/* Bouton "Voir plus" (optionnel) */}
        {category.services.length > 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center mt-8 sm:mt-10"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-bold text-sm sm:text-base transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, ${isDark ? '#00e676' : '#00b894'}, ${isDark ? '#00a8e8' : '#0088b8'})`,
                color: 'white',
                boxShadow: `0 4px 15px ${isDark ? '#00e67640' : '#00b89440'}`,
              }}
            >
              <span className="flex items-center gap-2">
                {t('common.seeAll', 'Voir tous les services')}
                <i className="bx bx-right-arrow-alt text-lg" />
              </span>
            </motion.button>
          </motion.div>
        )}

        {/* Éléments décoratifs */}
        <motion.div
          className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-10 pointer-events-none"
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
          className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full opacity-10 pointer-events-none"
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