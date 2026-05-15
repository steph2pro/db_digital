import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faChevronRight, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

interface Office {
  city: string;
  phone: string;
  phoneSecondary?: string;
}

const WhatsAppFAB: React.FC = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [notificationCount, setNotificationCount] = useState(1);
  const [pulseLevel, setPulseLevel] = useState(1);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [activeTab, setActiveTab] = useState<'whatsapp' | 'email'>('whatsapp');

  // Nouveaux numéros pour l'agence digitale
  const offices: Office[] = [
    { 
      city: 'Yaoundé', 
      phone: '+237 6 91 32 32 49',
    },
    { 
      city: 'Douala', 
      phone: '+237 6 57 12 87 12',
    },
    { 
      city: 'Bafoussam', 
      phone: '+237 640819846',
      phoneSecondary: '+237 678393910'
    },
  ];

  // Email pour l'agence digitale
  const contactEmail = 'contact@dbdigitalagency.com';

  // Messages de bienvenue dynamiques avec traductions
  const welcomeMessages = [
    t('whatsapp.messages.help'),
    t('whatsapp.messages.project'),
    t('whatsapp.messages.quote'),
    t('whatsapp.messages.digital'),
    t('whatsapp.messages.question'),
    t('whatsapp.messages.partner')
  ];

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollPosition(currentScrollY);
      if (currentScrollY > lastScrollY && currentScrollY > 300) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % welcomeMessages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [welcomeMessages.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseLevel(prev => prev === 1 ? 1.2 : 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setNotificationCount(prev => prev === 0 ? 1 : 0);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const formatPhoneNumber = (phone: string): string => {
    return phone.replace(/\s/g, '').replace('+', '');
  };

  const getPhoneNumber = (city: string): string => {
    const office = offices.find(o => o.city === city);
    return office?.phone || offices[0]?.phone || '';
  };

  const handleCitySelect = (city: string) => {
    const phone = getPhoneNumber(city);
    const message = encodeURIComponent(t('whatsapp.defaultMessage') as string);
    const whatsappUrl = `https://wa.me/${formatPhoneNumber(phone)}?text=${message}`;
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
    
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleEmailContact = () => {
    const subject = encodeURIComponent(t('email.subject') as string || 'Demande de contact - DB Digital Agency');
    const body = encodeURIComponent(t('email.body') as string || 'Bonjour, je souhaiterais obtenir plus d\'informations sur vos services digitaux.');
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
    setIsOpen(false);
    
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleDefaultContact = () => {
    const mainOffice = offices[0];
    if (mainOffice) {
      handleCitySelect(mainOffice.city);
    }
  };

  const fabVariants: Variants = {
    initial: { scale: 0, opacity: 0, rotate: -180 },
    animate: { 
      scale: isVisible ? 1 : 0, 
      opacity: isVisible ? 1 : 0, 
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 0.5
      }
    },
    hover: {
      scale: 1.15,
      rotate: [0, -10, 10, -5, 5, 0],
      transition: {
        rotate: {
          duration: 0.5,
          ease: "easeInOut"
        }
      }
    },
    tap: { 
      scale: 0.9,
      rotate: 0,
      transition: { duration: 0.1 }
    }
  };

  const particleVariants: Variants = {
    initial: { opacity: 0, scale: 0, x: 0, y: 0 },
    animate: (i: number) => ({
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      x: [0, Math.cos(i * 45 * Math.PI / 180) * 50],
      y: [0, Math.sin(i * 45 * Math.PI / 180) * 50],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        delay: i * 0.1,
        ease: "easeOut"
      }
    })
  };

  const ringVariants: Variants = {
    initial: { scale: 1, opacity: 0.5 },
    animate: {
      scale: [1, 1.5, 2],
      opacity: [0.5, 0.3, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeOut"
      }
    }
  };

  const tooltipVariants: Variants = {
    initial: { opacity: 0, y: -10, scale: 0.9 },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 25
      }
    },
    exit: { 
      opacity: 0, 
      y: -10, 
      scale: 0.9,
      transition: { duration: 0.2 }
    }
  };

  const messageVariants: Variants = {
    initial: { opacity: 0, x: -20 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0, 
      x: 20,
      transition: { duration: 0.2 }
    }
  };

  const menuVariants: Variants = {
    initial: { opacity: 0, y: 20, scale: 0.9 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 20, scale: 0.9 }
  };

  const getYPosition = () => {
    const basePosition = 80;
    if (window.innerHeight + scrollPosition >= document.documentElement.scrollHeight - 100) {
      return basePosition + 50;
    }
    return basePosition;
  };

  return (
    <div 
      className="fixed z-50"
      style={{
        bottom: getYPosition(),
        right: 24,
      }}
    >
      {/* Cercles de pulsation */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(37,211,102,0.3) 0%, transparent 70%)',
            filter: 'blur(8px)',
          }}
          animate={{
            scale: pulseLevel,
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Anneaux de notification */}
      <AnimatePresence>
        {notificationCount > 0 && !isOpen && (
          <>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: 1 
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatDelay: 2
              }}
              className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white dark:border-gray-900 z-20"
            >
              {notificationCount}
            </motion.div>
            
            <motion.div
              variants={ringVariants}
              initial="initial"
              animate="animate"
              className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full"
            />
          </>
        )}
      </AnimatePresence>

      {/* Tooltip dynamique - positionné en haut du bouton */}
      <AnimatePresence>
        {showTooltip && !isOpen && (
          <motion.div
            variants={tooltipVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute bottom-full right-0 mb-3 w-80"
          >
            <div className="relative rounded-2xl shadow-2xl overflow-hidden backdrop-blur-lg bg-white/95 dark:bg-gray-800/95 border border-gray-200 dark:border-gray-700">
              {/* Flèche pointant vers le bas */}
              <div className="absolute -bottom-2 right-6 w-4 h-4 transform rotate-45 bg-white dark:bg-gray-800 border-r border-b border-gray-200 dark:border-gray-700" />
              
              <div className="p-4 bg-gradient-to-r from-green-500 to-green-600">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                      <FontAwesomeIcon icon={faWhatsapp} className="text-2xl text-white" />
                    </div>
                    <motion.div
                      className="absolute -top-1 -right-1 w-3 h-3 bg-green-300 rounded-full"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{t('whatsapp.title')}</h4>
                    <p className="text-xs text-white/80">{t('whatsapp.responseTime')}</p>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentMessage}
                    variants={messageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="flex items-center gap-2 text-sm mb-3"
                  >
                    <span className="text-2xl">{welcomeMessages[currentMessage].split(' ')[0]}</span>
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {welcomeMessages[currentMessage].slice(2)}
                    </span>
                  </motion.div>
                </AnimatePresence>

                <div className="flex gap-1 mb-4">
                  {welcomeMessages.map((_, i) => (
                    <motion.div
                      key={i}
                      className={`h-1 flex-1 rounded-full ${
                        i === currentMessage
                          ? 'bg-green-500'
                          : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                      animate={{
                        scale: i === currentMessage ? [1, 1.2, 1] : 1,
                      }}
                      transition={{
                        duration: 0.3,
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700/50">
                    <div className="text-xs text-gray-500 dark:text-gray-400">{t('whatsapp.avgTime')}</div>
                    <div className="font-bold text-green-500">2 min</div>
                  </div>
                  <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700/50">
                    <div className="text-xs text-gray-500 dark:text-gray-400">{t('whatsapp.satisfaction')}</div>
                    <div className="font-bold text-green-500">98%</div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    handleDefaultContact();
                    setShowTooltip(false);
                  }}
                  className="block w-full py-3 px-4 rounded-xl text-center font-bold transition-all duration-300 bg-green-500 hover:bg-green-600 text-white"
                >
                  <span className="flex items-center justify-center gap-2">
                    <FontAwesomeIcon icon={faWhatsapp} />
                    <span>{t('whatsapp.startChat')}</span>
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bouton principal */}
      <motion.button
        variants={fabVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        whileTap="tap"
        onHoverStart={() => {
          setIsHovered(true);
          if (!isOpen) setShowTooltip(true);
        }}
        onHoverEnd={() => {
          setIsHovered(false);
          setShowTooltip(false);
        }}
        onClick={() => {
          setIsClicked(true);
          setIsOpen(!isOpen);
          setShowTooltip(false);
          setTimeout(() => setIsClicked(false), 300);
        }}
        className="relative block"
      >
        {/* Effet de glow */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(37,211,102,0.6) 0%, transparent 70%)',
            filter: 'blur(12px)',
          }}
          animate={{
            scale: isHovered ? 1.3 : 1.1,
            opacity: isHovered ? 0.8 : 0.4,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Conteneur du bouton */}
        <motion.div
          animate={{
            boxShadow: isHovered 
              ? '0 20px 40px rgba(37,211,102,0.6), 0 0 0 2px rgba(255,255,255,0.8)' 
              : '0 10px 30px rgba(37,211,102,0.4)',
          }}
          className="relative w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-2xl overflow-hidden bg-gradient-to-br from-green-500 to-green-600"
        >
          {/* Vagues d'impact au clic */}
          <AnimatePresence>
            {isClicked && (
              <>
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={`wave-${i}`}
                    className="absolute inset-0 rounded-full border-2 border-white"
                    initial={{ scale: 1, opacity: 0.8 }}
                    animate={{ 
                      scale: 1.5 + i * 0.3, 
                      opacity: 0,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ 
                      duration: 0.6,
                      delay: i * 0.1,
                      ease: "easeOut"
                    }}
                  />
                ))}
              </>
            )}
          </AnimatePresence>

          {/* Particules autour du bouton */}
          {isHovered && !isOpen && (
            <>
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute w-2 h-2 bg-green-400 rounded-full"
                  variants={particleVariants}
                  initial="initial"
                  animate="animate"
                  custom={i}
                  style={{
                    left: '50%',
                    top: '50%',
                  }}
                />
              ))}
            </>
          )}

          {/* Icône WhatsApp */}
          <motion.div
            animate={{
              rotate: isHovered ? [0, -5, 5, -5, 5, 0] : 0,
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            <FontAwesomeIcon icon={faWhatsapp} className="w-7 h-7 text-white" />
          </motion.div>

          {/* Effet de brillance */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>
      </motion.button>

      {/* Menu de sélection d'agence avec onglets WhatsApp/Email */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute bottom-16 right-0 mb-2 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-green-500 to-green-600">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-white">{t('whatsapp.chooseContact') || 'Nous contacter'}</h3>
                  <p className="text-xs text-white/80 mt-1">{t('whatsapp.selectMethod') || 'Choisissez votre méthode de contact'}</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <FontAwesomeIcon icon={faXmark} className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Onglets WhatsApp / Email */}
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setActiveTab('whatsapp')}
                className={`flex-1 py-3 text-center font-medium transition-all duration-300 ${
                  activeTab === 'whatsapp'
                    ? 'text-green-500 border-b-2 border-green-500'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <FontAwesomeIcon icon={faWhatsapp} className="mr-2" />
                WhatsApp
              </button>
              <button
                onClick={() => setActiveTab('email')}
                className={`flex-1 py-3 text-center font-medium transition-all duration-300 ${
                  activeTab === 'email'
                    ? 'text-green-500 border-b-2 border-green-500'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                Email
              </button>
            </div>

            {/* Contenu WhatsApp */}
            {activeTab === 'whatsapp' && (
              <div className="max-h-80 overflow-y-auto">
                {offices.map((office, index) => (
                  <div key={index}>
                    <button
                      onClick={() => handleCitySelect(office.city)}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-3 border-b border-gray-100 dark:border-gray-700"
                    >
                      <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <FontAwesomeIcon icon={faWhatsapp} className="text-green-500" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800 dark:text-white">{office.city}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">📞 {office.phone}</p>
                        {office.phoneSecondary && (
                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">📞 {office.phoneSecondary}</p>
                        )}
                      </div>
                      <FontAwesomeIcon icon={faChevronRight} className="text-gray-400 text-xs" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Contenu Email */}
            {activeTab === 'email' && (
              <div className="p-4">
                <button
                  onClick={handleEmailContact}
                  className="w-full py-4 px-4 rounded-xl text-center font-bold transition-all duration-300 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg"
                >
                  <span className="flex items-center justify-center gap-2">
                    <FontAwesomeIcon icon={faEnvelope} />
                    <span>Envoyer un email</span>
                  </span>
                </button>
                
                <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">📧 Email professionnel :</p>
                  <p className="text-sm font-mono text-gray-800 dark:text-gray-200 font-medium">{contactEmail}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                    Réponse sous 24h ouvrées
                  </p>
                </div>

                <div className="mt-3 flex justify-center gap-2">
                  <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Support technique</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Devis commercial</span>
                  </div>
                </div>
              </div>
            )}
            
            <div className="p-3 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleDefaultContact}
                className="w-full text-center text-sm text-green-600 dark:text-green-400 hover:text-green-700 font-medium"
              >
                {t('whatsapp.contactMainAgency') || 'Contacter l\'agence principale'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Indicateur de proximité */}
      <div className="absolute bottom-0 right-20 mb-3 hidden md:block">
        <div className="bg-white dark:bg-gray-800 rounded-full px-3 py-1 text-xs shadow-md border border-gray-200 dark:border-gray-700">
          <span className="text-gray-500 dark:text-gray-400">📍 {t('whatsapp.nearYou') || 'Disponible 24/7'}</span>
        </div>
      </div>

      {/* Notification de succès */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 right-6 z-50 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
          >
            <FontAwesomeIcon icon={activeTab === 'whatsapp' ? faWhatsapp : faEnvelope} className="w-4 h-4" />
            <span className="text-sm">
              {activeTab === 'whatsapp' 
                ? t('whatsapp.openingWhatsApp') || 'Ouverture de WhatsApp...'
                : t('email.openingEmail') || 'Ouverture de votre client email...'}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WhatsAppFAB;