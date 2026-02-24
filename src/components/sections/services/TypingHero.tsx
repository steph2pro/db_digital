import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from "motion/react";
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../contexts/ThemeContext';
import { typingPhrases } from '../../../data/servicesData';

interface TypingHeroProps {
  inView: boolean;
}

export const TypingHero: React.FC<TypingHeroProps> = ({ inView }) => {
  const { i18n } = useTranslation();
  const { isDark } = useTheme();
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [textHeight, setTextHeight] = useState(0);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const phrases = i18n.language === 'fr' ? typingPhrases.fr : typingPhrases.en;

  const typeNextCharacter = useCallback(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    
    if (!isDeleting) {
      if (displayText.length < currentPhrase.length) {
        setDisplayText(currentPhrase.slice(0, displayText.length + 1));
      } else {
        setIsWaiting(true);
        setTimeout(() => {
          setIsDeleting(true);
          setIsWaiting(false);
        }, 2000);
      }
    } else {
      if (displayText.length > 0) {
        setDisplayText(currentPhrase.slice(0, displayText.length - 1));
      } else {
        setIsDeleting(false);
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }
  }, [displayText, isDeleting, phrases, currentPhraseIndex]);

  useEffect(() => {
    if (!inView || isWaiting) return;

    const typingSpeed = isDeleting ? 50 : 100;
    const timeout = setTimeout(typeNextCharacter, typingSpeed);

    return () => clearTimeout(timeout);
  }, [inView, isWaiting, typeNextCharacter, isDeleting]);

  // Mesurer la hauteur du texte à chaque changement
  useEffect(() => {
    if (textContainerRef.current) {
      const height = textContainerRef.current.scrollHeight;
      setTextHeight(height);
    }
  }, [displayText]);

  // Ajuster le padding-bottom du conteneur principal
  useEffect(() => {
    if (heroRef.current && textHeight > 0) {
      // Calculer l'espace nécessaire pour la description
      const descriptionHeight = 80; // Hauteur approximative de la description
      const totalContentHeight = textHeight + descriptionHeight;
      const viewportHeight = window.innerHeight;
      
      // Si le contenu dépasse la hauteur de la viewport, on ajuste le padding
      if (totalContentHeight > viewportHeight * 0.6) {
        heroRef.current.style.paddingBottom = `${totalContentHeight - viewportHeight * 0.4}px`;
      } else {
        heroRef.current.style.paddingBottom = '2rem';
      }
    }
  }, [textHeight]);

  return (
    <div 
      ref={heroRef}
      className="relative w-full min-h-screen flex items-start justify-center overflow-visible"
    >
      {/* Image de fond en plein écran */}
      <div className="absolute inset-0 w-full h-full">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/images/services/web-development.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100%',
            height: '100%',
          }}
        />
        
        {/* Overlay sombre/clair pour améliorer la lisibilité */}
        <div 
          className={`absolute inset-0 transition-colors duration-300 ${
            isDark 
              ? 'bg-black/70' 
              : 'bg-white/80'
          }`}
        />
        
        {/* Overlay avec dégradé pour plus de profondeur */}
        <div 
          className={`absolute inset-0 bg-gradient-to-b ${
            isDark
              ? 'from-transparent via-black/50 to-black'
              : 'from-transparent via-white/50 to-white'
          }`}
        />
      </div>

      {/* Particules animées */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 rounded-full z-10"
          style={{
            background: `linear-gradient(135deg, #00e676, #00a8e8)`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            boxShadow: '0 0 10px rgba(0,230,118,0.5)',
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 0.8, 0],
            x: [0, (Math.random() - 0.5) * 100],
            y: [0, (Math.random() - 0.5) * 100],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Contenu principal */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 md:pt-24">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-4 sm:mb-6"
          >
            <span className={`inline-block px-3 sm:px-4 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider backdrop-blur-sm ${
              isDark 
                ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                : 'bg-green-500/10 text-green-700 border border-green-500/20'
            }`}>
              {i18n.language === 'fr' ? 'Nos Services' : 'Our Services'}
            </span>
          </motion.div>

          <div className="space-y-2 sm:space-y-4">
            <h1 className="font-display font-extrabold">
              <div className={`text-[clamp(24px,6vw,48px)] sm:text-[clamp(32px,8vw,64px)] ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {i18n.language === 'fr' ? 'Nous créons des' : 'We create'}
              </div>
              
              {/* Conteneur avec hauteur dynamique */}
              <div 
                ref={textContainerRef}
                className="relative transition-all duration-300 ease-in-out"
                style={{ 
                  minHeight: textHeight ? `${textHeight}px` : '1.2em',
                  height: 'auto'
                }}
              >
                <div className="flex items-center justify-center flex-wrap px-2">
                  <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent text-[clamp(28px,7vw,56px)] sm:text-[clamp(32px,8vw,64px)] whitespace-normal break-words max-w-full drop-shadow-lg">
                    {displayText}
                  </span>
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="w-[2px] sm:w-[3px] h-[0.8em] bg-green-500 ml-1 flex-shrink-0 shadow-lg"
                  />
                </div>
              </div>
            </h1>

            {/* Description avec transition de position */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                delay: 0.4,
                duration: 0.6,
                ease: "easeOut"
              }}
              className="w-full"
            >
              <motion.p
                animate={{ 
                  y: textHeight > 0 ? [20, 0] : 0,
                }}
                transition={{ duration: 0.3 }}
                className={`text-xs sm:text-sm md:text-base max-w-2xl mx-auto px-2 mt-4 sm:mt-6 font-medium transition-all duration-300 ${
                  isDark ? 'text-gray-200' : 'text-gray-700'
                }`}
              >
                {i18n.language === 'fr' 
                  ? "Des solutions digitales sur mesure qui propulsent votre entreprise vers de nouveaux sommets"
                  : "Tailored digital solutions that propel your business to new heights"}
              </motion.p>

              {/* Sous-titre ou CTA optionnel qui apparaît avec le texte */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: displayText.length > 0 ? 1 : 0 }}
                transition={{ delay: 0.2 }}
                className="mt-3"
              >
                <span className={`text-[10px] sm:text-xs ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {i18n.language === 'fr' 
                    ? 'Faites défiler pour découvrir nos services'
                    : 'Scroll down to discover our services'}
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Indicateur de défilement - toujours visible en bas */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className={`w-5 h-8 sm:w-6 sm:h-10 rounded-full border-2 backdrop-blur-sm flex items-start justify-center p-1 ${
            isDark 
              ? 'border-gray-400 bg-black/20' 
              : 'border-gray-600 bg-white/20'
          }`}>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${
                isDark ? 'bg-green-400' : 'bg-green-500'
              }`}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};