import React, { useRef } from 'react';
import { motion, useInView } from "motion/react";
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import { expertiseImages, qualityCommitments } from '../data/expertiseData';
import { ExpertiseLayout } from '../components/sections/expertise/ExpertiseLayout';

export const QualityPage: React.FC = () => {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.1 });

  const quality = qualityCommitments[0];

  return (
    <ExpertiseLayout
      title="quality"
      subtitle={t('expertise.quality.subtitle', "Notre engagement pour l'excellence technique")}
      image={expertiseImages.quality}
    >
      <div ref={sectionRef} className="space-y-8 sm:space-y-12 px-4 sm:px-0">
        {/* Section principale */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative h-[300px] sm:h-80 rounded-xl sm:rounded-2xl overflow-hidden"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${quality.image})` }}
          />
          <div className={`absolute inset-0 ${
            isDark ? 'bg-black/70' : 'bg-white/70'
          }`} />
          
          <div className="relative h-full flex items-center justify-center p-4 sm:p-8">
            <div className="text-center max-w-2xl">
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center"
              >
                <i className={`${quality.icon} text-2xl sm:text-3xl text-white`} />
              </motion.div>
              <h2 className={`text-xl sm:text-2xl font-bold mb-2 sm:mb-4 px-2 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {t(quality.titleKey)}
              </h2>
              <p className={`text-sm sm:text-base px-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {t(quality.descriptionKey)}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Métriques */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
          {quality.metrics.map((metric, index) => (
            <motion.div
              key={metric.labelKey}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className={`p-3 sm:p-4 rounded-lg sm:rounded-xl text-center backdrop-blur-sm border ${
                isDark
                  ? 'bg-gray-800/50 border-gray-700'
                  : 'bg-white/50 border-gray-200'
              }`}
            >
              <motion.div
                animate={{ 
                  rotate: [0, 8, -8, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-1 sm:mb-2 rounded-lg flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${quality.color}, ${quality.color}80)`,
                }}
              >
                <i className={`${metric.icon} text-sm sm:text-lg text-white`} />
              </motion.div>
              <div className="text-base sm:text-xl font-bold text-green-500 mb-0.5 sm:mb-1">
                {metric.value}
              </div>
              <div className={`text-[10px] sm:text-xs ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {t(metric.labelKey)}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Standards de qualité */}
        <div>
          <h3 className={`text-lg sm:text-xl font-bold mb-4 sm:mb-6 px-2 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {t('expertise.quality.standards', 'Nos standards de qualité')}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {quality.standards.map((standard, index) => (
              <motion.div
                key={standard.nameKey}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.01, y: -3 }}
                className={`group relative p-4 sm:p-6 rounded-lg sm:rounded-xl backdrop-blur-sm border overflow-hidden ${
                  isDark
                    ? 'bg-gray-800/50 border-gray-700'
                    : 'bg-white/50 border-gray-200'
                }`}
              >
                {/* Effet de fond */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${quality.color}20, transparent)`,
                  }}
                />

                <div className="relative z-10">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <motion.div
                      animate={{ rotate: [0, 8, -8, 0] }}
                      transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        background: `linear-gradient(135deg, ${quality.color}, ${quality.color}80)`,
                      }}
                    >
                      <i className={`${standard.icon} text-base sm:text-xl text-white`} />
                    </motion.div>
                    <h4 className={`font-bold text-sm sm:text-base ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {t(standard.nameKey)}
                    </h4>
                  </div>

                  <p className={`text-xs sm:text-sm mb-2 sm:mb-3 ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {t(standard.descriptionKey)}
                  </p>

                  {standard.certification && (
                    <div className="flex items-center gap-1">
                      <i className="bx bx-certification text-green-500 text-xs" />
                      <span className={`text-[10px] sm:text-xs ${
                        isDark ? 'text-gray-500' : 'text-gray-400'
                      }`}>
                        {standard.certification}
                      </span>
                    </div>
                  )}
                </div>

                {/* Barre de progression au hover */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{
                    background: `linear-gradient(90deg, ${quality.color}, transparent)`,
                  }}
                  initial={{ scaleX: 0, originX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certification badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-6 sm:mt-8 px-2"
        >
          {['ISO 9001', 'ISO 27001', 'OWASP', 'WCAG 2.1'].map((cert) => (
            <motion.div
              key={cert}
              whileHover={{ scale: 1.05, rotate: 3 }}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg backdrop-blur-sm border ${
                isDark
                  ? 'bg-gray-800/50 border-gray-700'
                  : 'bg-white/50 border-gray-200'
              }`}
            >
              <span className={`text-xs sm:text-sm font-bold ${
                isDark ? 'text-green-400' : 'text-green-600'
              }`}>
                {cert}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Note de bas de page */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className={`text-center text-xs sm:text-sm italic ${
            isDark ? 'text-gray-500' : 'text-gray-400'
          }`}
        >
          {t('expertise.quality.note', '* Tous nos processus sont certifiés et régulièrement audités')}
        </motion.p>
      </div>
    </ExpertiseLayout>
  );
};