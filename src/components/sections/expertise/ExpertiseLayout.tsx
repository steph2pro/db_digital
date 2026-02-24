import React, { useRef } from 'react';
import { motion, useInView } from "motion/react";
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../contexts/ThemeContext';

interface ExpertiseLayoutProps {
  title: string;
  subtitle: string;
  image: string;
  children: React.ReactNode;
}

export const ExpertiseLayout: React.FC<ExpertiseLayoutProps> = ({
  title,
  subtitle,
  image,
  children
}) => {
  const { i18n } = useTranslation();
  const { isDark } = useTheme();
  const heroRef = useRef<HTMLDivElement>(null);
  const inView = useInView(heroRef, { once: true });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div ref={heroRef} className="relative h-[50vh] min-h-[400px] overflow-hidden">
        {/* Image de fond */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
          />
          <div className={`absolute inset-0 ${
            isDark ? 'bg-black/70' : 'bg-white/80'
          }`} />
          <div className={`absolute inset-0 bg-gradient-to-t ${
            isDark ? 'from-gray-900' : 'from-white'
          } to-transparent`} />
        </div>

        {/* Particules animées */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`hero-particle-${i}`}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: `linear-gradient(135deg, #00e676, #00a8e8)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.5, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}

        {/* Contenu du hero */}
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-green-500 to-blue-600 flex items-center justify-center"
            >
              <span className="text-3xl text-white">
                {title === 'technologies' && '⚡'}
                {title === 'methodology' && '🔄'}
                {title === 'quality' && '🛡️'}
              </span>
            </motion.div>

            <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl mb-4">
              <span className={isDark ? 'text-white' : 'text-gray-900'}>
                {title === 'technologies' && (i18n.language === 'fr' ? 'Nos Technologies' : 'Our Technologies')}
                {title === 'methodology' && (i18n.language === 'fr' ? 'Notre Méthodologie' : 'Our Methodology')}
                {title === 'quality' && (i18n.language === 'fr' ? 'Notre Engagement Qualité' : 'Our Quality Commitment')}
              </span>
            </h1>

            <p className={`text-lg max-w-2xl mx-auto ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {subtitle}
            </p>
          </motion.div>
        </div>

        {/* Indicateur de scroll */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className={`w-6 h-10 rounded-full border-2 flex items-start justify-center p-1 ${
            isDark ? 'border-gray-400' : 'border-gray-600'
          }`}>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className={`w-1.5 h-1.5 rounded-full ${
                isDark ? 'bg-green-400' : 'bg-green-500'
              }`}
            />
          </div>
        </motion.div>
      </div>

      {/* Contenu principal */}
      <div className="relative">
        {/* Éléments décoratifs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`bg-${i}`}
              className="absolute w-96 h-96 rounded-full opacity-10"
              style={{
                background: `radial-gradient(circle, ${isDark ? '#00e676' : '#00b894'}, transparent)`,
                left: `${i * 30}%`,
                top: `${i * 20}%`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 50, 0],
                y: [0, -30, 0],
              }}
              transition={{
                duration: 15 + i * 5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {children}
        </div>
      </div>
    </div>
  );
};