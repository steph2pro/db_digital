// src/components/common/Footer.tsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useAnimation, useInView, Variants } from 'motion/react';
import { useTheme } from '../../contexts/ThemeContext';

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);
  const [currentYear] = useState(new Date().getFullYear());

  const controls = useAnimation();
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  // Animation d'entrée
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 3000);
      setEmail('');
    }
  };

  const services = [
    { id: 'web', icon: 'bx bx-code-alt', path: '/services/web' },
    { id: 'hosting', icon: 'bx bx-server', path: '/services/hosting' },
    { id: 'product', icon: 'bx bx-briefcase', path: '/services/product' },
    { id: 'marketing', icon: 'bx bx-line-chart', path: '/services/marketing' },
    { id: 'design', icon: 'bx bx-palette', path: '/services/design' },
    { id: 'legal', icon: 'bx bx-gavel', path: '/services/legal' },
  ];

  interface City {
    id: string;
    flag: string;
    addressKey: string;
    phone1: string;
    phone2: string;
  }

  interface Location {
    continent: string;
    flag?: string;
    active?: boolean;
    cities?: City[];
  }

  const locations: Location[] = [
    {
      continent: 'africa',
      cities: [
        { id: 'yaounde', flag: '🇨🇲', addressKey: 'footer.locations.yaounde.address', phone1: '640 46 51 82', phone2: '652 79 91 81' },
        { id: 'douala', flag: '🇨🇲', addressKey: 'footer.locations.douala.address', phone1: '657 128 712', phone2: '673 071 017' },
        { id: 'bafoussam', flag: '🇨🇲', addressKey: 'footer.locations.bafoussam.address', phone1: '640 101 974', phone2: '681 748 229' },
      ]
    },
    { continent: 'europe', flag: '🇪🇺', active: true },
    { continent: 'asia', flag: '🌏', active: true },
    { continent: 'america', flag: '🌎', active: true },
    { continent: 'oceania', flag: '🌏', active: true },
  ];

  const socialLinks = [
    { icon: 'bx bxl-linkedin', name: 'LinkedIn', url: 'https://linkedin.com/company/db-digital-agency', color: 'hover:text-blue-600' },
    { icon: 'bx bxl-github', name: 'GitHub', url: 'https://github.com/dbdigitalagency', color: 'hover:text-gray-700 dark:hover:text-white' },
    { icon: 'bx bxl-twitter', name: 'Twitter', url: 'https://twitter.com/dbdigitalagency', color: 'hover:text-blue-400' },
    { icon: 'bx bxl-facebook', name: 'Facebook', url: 'https://facebook.com/dbdigitalagency', color: 'hover:text-blue-600' },
    { icon: 'bx bxl-instagram', name: 'Instagram', url: 'https://instagram.com/dbdigitalagency', color: 'hover:text-pink-600' },
    { icon: 'bx bxl-youtube', name: 'YouTube', url: 'https://youtube.com/@dbdigitalagency', color: 'hover:text-red-600' },
    { icon: 'bx bxl-tiktok', name: 'TikTok', url: 'https://tiktok.com/@dbdigitalagency', color: 'hover:text-black dark:hover:text-white' },
  ];

  // Récupérer les villes d'Afrique
  const africanCities = locations.find(loc => loc.continent === 'africa')?.cities || [];

  return (
    <motion.footer
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden"
    >
      {/* Éléments d'arrière-plan animés */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grille de points */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle, #00e676 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
          }} />
        </div>

        {/* Lignes lumineuses animées */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent"
            style={{ top: `${20 + i * 15}%`, left: 0, right: 0 }}
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
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
          className="absolute -top-20 -right-20 w-64 h-64 bg-green-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            delay: 2,
          }}
          className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container relative z-10 mx-auto px-6 py-16">
        {/* Top Section avec Newsletter */}
        <motion.div variants={itemVariants} className="grid lg:grid-cols-2 gap-12 mb-16 pb-12 border-b border-white/10">
          {/* Brand et Newsletter */}
          <div>
            <motion.div 
              variants={itemVariants}
              className="flex items-center gap-4 mb-6"
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl"
              >
                <span className="text-2xl font-bold text-white">DB</span>
              </motion.div>
              <div>
                <h2 className="text-2xl font-bold font-display bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                  {t('footer.brand.title')}
                </h2>
                <p className="text-sm text-gray-400">{t('footer.brand.slogan')}</p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-green-400 mb-3 flex items-center gap-2">
                <i className="bx bx-envelope"></i>
                {t('footer.newsletter.title')}
              </h3>
              <p className="text-gray-300 text-sm mb-4">
                {t('footer.newsletter.description')}
              </p>
              
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('footer.newsletter.placeholder')}
                    className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors"
                    required
                  />
                  <motion.div
                    className="absolute inset-0 rounded-xl"
                    animate={{
                      boxShadow: email ? ['0 0 0px rgba(0,230,118,0)', '0 0 10px rgba(0,230,118,0.3)', '0 0 0px rgba(0,230,118,0)'] : 'none',
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl text-white font-bold flex items-center justify-center gap-2 hover:shadow-xl transition-all duration-300"
                >
                  <span>{t('footer.newsletter.subscribe')}</span>
                  <i className="bx bx-send"></i>
                </motion.button>
              </form>

              <AnimatePresence>
                {isSubscribed && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-3 p-2 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 text-sm flex items-center gap-2"
                  >
                    <i className="bx bx-check-circle"></i>
                    {t('footer.newsletter.success')}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Présence mondiale */}
            <motion.div variants={itemVariants}>
              <h3 className="text-sm font-bold uppercase tracking-wider text-green-400 mb-3">
                {t('footer.globalPresence.title')}
              </h3>
              <div className="flex flex-wrap gap-3">
                {locations.map((loc) => (
                  <motion.div
                    key={loc.continent}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className={`px-3 py-1.5 rounded-full text-sm flex items-center gap-1 ${
                      loc.active || loc.cities 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                        : 'bg-white/5 text-gray-500 border border-white/10'
                    }`}
                  >
                    <span>{loc.flag || '🌍'}</span>
                    <span>{t(`footer.globalPresence.${loc.continent}`)}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Nos Services */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-bold font-display mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-green-500 rounded-full"></span>
              {t('footer.services.title')}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                  className="group"
                >
                  <Link
                    to={service.path}
                    className="flex items-center gap-3 text-gray-400 hover:text-green-400 transition-colors"
                  >
                    <i className={`${service.icon} text-lg group-hover:scale-110 transition-transform`}></i>
                    <span className="text-sm">{t(`footer.services.${service.id}`)}</span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Legal Links */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="flex flex-wrap gap-6">
                <Link to="/privacy" className="text-sm text-gray-400 hover:text-green-400 transition-colors flex items-center gap-1">
                  <i className="bx bx-lock-alt"></i>
                  {t('footer.legal.privacy')}
                </Link>
                <Link to="/terms" className="text-sm text-gray-400 hover:text-green-400 transition-colors flex items-center gap-1">
                  <i className="bx bx-file"></i>
                  {t('footer.legal.terms')}
                </Link>
                <Link to="/contact" className="text-sm text-gray-400 hover:text-green-400 transition-colors flex items-center gap-1">
                  <i className="bx bx-envelope"></i>
                  {t('footer.legal.contact')}
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Middle Section - Locations */}
        <motion.div variants={itemVariants} className="mb-16">
          <h3 className="text-lg font-bold font-display mb-8 text-center">{t('footer.locations.title')}</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {africanCities.map((city) => (
              <motion.div
                key={city.id}
                onHoverStart={() => setHoveredLocation(city.id)}
                onHoverEnd={() => setHoveredLocation(null)}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="relative p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-green-500/30 transition-all duration-300"
              >
                {/* Badge */}
                <div className="absolute -top-3 left-4 px-3 py-1 bg-green-500 text-black text-xs font-bold rounded-full">
                  {city.flag} {t(`footer.locations.${city.id}.name`)}
                </div>

                {/* Adresse */}
                <div className="mt-4">
                  <div className="flex items-start gap-3 mb-3">
                    <i className="bx bx-map text-green-400 mt-1"></i>
                    <span className="text-sm text-gray-300">{t(city.addressKey)}</span>
                  </div>
                  
                  {/* Téléphones */}
                  <div className="space-y-2">
                    <motion.a
                      href={`tel:+237${city.phone1.replace(/\s/g, '')}`}
                      animate={{
                        x: hoveredLocation === city.id ? 5 : 0,
                      }}
                      className="flex items-center gap-3 text-gray-400 hover:text-green-400 transition-colors"
                    >
                      <i className="bx bx-phone text-sm"></i>
                      <span className="text-sm">{city.phone1}</span>
                    </motion.a>
                    <motion.a
                      href={`tel:+237${city.phone2.replace(/\s/g, '')}`}
                      animate={{
                        x: hoveredLocation === city.id ? 5 : 0,
                      }}
                      className="flex items-center gap-3 text-gray-400 hover:text-green-400 transition-colors"
                    >
                      <i className="bx bx-phone text-sm"></i>
                      <span className="text-sm">{city.phone2}</span>
                    </motion.a>
                  </div>
                </div>

                {/* Effet de brillance */}
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  animate={{
                    background: hoveredLocation === city.id 
                      ? 'radial-gradient(circle at 50% 50%, rgba(0,230,118,0.1), transparent 70%)'
                      : 'none',
                  }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div variants={itemVariants} className="flex flex-col lg:flex-row justify-between items-center gap-8 pt-8 border-t border-white/10">
          {/* Email de contact */}
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ rotate: 360 }}
              className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center"
            >
              <i className="bx bx-envelope text-green-400"></i>
            </motion.div>
            <a 
              href="mailto:contact@dbdigitalagency.com"
              className="text-gray-300 hover:text-green-400 transition-colors"
            >
              contact@dbdigitalagency.com
            </a>
          </div>

          {/* Horaires */}
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ rotate: 360 }}
              className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center"
            >
              <i className="bx bx-time text-green-400"></i>
            </motion.div>
            <span className="text-gray-300">{t('footer.hours.value')}</span>
          </div>

          {/* Bouton Start Project */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/contact"
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl text-white font-bold flex items-center gap-2 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <span>{t('footer.project.start')}</span>
              <i className="bx bx-right-arrow-alt"></i>
            </Link>
          </motion.div>
        </motion.div>

        {/* Copyright */}
        <motion.div variants={itemVariants} className="mt-12 pt-6 text-center border-t border-white/10">
          <p className="text-sm text-gray-500">
            © Copyright {currentYear} {t('footer.brand.title')}. {t('footer.copyright.rights')}
          </p>
          <p className="text-xs text-gray-600 mt-2">
            {t('footer.copyright.design')}
          </p>
        </motion.div>
      </div>

      {/* Back to Top Button avec animation */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-full shadow-xl flex items-center justify-center z-50 group"
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        aria-label={t('footer.backToTop')}
      >
        <i className="bx bx-chevron-up text-xl group-hover:animate-bounce"></i>
        
        {/* Anneau de pulsation */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          style={{
            border: '2px solid #00e676',
          }}
        />
      </motion.button>

      {/* Particules flottantes */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-green-500/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </motion.footer>
  );
};

export default Footer;