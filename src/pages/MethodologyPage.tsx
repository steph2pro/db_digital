import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from "motion/react";
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import { expertiseImages, methodologies } from '../data/expertiseData';
import { ExpertiseLayout } from '../components/sections/expertise/ExpertiseLayout';

export const MethodologyPage: React.FC = () => {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const [selectedMethod, setSelectedMethod] = useState(methodologies[0].id);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });

  const currentMethod = methodologies.find(m => m.id === selectedMethod)!;

  return (
    <ExpertiseLayout
      title="methodology"
      subtitle={t('expertise.methodology.subtitle', "Une approche structurée pour des résultats garantis")}
      image={expertiseImages.methodology}
    >
      <div ref={sectionRef} className="space-y-8 sm:space-y-12">
        {/* Sélecteur de méthodologie - Version mobile améliorée */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-2">
          {methodologies.map((method, index) => (
            <motion.button
              key={method.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelectedMethod(method.id)}
              className={`relative w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl overflow-hidden transition-all duration-300 ${
                selectedMethod === method.id
                  ? 'text-white shadow-lg'
                  : isDark
                    ? 'bg-gray-800/80 text-gray-300 hover:bg-gray-700'
                    : 'bg-gray-200/80 text-gray-600 hover:bg-gray-300'
              }`}
            >
              {selectedMethod === method.id && (
                <motion.div
                  layoutId="method-bg"
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(135deg, ${method.color}, ${method.color}80)`,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
              <span className="relative z-10 flex items-center justify-center gap-2 text-sm sm:text-base">
                <i className={`${method.icon} text-lg sm:text-xl`} />
                <span className="truncate">{t(method.titleKey)}</span>
              </span>
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedMethod}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
            className="relative"
          >
            {/* Image de fond - Hauteur adaptative mobile */}
            <div className="relative h-48 sm:h-56 md:h-64 rounded-xl sm:rounded-2xl overflow-hidden mb-6 sm:mb-8">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${currentMethod.image})` }}
              />
              <div className={`absolute inset-0 ${
                isDark ? 'bg-black/70' : 'bg-white/70'
              }`} />
              
              {/* Contenu overlay - Padding réduit sur mobile */}
              <div className="relative h-full flex items-center justify-center text-center p-4 sm:p-6 md:p-8">
                <div>
                  <motion.div
                    animate={{ 
                      rotate: [0, 8, -8, 0],
                      scale: [1, 1.08, 1]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-2 sm:mb-3 md:mb-4 rounded-lg sm:rounded-xl bg-gradient-to-r flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${currentMethod.color}, ${currentMethod.color}80)`,
                    }}
                  >
                    <i className={`${currentMethod.icon} text-2xl sm:text-3xl text-white`} />
                  </motion.div>
                  <h2 className={`text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2 px-2 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {t(currentMethod.titleKey)}
                  </h2>
                  <p className={`text-xs sm:text-sm max-w-xs mx-auto ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {t(currentMethod.descriptionKey)}
                  </p>
                </div>
              </div>
            </div>

            {/* Timeline des phases - Version mobile optimisée */}
            <h3 className={`text-lg sm:text-xl font-bold mb-4 sm:mb-6 px-2 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {t('expertise.methodology.phases', 'Notre processus')}
            </h3>

            <div className="relative mb-8 sm:mb-12">
              {/* Ligne de connexion - Adaptée mobile */}
              <div className="absolute left-4 sm:left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 to-blue-500" />

              <div className="space-y-4 sm:space-y-6">
                {currentMethod.phases.map((phase, index) => (
                  <motion.div
                    key={phase.nameKey}
                    initial={{ opacity: 0, x: -30 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: index * 0.1 }}
                    className="relative flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-8 pl-8 sm:pl-10 md:pl-12"
                  >
                    {/* Timeline dot - Taille réduite sur mobile */}
                    <div className="relative flex items-start sm:items-center">
                      <motion.div
                        animate={{ 
                          scale: [1, 1.15, 1],
                          boxShadow: [
                            `0 0 0 0 ${currentMethod.color}`,
                            `0 0 15px 3px ${currentMethod.color}`,
                            `0 0 0 0 ${currentMethod.color}`,
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                        className="absolute -left-8 sm:-left-10 md:-left-12 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, ${currentMethod.color}, ${currentMethod.color}80)`,
                        }}
                      >
                        <i className={`${phase.icon} text-lg sm:text-xl md:text-2xl text-white`} />
                      </motion.div>
                    </div>

                    {/* Contenu - Padding réduit sur mobile */}
                    <div className={`flex-1 p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl backdrop-blur-sm border ${
                      isDark
                        ? 'bg-gray-800/60 border-gray-700'
                        : 'bg-white/60 border-gray-200'
                    }`}>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <h4 className={`text-base sm:text-lg font-bold ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}>
                          {t(phase.nameKey)}
                        </h4>
                        <span className="self-start sm:self-auto px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold bg-green-500/10 text-green-500 border border-green-500/20">
                          {phase.duration}
                        </span>
                      </div>
                      <p className={`text-xs sm:text-sm ${
                        isDark ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {t(phase.descriptionKey)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Bénéfices - Grille adaptative mobile */}
            <div className="mt-8 sm:mt-12">
              <h3 className={`text-lg sm:text-xl font-bold mb-4 sm:mb-6 px-2 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {t('expertise.methodology.benefits', 'Les bénéfices pour vos projets')}
              </h3>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                {currentMethod.benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 3 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-3 sm:p-4 rounded-lg sm:rounded-xl flex items-center gap-2 sm:gap-3 border ${
                      isDark
                        ? 'bg-gray-800/40 border-gray-700'
                        : 'bg-white/40 border-gray-200'
                    }`}
                  >
                    <motion.div
                      animate={{ rotate: [0, 8, -8, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                      className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        background: `linear-gradient(135deg, ${currentMethod.color}, ${currentMethod.color}80)`,
                      }}
                    >
                      <i className="bx bx-check text-white text-sm sm:text-base" />
                    </motion.div>
                    <span className={`text-xs sm:text-sm ${
                      isDark ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {t(benefit)}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Call to action mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-8 text-center sm:hidden"
            >
              <button className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold rounded-xl shadow-lg">
                {t('expertise.methodology.cta', 'Démarrer un projet')}
              </button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </ExpertiseLayout>
  );
};