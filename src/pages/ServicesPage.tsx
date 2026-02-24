import React, { useRef } from 'react';
import { motion, useInView } from "motion/react";
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import { serviceCategories } from '../data/servicesData';
import { TypingHero } from '../components/sections/services/TypingHero';
import { CategorySection } from '../components/sections/services/CategorySection';

export const ServicesPage: React.FC = () => {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <div className="min-h-screen">
      {/* Hero Section avec animation de typing */}
      <div ref={heroRef} className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Arrière-plan animé */}
        <div className="absolute inset-0">
          <div className={`absolute inset-0 ${
            isDark
              ? 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900'
              : 'bg-gradient-to-b from-gray-50 via-white to-gray-50'
          }`} />

          {/* Vagues animées */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`wave-${i}`}
              className="absolute inset-0"
              style={{
                background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='${isDark ? '%2300e676' : '%2300b894'}' fill-opacity='0.05' d='M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,170.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E")`,
                backgroundSize: '1440px 320px',
                backgroundPosition: 'bottom',
                backgroundRepeat: 'repeat-x',
                bottom: 0,
              }}
              animate={{
                x: ['-100%', '0%'],
              }}
              transition={{
                duration: 20 + i * 5,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          ))}
        </div>

        <TypingHero inView={heroInView} />
      </div>

      {/* Sections des catégories de services */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {serviceCategories.map((category, index) => (
          <CategorySection
            key={category.id}
            category={category}
            index={index}
          />
        ))}
      </div>

      {/* Section CTA */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative mt-16 py-20 overflow-hidden"
      >
        <div className="absolute inset-0">
          <div className={`absolute inset-0 ${
            isDark
              ? 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900'
              : 'bg-gradient-to-r from-gray-50 via-white to-gray-50'
          }`} />
          
          {/* Particules animées */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={`cta-particle-${i}`}
              className="absolute w-1 h-1 rounded-full"
              style={{
                background: i % 2 === 0 ? '#00e676' : '#00a8e8',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, (Math.random() - 0.5) * 30, 0],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </div>

        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            {t('services.cta.title', 'Prêt à lancer votre projet ?')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`text-sm sm:text-base mb-8 max-w-2xl mx-auto ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            {t('services.cta.description', 'Contactez-nous pour discuter de vos besoins et obtenir un devis personnalisé')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <a
              href="/contact"
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {t('services.cta.button', 'Demander un devis')}
            </a>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};