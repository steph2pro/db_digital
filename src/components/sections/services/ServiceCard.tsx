import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from "motion/react";
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isGlowing, setIsGlowing] = useState(false);

  // Préchargement de l'image
  useEffect(() => {
    const img = new Image();
    img.src = service.image;
    img.onload = () => setImageLoaded(true);
    img.onerror = () => {
      setImageError(true);
      setImageLoaded(true);
    };
  }, [service.image]);

  // Animation de glow aléatoire
  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlowing(true);
      setTimeout(() => setIsGlowing(false), 1000);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleQuoteRequest = () => {
    // Stocker le service sélectionné pour le formulaire de contact
    sessionStorage.setItem('selectedService', service.id);
    sessionStorage.setItem('selectedServiceName', t(service.titleKey));
    navigate('/contact', { 
      state: { 
        service: service.id, 
        serviceName: t(service.titleKey),
        serviceType: service.id.includes('ecommerce') ? 'ecommerce' : 
                      service.id.includes('mobile') ? 'mobile' : 
                      service.id.includes('seo') ? 'seo' : 'web'
      } 
    });
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.6,
        ease: [0.21, 0.45, 0.27, 0.9]
      }
    })
  };

  // Déterminer le prix affiché
  const getPriceDisplay = () => {
    const priceKey = service.priceRange;
    if (priceKey === 'services.priceRange.from') {
      return t('services.priceRange.from', 'À partir de') + ' ' + t('services.priceRange.fromValue', '100 000 FCFA');
    } else if (priceKey === 'services.priceRange.custom') {
      return t('services.priceRange.customDisplay', 'Sur devis');
    } else if (priceKey === 'services.priceRange.monthly') {
      return t('services.priceRange.monthlyDisplay', 'Abonnement mensuel');
    } else if (priceKey === 'services.priceRange.project') {
      return t('services.priceRange.projectDisplay', 'Au projet');
    }
    return t(priceKey);
  };

  // Déterminer le délai affiché
  const getTimelineDisplay = () => {
    const timelineKey = service.timeline;
    if (timelineKey === 'services.timeline.weeks') {
      return t('services.timeline.weeksDisplay', '2-4 semaines');
    } else if (timelineKey === 'services.timeline.months') {
      return t('services.timeline.monthsDisplay', '1-3 mois');
    } else if (timelineKey === 'services.timeline.ongoing') {
      return t('services.timeline.ongoingDisplay', 'Continu');
    } else if (timelineKey === 'services.timeline.immediate') {
      return t('services.timeline.immediateDisplay', 'Immédiat');
    }
    return t(timelineKey);
  };

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group h-full"
    >
      {/* Effet de glow extérieur animé */}
      <motion.div
        className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 30% 20%, ${service.color}80, transparent 70%)`,
          filter: 'blur(20px)',
        }}
        animate={isHovered ? { scale: 1.02, opacity: 0.6 } : { scale: 1, opacity: 0 }}
        transition={{ duration: 0.4 }}
      />

      {/* Effet de glow pulsé aléatoire */}
      <motion.div
        className="absolute -inset-0.5 rounded-2xl pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${service.color}, transparent)`,
          filter: 'blur(12px)',
        }}
        animate={isGlowing ? { opacity: [0, 0.4, 0], scale: [1, 1.03, 1] } : { opacity: 0 }}
        transition={{ duration: 1 }}
      />

      <div className={`relative rounded-2xl overflow-hidden backdrop-blur-sm border transition-all duration-500 h-full flex flex-col ${
        isDark 
          ? 'bg-gray-900/70 border-gray-700/50' 
          : 'bg-white/70 border-gray-200/50'
      } ${isHovered ? 'shadow-2xl' : 'shadow-lg'}`}>
        
        {/* Image d'en-tête avec effet cinématique */}
        <div className="relative h-44 overflow-hidden flex-shrink-0">
          <motion.div
            animate={isHovered ? { scale: 1.12 } : { scale: 1 }}
            transition={{ duration: 0.7, ease: [0.21, 0.45, 0.27, 0.9] }}
            className="absolute inset-0"
          >
            {!imageError ? (
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${service.image})`,
                  opacity: imageLoaded ? 1 : 0,
                  transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              />
            ) : (
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient}`} />
            )}
            
            {/* Overlay dynamique avec la couleur du service */}
            <div 
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${service.color}80, ${isDark ? 'rgba(0,0,0,0.85)' : 'rgba(0,0,0,0.7)'})`,
              }}
            />
            
            {/* Overlay de brillance animé */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
              animate={{
                x: ['-100%', '200%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* Indicateur de chargement */}
          <AnimatePresence>
            {!imageLoaded && !imageError && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm z-20"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 border-2 border-white border-t-transparent rounded-full"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Contenu de l'en-tête */}
          <div className="relative h-full flex flex-col items-center justify-center text-white z-10 p-4">
            <motion.div
              animate={isHovered ? { 
                rotate: [0, -5, 5, -3, 3, 0],
                scale: [1, 1.1, 1.05, 1.1, 1],
                y: [0, -3, 0]
              } : {}}
              transition={{ duration: 0.4, type: "spring" }}
              className="relative"
            >
              {/* Cercle lumineux derrière l'icône */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `radial-gradient(circle, ${service.color}80, transparent)`,
                  filter: 'blur(10px)',
                }}
                animate={isHovered ? { scale: [1, 1.4, 1] } : { scale: 1 }}
                transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
              />
              <i className={`${service.icon} text-4xl mb-2 drop-shadow-2xl relative z-10`} />
            </motion.div>
            <h3 className="text-lg font-bold px-3 text-center drop-shadow-lg font-display">
              {t(service.titleKey)}
            </h3>
          </div>

          {/* Badge de prix */}
          <div className="absolute top-3 right-3 z-10">
            <motion.div
              animate={isHovered ? { 
                scale: [1, 1.05, 1],
              } : {}}
              transition={{ duration: 0.3 }}
              className={`px-2.5 py-1 rounded-full text-white text-[10px] font-bold border backdrop-blur-md ${
                isDark ? 'bg-black/50 border-white/30' : 'bg-black/40 border-white/40'
              }`}
            >
              {getPriceDisplay()}
            </motion.div>
          </div>

          {/* Badge "Populaire" pour certains services */}
          {(service.id === 'site-vitrine' || service.id === 'seo' || service.id === 'ui-ux') && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="absolute top-3 left-3 z-10"
            >
              <div className="px-2 py-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-white text-[10px] font-bold shadow-lg">
                🔥 {t('services.popular', 'Populaire')}
              </div>
            </motion.div>
          )}
        </div>

        {/* Détails du service */}
        <div className="p-4 flex-1 flex flex-col">
          <p className={`text-sm mb-3 leading-relaxed line-clamp-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {t(service.descriptionKey)}
          </p>

          {/* Tags technologies */}
          {service.technologies && service.technologies.length > 0 && (
            <motion.div 
              className="flex flex-wrap gap-1.5 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {service.technologies.slice(0, 4).map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.05, type: "spring" }}
                  whileHover={{ scale: 1.05, y: -1 }}
                  className={`px-2 py-0.5 text-[9px] font-medium rounded-full backdrop-blur-sm transition-all duration-300 ${
                    isDark
                      ? 'bg-gray-800/80 text-gray-300 border border-gray-700'
                      : 'bg-gray-100/80 text-gray-600 border border-gray-200'
                  }`}
                >
                  {tech}
                </motion.span>
              ))}
              {service.technologies.length > 4 && (
                <span className={`px-2 py-0.5 text-[9px] font-medium rounded-full ${
                  isDark ? 'bg-gray-800/50 text-gray-400' : 'bg-gray-100/50 text-gray-500'
                }`}>
                  +{service.technologies.length - 4}
                </span>
              )}
            </motion.div>
          )}

          {/* Boutons d'action */}
          <div className="flex gap-2 mt-auto">
            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                isExpanded
                  ? isDark
                    ? 'bg-gray-700 hover:bg-gray-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                  : isDark
                    ? 'bg-gray-800/80 hover:bg-gray-700 text-gray-300 border border-gray-700'
                    : 'bg-gray-100/80 hover:bg-gray-200 text-gray-700 border border-gray-200'
              }`}
            >
              <span className="flex items-center justify-center gap-1">
                {isExpanded ? (
                  <>
                    <i className="bx bx-chevron-up text-sm" />
                    {t('services.seeLess', 'Voir moins')}
                  </>
                ) : (
                  <>
                    <i className="bx bx-info-circle text-sm" />
                    {t('services.seeMore', 'Détails')}
                  </>
                )}
              </span>
            </motion.button>

            {/* Bouton Demander un devis */}
            <motion.button
              onClick={handleQuoteRequest}
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="px-3 py-2 rounded-xl text-xs font-bold transition-all duration-300 shadow-lg relative overflow-hidden group/btn"
              style={{
                background: `linear-gradient(135deg, ${service.color}, ${service.color}cc)`,
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 1.5,
                }}
              />
              <span className="flex items-center gap-1 text-white relative z-10 whitespace-nowrap">
                <i className="bx bx-file text-xs" />
                {t('navigation.get-quote', 'Devis')}
              </span>
            </motion.button>
          </div>

          {/* Détails étendus */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: [0.21, 0.45, 0.27, 0.9] }}
                className="overflow-hidden mt-3"
              >
                <div className={`pt-3 border-t ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
                  {/* Caractéristiques */}
                  <div className="mb-3">
                    <h4 className={`text-[10px] font-bold mb-2 flex items-center gap-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      <i className="bx bx-list-check text-green-500 text-xs" />
                      {t('services.features', 'Fonctionnalités')}
                    </h4>
                    <div className="grid grid-cols-1 gap-1">
                      {service.features.slice(0, 4).map((feature, i) => (
                        <motion.div
                          key={feature}
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.03 }}
                          className="flex items-start gap-1.5"
                        >
                          <i className="bx bx-check text-green-500 text-[10px] mt-0.5" />
                          <span className={`text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {t(feature)}
                          </span>
                        </motion.div>
                      ))}
                      {service.features.length > 4 && (
                        <span className={`text-[9px] ${isDark ? 'text-gray-500' : 'text-gray-400'} italic`}>
                          +{service.features.length - 4} autres
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bénéfices */}
                  <div className="mb-3">
                    <h4 className={`text-[10px] font-bold mb-2 flex items-center gap-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      <i className="bx bx-trending-up text-green-500 text-xs" />
                      {t('services.benefits', 'Bénéfices')}
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {service.benefits.map((benefit, i) => (
                        <motion.span
                          key={benefit}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.05 }}
                          className={`px-2 py-0.5 rounded-full text-[9px] font-medium ${
                            isDark
                              ? 'bg-gray-800/80 text-gray-300'
                              : 'bg-gray-100/80 text-gray-600'
                          }`}
                        >
                          {t(benefit)}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Timeline */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className={`flex items-center justify-between p-2 rounded-lg ${
                      isDark ? 'bg-gray-800/50' : 'bg-gray-50/80'
                    }`}
                  >
                    <span className={`text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {t('services.timelineDesc', 'Délai de livraison')}
                    </span>
                    <span className={`text-[11px] font-bold ${
                      isDark ? 'text-green-400' : 'text-green-600'
                    }`}>
                      {getTimelineDisplay()}
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Barre de progression animée au hover */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-0.5"
            style={{
              background: `linear-gradient(90deg, ${service.color}, #00e676, ${service.color})`,
            }}
            initial={{ scaleX: 0, originX: 0 }}
            animate={isHovered ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.4 }}
          />
        </div>

        {/* Coin décoratif */}
        <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-8 -right-8 w-16 h-16 rounded-full"
            style={{
              background: `radial-gradient(circle, ${service.color}30, transparent)`,
            }}
            animate={isHovered ? { scale: 1.3, opacity: 0.6 } : { scale: 1, opacity: 0.2 }}
          />
        </div>
      </div>
    </motion.div>
  );
};