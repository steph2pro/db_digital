// src/components/sections/home/CTASection.tsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from "motion/react";
import { useTheme } from '../../../contexts/ThemeContext';

export const CTASection: React.FC = () => {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className="relative py-24 overflow-hidden">
      {/* Arrière-plan avec gradient animé */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
        
        {/* Particules */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-green-500 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0.1,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: [0.1, 0.5, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}

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

        {/* Cercles flous */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
          }}
          className="absolute top-20 left-20 w-64 h-64 bg-green-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            delay: 1,
          }}
          className="absolute bottom-20 right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          className="relative max-w-4xl mx-auto"
        >
          {/* Carte principale */}
          <div className="relative p-12 md:p-16 rounded-3xl overflow-hidden backdrop-blur-sm border border-green-500/20">
            {/* Effet de brillance */}
            <motion.div
              className="absolute inset-0"
              animate={{
                background: isHovered
                  ? 'radial-gradient(circle at 50% 50%, rgba(0,230,118,0.15) 0%, transparent 70%)'
                  : 'radial-gradient(circle at 50% 50%, rgba(0,230,118,0.05) 0%, transparent 70%)',
              }}
              transition={{ duration: 0.3 }}
            />

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full mb-8"
            >
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-green-500">
                {t('cta.badge', 'Réponse garantie sous 24h')}
              </span>
            </motion.div>

            {/* Titre */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl leading-tight text-white mb-6"
            >
              Prêt à transformer votre<br />
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                vision en réalité ?
              </span>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="text-lg text-gray-300 mb-10 max-w-2xl"
            >
              {t('cta.desc', "Rejoignez 30+ entreprises qui ont choisi DB Digital Agency. Discutons de votre projet.")}
            </motion.p>

            {/* Boutons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.a
                href="mailto:contact@db-digital.agency"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl text-white font-bold text-lg flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <i className="bx bx-envelope text-xl"></i>
                <span>{t('cta.email', 'Nous contacter')}</span>
              </motion.a>

              <motion.a
                href="https://wa.me/237697374910"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white font-bold text-lg flex items-center justify-center gap-2 hover:bg-white/20 transition-all duration-300"
              >
                <i className="bx bxl-whatsapp text-xl"></i>
                <span>{t('cta.whatsapp', 'WhatsApp')}</span>
              </motion.a>
            </motion.div>

            {/* Statistiques */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap justify-center gap-8 mt-12 pt-8 border-t border-white/10"
            >
              {[
                { value: '50+', label: 'Projets' },
                { value: '30+', label: 'Clients' },
                { value: '5+', label: 'Années' },
                { value: '24/7', label: 'Support' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="text-center"
                >
                  <div className="text-2xl font-bold text-green-400">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Éléments décoratifs */}
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute -top-20 -right-20 w-40 h-40 border border-green-500/20 rounded-full"
          />
          <motion.div
            animate={{
              rotate: -360,
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute -bottom-20 -left-20 w-40 h-40 border border-blue-500/20 rounded-full"
          />
        </motion.div>
      </div>
    </div>
  );
};