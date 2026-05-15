import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../contexts/ThemeContext';

export const BlogHero: React.FC = () => {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  const words = t('blog.hero.subtitle', 'Découvrez nos derniers articles, tutoriels et actualités tech').split(' ');

  return (
    <div ref={heroRef} className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <div className={`absolute inset-0 ${
          isDark
            ? 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900'
            : 'bg-gradient-to-b from-gray-50 via-white to-gray-50'
        }`} />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <span className="px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-green-500 to-blue-500 text-white">
            {t('blog.hero.badge', 'Blog & Actualités')}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}
        >
          {t('blog.hero.title', 'Blog & Actualités')}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={heroInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2"
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.05 }}
              className={`text-lg sm:text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};