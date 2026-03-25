import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from "motion/react";
import { useTranslation } from 'react-i18next';
import { ServiceDetail } from '../../../data/servicesData';
import { useTheme } from '../../../contexts/ThemeContext';

interface ServiceCardProps {
  service: ServiceDetail;
  index: number;
  inView: boolean;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, index, inView }) => {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Préchargement de l'image
  useEffect(() => {
    const img = new Image();
    img.src = service.image;
    img.onload = () => setImageLoaded(true);
    img.onerror = () => {
      setImageError(true);
      setImageLoaded(true); // Considérer comme chargé même en erreur pour éviter le chargement infini
    };
  }, [service.image]);

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group"
    >
      {/* Effet de glow */}
      <motion.div
        className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${service.color}40, transparent)`,
          filter: 'blur(8px)',
        }}
        animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
      />

      <div className={`relative rounded-2xl overflow-hidden backdrop-blur-sm border transition-all duration-500 ${
        isDark 
          ? 'bg-gray-800/50 border-gray-700' 
          : 'bg-white/50 border-gray-200'
      } ${isHovered ? 'shadow-2xl' : 'shadow-lg'}`}>
        
        {/* Image d'en-tête avec overlay animé */}
        <div className="relative h-40 overflow-hidden">
          {/* Image de fond */}
          <motion.div
            animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            {/* Image avec fallback en cas d'erreur */}
            {!imageError ? (
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${service.image})`,
                  opacity: imageLoaded ? 1 : 0,
                  transition: 'opacity 0.3s ease-in-out',
                }}
              />
            ) : (
              // Fallback dégradé si l'image ne charge pas
              <div 
                className={`absolute inset-0 bg-gradient-to-br ${service.gradient}`}
              />
            )}
            
            {/* Overlay avec la couleur du service pour la teinte */}
            <div 
              className="absolute inset-0 mix-blend-overlay"
              style={{
                backgroundColor: service.color,
                opacity: 0.3
              }}
            />
            
            {/* Overlay de dégradé pour meilleure lisibilité du texte */}
            <div 
              className={`absolute inset-0 bg-gradient-to-t ${
                isDark 
                  ? 'from-black/80 via-black/40 to-transparent' 
                  : 'from-black/60 via-black/30 to-transparent'
              }`}
            />
            
            {/* Particules animées */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  boxShadow: '0 0 10px rgba(255,255,255,0.8)',
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 0.8, 0],
                  x: [0, (Math.random() - 0.5) * 50],
                  y: [0, (Math.random() - 0.5) * 50],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>

          {/* Indicateur de chargement */}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800/50 backdrop-blur-sm z-20">
              <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {/* Icône et titre */}
          <div className="relative h-full flex flex-col items-center justify-center text-white z-10">
            <motion.div
              animate={isHovered ? { 
                rotate: [0, -10, 10, -5, 5, 0],
                scale: [1, 1.2, 1.1, 1.2, 1]
              } : {}}
              transition={{ duration: 0.6 }}
            >
              <i className={`${service.icon} text-4xl mb-2 drop-shadow-lg`} />
            </motion.div>
            <h3 className="text-lg font-bold px-4 text-center drop-shadow-lg">
              {t(service.titleKey)}
            </h3>
          </div>

          {/* Badge de prix */}
          <motion.div
            animate={isHovered ? { 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            } : {}}
            transition={{ duration: 0.5 }}
            className="absolute top-2 right-2 z-10"
          >
            <div className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-bold border border-white/30">
              {t(service.priceRange)}
            </div>
          </motion.div>
        </div>

        {/* Détails du service */}
        <div className="p-4">
          <p className={`text-xs mb-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {t(service.descriptionKey)}
          </p>

          {/* Tags technologies */}
          {service.technologies && (
            <motion.div 
              className="flex flex-wrap gap-1 mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {service.technologies.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className={`px-2 py-0.5 text-[8px] font-medium rounded-full backdrop-blur-sm ${
                    isDark
                      ? 'bg-gray-700/80 text-gray-300 border border-gray-600'
                      : 'bg-gray-200/80 text-gray-600 border border-gray-300'
                  }`}
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          )}

          {/* Bouton pour voir plus */}
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-2 rounded-lg text-xs font-bold transition-all duration-300 ${
              isDark
                ? 'bg-gray-700 hover:bg-gray-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }`}
          >
            {isExpanded 
              ? t('services.seeLess', 'Voir moins')
              : t('services.seeMore', 'Voir plus de détails')}
          </motion.button>

          {/* Détails étendus */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className={`mt-3 pt-3 border-t ${
                  isDark ? 'border-gray-700' : 'border-gray-200'
                }`}>
                  {/* Caractéristiques */}
                  <div className="mb-3">
                    <h4 className={`text-xs font-bold mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                      {t('services.features', 'Fonctionnalités')}
                    </h4>
                    <ul className="space-y-1">
                      {service.features.map((feature, i) => (
                        <motion.li
                          key={feature}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="flex items-start gap-1 text-[10px]"
                        >
                          <i className="bx bx-check text-green-500 text-xs mt-0.5" />
                          <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                            {t(feature)}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Bénéfices */}
                  <div className="mb-3">
                    <h4 className={`text-xs font-bold mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                      {t('services.benefits', 'Bénéfices')}
                    </h4>
                    <div className="grid grid-cols-3 gap-1">
                      {service.benefits.map((benefit, i) => (
                        <motion.div
                          key={benefit}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                          whileHover={{ scale: 1.05 }}
                          className={`p-1 text-center rounded backdrop-blur-sm ${
                            isDark ? 'bg-gray-700/50' : 'bg-gray-100/50'
                          }`}
                        >
                          <div className={`text-[8px] font-medium ${
                            isDark ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                            {t(benefit)}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Timeline */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center justify-between text-[10px]"
                  >
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                      {t('services.timelineDesc', 'Délai')}:
                    </span>
                    <span className={`font-bold ${
                      isDark ? 'text-green-400' : 'text-green-600'
                    }`}>
                      {t(service.timeline)}
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Barre de progression animée */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-0.5"
            style={{
              background: `linear-gradient(90deg, ${service.color}, #00e676)`,
            }}
            initial={{ scaleX: 0, originX: 0 }}
            animate={isHovered ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </motion.div>
  );
};