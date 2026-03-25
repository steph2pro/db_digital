import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from "motion/react";
import { useTheme } from '../../../contexts/ThemeContext';

const STEPS = [
  { 
    num: '01', 
    icon: 'bx bx-chat',
    titleKey: 'process.steps.discovery.title',
    descKey: 'process.steps.discovery.desc',
    color: '#3B82F6',
    gradient: 'from-blue-500 to-cyan-500',
    detailsKeys: [
      'process.steps.discovery.details.analysis',
      'process.steps.discovery.details.market',
      'process.steps.discovery.details.goals',
      'process.steps.discovery.details.constraints'
    ],
    durationKey: 'process.steps.discovery.duration'
  },
  { 
    num: '02', 
    icon: 'bx bx-strategy',
    titleKey: 'process.steps.strategy.title',
    descKey: 'process.steps.strategy.desc',
    color: '#10B981',
    gradient: 'from-green-500 to-emerald-500',
    detailsKeys: [
      'process.steps.strategy.details.architecture',
      'process.steps.strategy.details.tech',
      'process.steps.strategy.details.planning',
      'process.steps.strategy.details.quote'
    ],
    durationKey: 'process.steps.strategy.duration'
  },
  { 
    num: '03', 
    icon: 'bx bx-palette',
    titleKey: 'process.steps.design.title',
    descKey: 'process.steps.design.desc',
    color: '#8B5CF6',
    gradient: 'from-purple-500 to-pink-500',
    detailsKeys: [
      'process.steps.design.details.wireframes',
      'process.steps.design.details.uiux',
      'process.steps.design.details.prototype',
      'process.steps.design.details.validation'
    ],
    durationKey: 'process.steps.design.duration'
  },
  { 
    num: '04', 
    icon: 'bx bx-code-alt',
    titleKey: 'process.steps.development.title',
    descKey: 'process.steps.development.desc',
    color: '#F59E0B',
    gradient: 'from-orange-500 to-yellow-500',
    detailsKeys: [
      'process.steps.development.details.sprints',
      'process.steps.development.details.tests',
      'process.steps.development.details.reviews',
      'process.steps.development.details.demos'
    ],
    durationKey: 'process.steps.development.duration'
  },
  { 
    num: '05', 
    icon: 'bx bx-rocket',
    titleKey: 'process.steps.launch.title',
    descKey: 'process.steps.launch.desc',
    color: '#EC4899',
    gradient: 'from-pink-500 to-rose-500',
    detailsKeys: [
      'process.steps.launch.details.deployment',
      'process.steps.launch.details.training',
      'process.steps.launch.details.documentation',
      'process.steps.launch.details.support'
    ],
    durationKey: 'process.steps.launch.duration'
  },
];

export const ProcessSection: React.FC = () => {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  // Helper function pour obtenir les traductions
  const getTranslation = (key: string): string => {
    const translated = t(key);
    return typeof translated === 'string' ? translated : key;
  };

  return (
    <div ref={ref} className="relative py-24 overflow-hidden">
      {/* Arrière-plan animé */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 ${
          isDark
            ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
            : 'bg-gradient-to-br from-gray-50 via-white to-gray-50'
        }`} />

        {/* Lignes diagonales */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px w-full"
            style={{
              top: `${i * 10}%`,
              background: `linear-gradient(90deg, transparent, ${
                isDark ? 'rgba(0,230,118,0.1)' : 'rgba(0,150,100,0.1)'
              }, transparent)`,
              transform: `rotate(${i * 3}deg)`,
              transformOrigin: 'center',
            }}
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 10 + i,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="flex items-center justify-center gap-2.5 mb-4">
            <span className="w-7 h-0.5 rounded-full bg-green-500" />
            <span className="text-xs font-bold tracking-wider uppercase text-green-500">
              {getTranslation('process.eyebrow')}
            </span>
          </div>
          <h2 className="font-display font-extrabold text-[clamp(28px,4vw,50px)] leading-tight tracking-tight text-gray-900 dark:text-white mb-4">
            {getTranslation('process.title.line1')}<br />
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              {getTranslation('process.title.line2')}
            </span>
          </h2>
        </motion.div>

        {/* Timeline horizontale */}
        <div className="relative">
          {/* Ligne de connexion */}
          <div className="absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 rounded-full" />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
            {STEPS.map((step, index) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                onHoverStart={() => setActiveStep(index)}
                onHoverEnd={() => setActiveStep(null)}
                className="relative group"
              >
                {/* Numéro avec animation */}
                <motion.div
                  animate={{
                    scale: activeStep === index ? 1.2 : 1,
                    rotate: activeStep === index ? 360 : 0,
                  }}
                  transition={{ duration: 0.5 }}
                  className={`w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center bg-gradient-to-br ${step.gradient} shadow-xl relative z-10`}
                >
                  <span className="text-xl font-bold text-white">{step.num}</span>
                </motion.div>

                {/* Icône */}
                <motion.div
                  animate={{
                    y: activeStep === index ? -5 : 0,
                  }}
                  className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-lg"
                >
                  <i className={`${step.icon} text-sm`} style={{ color: step.color }}></i>
                </motion.div>

                {/* Contenu */}
                <motion.div
                  animate={{
                    y: activeStep === index ? -5 : 0,
                  }}
                  className={`p-6 rounded-xl backdrop-blur-sm border transition-all duration-300 ${
                    isDark
                      ? 'bg-gray-800/50 border-gray-700'
                      : 'bg-white/50 border-gray-200'
                  } ${activeStep === index ? 'shadow-2xl scale-105' : 'shadow-lg'}`}
                >
                  <h3 className="text-lg font-bold font-display text-gray-900 dark:text-white mb-2">
                    {getTranslation(step.titleKey)}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    {getTranslation(step.descKey)}
                  </p>

                  {/* Détails supplémentaires (apparaissent au hover) */}
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                      opacity: activeStep === index ? 1 : 0,
                      height: activeStep === index ? 'auto' : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      {step.detailsKeys.map((detailKey, i) => (
                        <motion.div
                          key={detailKey}
                          initial={{ x: -10, opacity: 0 }}
                          animate={{
                            x: activeStep === index ? 0 : -10,
                            opacity: activeStep === index ? 1 : 0,
                          }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300 mb-2"
                        >
                          <i className="bx bx-check text-green-500"></i>
                          <span>{getTranslation(detailKey)}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Durée estimée */}
                  <div className="flex items-center gap-2 mt-4 text-xs text-gray-500 dark:text-gray-400">
                    <i className="bx bx-time"></i>
                    <span>{getTranslation(step.durationKey)}</span>
                  </div>
                </motion.div>

                {/* Effet de brillance */}
                {activeStep === index && (
                  <motion.div
                    className="absolute inset-0 rounded-xl"
                    initial={{ background: `radial-gradient(circle at 50% 50%, ${step.color}40 0%, transparent 70%)` }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Indicateur de progression */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex justify-center mt-12"
        >
          <div className={`inline-flex items-center gap-4 px-6 py-3 rounded-full backdrop-blur-sm border ${
            isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white/50 border-gray-200'
          }`}>
            <span className="text-sm text-gray-600 dark:text-gray-300">{getTranslation('process.averageDuration.label')}</span>
            <span className="text-lg font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              {getTranslation('process.averageDuration.value')}
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};