import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../contexts/ThemeContext';
import { motion, useInView, AnimatePresence, Variants } from "motion/react";

// Images pour chaque service (images en ligne via Unsplash)
const serviceImages = [
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=600&fit=crop',
];

const SERVICES = [
  { 
    id: 'web',
    icon: 'bx bx-code-alt', 
    gradient: 'from-blue-500 to-cyan-500',
    color: '#3B82F6',
    titleKey: 'servicesSection.web.title',
    descKey: 'servicesSection.web.desc',
    tagsKeys: ['react', 'nextjs', 'typescript', 'laravel'],
    featuresKeys: ['performance', 'seo', 'responsive', 'pwa'],
    statsKeys: ['projects', 'satisfaction']
  },
  { 
    id: 'mobile',
    icon: 'bx bx-mobile-alt', 
    gradient: 'from-green-500 to-emerald-500',
    color: '#10B981',
    titleKey: 'servicesSection.mobile.title',
    descKey: 'servicesSection.mobile.desc',
    tagsKeys: ['flutter', 'ios', 'android', 'firebase'],
    featuresKeys: ['crossPlatform', 'uiNative', 'storeReady', 'offline'],
    statsKeys: ['projects', 'satisfaction']
  },
  { 
    id: 'backend',
    icon: 'bx bx-server', 
    gradient: 'from-purple-500 to-pink-500',
    color: '#8B5CF6',
    titleKey: 'servicesSection.backend.title',
    descKey: 'servicesSection.backend.desc',
    tagsKeys: ['nodejs', 'adonisjs', 'postgresql', 'docker'],
    featuresKeys: ['scalable', 'secure', 'microservicesSection', 'cloud'],
    statsKeys: ['projects', 'uptime']
  },
  { 
    id: 'design',
    icon: 'bx bx-palette', 
    gradient: 'from-orange-500 to-red-500',
    color: '#F59E0B',
    titleKey: 'servicesSection.design.title',
    descKey: 'servicesSection.design.desc',
    tagsKeys: ['figma', 'prototyping', 'designSystem'],
    featuresKeys: ['wireframes', 'prototypes', 'designSystem', 'uxResearch'],
    statsKeys: ['projects', 'satisfaction']
  },
  { 
    id: 'seo',
    icon: 'bx bx-line-chart', 
    gradient: 'from-yellow-500 to-amber-500',
    color: '#EAB308',
    titleKey: 'servicesSection.seo.title',
    descKey: 'servicesSection.seo.desc',
    tagsKeys: ['seo', 'analytics', 'coreWebVitals'],
    featuresKeys: ['technicalSeo', 'analytics', 'performance', 'strategy'],
    statsKeys: ['projects', 'improvement']
  },
  { 
    id: 'training',
    icon: 'bx bx-chalkboard', 
    gradient: 'from-indigo-500 to-purple-500',
    color: '#6366F1',
    titleKey: 'servicesSection.training.title',
    descKey: 'servicesSection.training.desc',
    tagsKeys: ['workshops', 'audit', 'mentoring'],
    featuresKeys: ['workshops', 'audit', 'mentoring', 'bestPractices'],
    statsKeys: ['learners', 'satisfaction']
  },
];

const Eyebrow: React.FC<{ children: React.ReactNode; center?: boolean }> = ({ children, center }) => (
  <div className={`flex items-center gap-2.5 mb-4 ${center ? 'justify-center' : 'justify-start'}`}>
    <span className="w-7 h-0.5 rounded-full bg-green-500 flex-shrink-0" />
    <span className="text-xs font-bold tracking-wider uppercase text-green-500 font-body">
      {children}
    </span>
  </div>
);

const SectionTitle: React.FC<{ children: React.ReactNode; center?: boolean }> = ({ children, center }) => (
  <h2 className={`font-display font-extrabold text-[clamp(28px,4vw,50px)] leading-tight tracking-tight text-gray-900 dark:text-white mb-4 ${center ? 'text-center' : 'text-left'}`}>
    {children}
  </h2>
);

function useReveal() {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return { ref, inView };
}

export const ServicesSection: React.FC = () => {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const { ref, inView } = useReveal();

  // Préchargement des images
  React.useEffect(() => {
    serviceImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const imageVariants: Variants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const overlayVariants: Variants = {
    initial: { opacity: 0.85 },
    hover: { 
      opacity: 0.92,
      transition: { duration: 0.3 }
    }
  };

  // Helper function pour obtenir les traductions avec fallback
  const getTranslation = (key: string): string => {
    const translated = t(key);
    return typeof translated === 'string' ? translated : key;
  };

  // Obtenir les valeurs des statistiques
  const getStatValue = (statKey: string): string => {
    const statValue = t(`servicesSection.stats.${statKey}`);
    return typeof statValue === 'string' ? statValue : '0';
  };

  const getStatLabel = (statKey: string): string => {
    const label = t(`servicesSection.stats.labels.${statKey}`);
    return typeof label === 'string' ? label : statKey;
  };

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Arrière-plan animé */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 ${
          isDark 
            ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
            : 'bg-gradient-to-br from-gray-50 via-white to-gray-50'
        }`} />
        
        {/* Particules */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-green-500/20 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                transition: {
                  duration: 10 + Math.random() * 10,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            />
          ))}
        </div>

        {/* Lignes animées */}
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
      </div>

      <div ref={ref} className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-12 items-end mb-16"
        >
          <div>
            <Eyebrow>{getTranslation('servicesSection.eyebrow')}</Eyebrow>
            <SectionTitle>
              {getTranslation('servicesSection.title')}
            </SectionTitle>
          </div>
          <p className="text-base leading-relaxed text-gray-600 dark:text-gray-300">
            {getTranslation('servicesSection.subtitle')}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl shadow-2xl"
            >
              {/* Image de fond avec ombre améliorée */}
              <motion.div
                variants={imageVariants}
                initial="initial"
                animate={hoveredIndex === index ? "hover" : "initial"}
                className="absolute inset-0"
              >
                <img
                  src={serviceImages[index]}
                  alt={getTranslation(service.titleKey)}
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay avec dégradé plus fort pour meilleure lisibilité */}
                <motion.div
                  variants={overlayVariants}
                  initial="initial"
                  animate={hoveredIndex === index ? "hover" : "initial"}
                  className={`absolute inset-0 bg-gradient-to-t ${
                    hoveredIndex === index
                      ? 'from-black via-black/85 to-black/60'
                      : 'from-black/90 via-black/80 to-black/60'
                  }`}
                />
                
                {/* Ombre supplémentaire pour améliorer la lisibilité du texte */}
                <div className="absolute inset-0 bg-black/20 pointer-events-none" />
              </motion.div>

              {/* Contenu */}
              <motion.div
                animate={{
                  y: hoveredIndex === index ? -8 : 0,
                  scale: hoveredIndex === index ? 1.02 : 1,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="relative p-8 min-h-[400px] flex flex-col"
              >
                {/* Effet de brillance au hover */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                  initial={{ background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 0%, transparent 50%)' }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0, 0.3, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />

                {/* Icône avec animation */}
                <motion.div
                  animate={{
                    rotate: hoveredIndex === index ? 360 : 0,
                    scale: hoveredIndex === index ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.5 }}
                  className={`w-16 h-16 rounded-xl mb-6 flex items-center justify-center bg-gradient-to-br ${service.gradient} shadow-lg relative z-10`}
                >
                  <i className={`${service.icon} text-3xl text-white`}></i>
                </motion.div>

                {/* Titre */}
                <h3 className="text-xl font-bold font-display text-white mb-3 relative z-10 drop-shadow-lg">
                  {getTranslation(service.titleKey)}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-100 mb-4 leading-relaxed relative z-10 drop-shadow-md">
                  {getTranslation(service.descKey)}
                </p>

                {/* Tags avec animation */}
                <div className="flex flex-wrap gap-2 mb-4 relative z-10">
                  {service.tagsKeys.map((tag, i) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className={`px-3 py-1 text-xs font-bold uppercase rounded-full border ${
                        hoveredIndex === index
                          ? 'bg-white/20 border-white/30 text-white'
                          : 'bg-black/40 border-white/20 text-white'
                      } backdrop-blur-sm drop-shadow-md`}
                    >
                      {getTranslation(`servicesSection.tags.${tag}`)}
                    </motion.span>
                  ))}
                </div>

                {/* Features supplémentaires (apparaissent au hover) */}
                <AnimatePresence>
                  {(hoveredIndex === index || expandedIndex === index) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden relative z-10"
                    >
                      <div className="grid grid-cols-2 gap-2 pt-4 border-t border-white/30">
                        {service.featuresKeys.map((feature, i) => (
                          <motion.div
                            key={feature}
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-1 text-xs text-white/90 drop-shadow-md"
                          >
                            <i className="bx bx-check text-green-400"></i>
                            <span>{getTranslation(`servicesSection.features.${feature}`)}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Statistiques */}
                <div className="flex justify-between mt-4 text-sm relative z-10">
                  {service.statsKeys.map((statKey) => (
                    <div key={statKey} className="text-center">
                      <div className="font-bold text-green-400 drop-shadow-md">
                        {getStatValue(statKey)}
                      </div>
                      <div className="text-xs text-gray-200 capitalize drop-shadow-md">
                        {getStatLabel(statKey)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Flèche animée */}
                <motion.div
                  animate={{
                    x: hoveredIndex === index ? 5 : 0,
                    rotate: hoveredIndex === index ? -45 : 0,
                  }}
                  className="absolute bottom-6 right-6 w-8 h-8 rounded-full border border-white/40 flex items-center justify-center text-white backdrop-blur-sm bg-black/20"
                >
                  <i className="bx bx-arrow-back bx-rotate-180 text-lg"></i>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// import React, { useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import { useTheme } from '../../../contexts/ThemeContext';
// import { motion, useInView, AnimatePresence, Variants } from "motion/react";

// // Images pour chaque service (à placer dans le dossier public/images/servicesSection/)
// const serviceImages = [
//   '/images/services/web-development.jpg',
//   '/images/services/mobile-apps.jpg',
//   '/images/services/backend.jpg',
//   '/images/services/ui-ux-design.jpg',
//   '/images/services/seo.jpg',
//   '/images/services/training.jpg',
// ];

// const SERVICES = [
//   { 
//     id: 'web',
//     icon: 'bx bx-code-alt', 
//     gradient: 'from-blue-500 to-cyan-500',
//     color: '#3B82F6',
//     title: 'Développement Web', 
//     tags: ['React', 'Next.js', 'TypeScript', 'Laravel'], 
//     desc: 'Sites vitrine, e-commerce, SaaS — des applications performantes, accessibles et optimisées pour convertir vos visiteurs en clients.',
//     features: ['Performance', 'SEO', 'Responsive', 'PWA'],
//     stats: { projects: '50+', satisfaction: '98%' }
//   },
//   { 
//     id: 'mobile',
//     icon: 'bx bx-mobile-alt', 
//     gradient: 'from-green-500 to-emerald-500',
//     color: '#10B981',
//     title: 'Applications Mobiles', 
//     tags: ['Flutter', 'iOS', 'Android', 'Firebase'], 
//     desc: 'Apps cross-platform fluides et élégantes. Développées avec Flutter pour une expérience native sur iOS et Android, publication incluse.',
//     features: ['Cross-platform', 'UI native', 'Store ready', 'Offline'],
//     stats: { projects: '30+', satisfaction: '97%' }
//   },
//   { 
//     id: 'backend',
//     icon: 'bx bx-server', 
//     gradient: 'from-purple-500 to-pink-500',
//     color: '#8B5CF6',
//     title: 'Backend & APIs', 
//     tags: ['Node.js', 'AdonisJS', 'PostgreSQL', 'Docker'], 
//     desc: 'Architecture robuste, APIs RESTful & GraphQL, systèmes scalables. Des solutions backend conçues pour durer et grandir avec votre business.',
//     features: ['Scalable', 'Sécurisé', 'Microservices', 'Cloud'],
//     stats: { projects: '40+', uptime: '99.9%' }
//   },
//   { 
//     id: 'design',
//     icon: 'bx bx-palette', 
//     gradient: 'from-orange-500 to-red-500',
//     color: '#F59E0B',
//     title: 'Design UI/UX', 
//     tags: ['Figma', 'Prototyping', 'Design System'], 
//     desc: 'Interfaces belles et intuitives conçues pour convertir. Maquettes interactives validées avant la moindre ligne de code.',
//     features: ['Wireframes', 'Prototypes', 'Design System', 'UX Research'],
//     stats: { projects: '60+', satisfaction: '99%' }
//   },
//   { 
//     id: 'seo',
//     icon: 'bx bx-line-chart', 
//     gradient: 'from-yellow-500 to-amber-500',
//     color: '#EAB308',
//     title: 'SEO & Performance', 
//     tags: ['SEO', 'Analytics', 'Core Web Vitals'], 
//     desc: 'Optimisation pour les moteurs de recherche, audits Lighthouse, stratégie de contenu. Soyez visible là où vos clients vous cherchent.',
//     features: ['SEO technique', 'Analytics', 'Performance', 'Strategy'],
//     stats: { projects: '35+', improvement: '+150%' }
//   },
//   { 
//     id: 'training',
//     icon: 'bx bx-chalkboard', 
//     gradient: 'from-indigo-500 to-purple-500',
//     color: '#6366F1',
//     title: 'Formation & Conseil', 
//     tags: ['Workshops', 'Audit', 'Mentoring'], 
//     desc: 'Ateliers techniques, audit de code et conseil en architecture. Montez en compétences avec notre équipe expérimentée.',
//     features: ['Workshops', 'Audit', 'Mentoring', 'Best practices'],
//     stats: { learners: '200+', satisfaction: '100%' }
//   },
// ];

// const Eyebrow: React.FC<{ children: React.ReactNode; center?: boolean }> = ({ children, center }) => (
//   <div className={`flex items-center gap-2.5 mb-4 ${center ? 'justify-center' : 'justify-start'}`}>
//     <span className="w-7 h-0.5 rounded-full bg-green-500 flex-shrink-0" />
//     <span className="text-xs font-bold tracking-wider uppercase text-green-500 font-body">
//       {children}
//     </span>
//   </div>
// );

// const SectionTitle: React.FC<{ children: React.ReactNode; center?: boolean }> = ({ children, center }) => (
//   <h2 className={`font-display font-extrabold text-[clamp(28px,4vw,50px)] leading-tight tracking-tight text-gray-900 dark:text-white mb-4 ${center ? 'text-center' : 'text-left'}`}>
//     {children}
//   </h2>
// );

// function useReveal() {
//   const ref = React.useRef<HTMLDivElement>(null);
//   const inView = useInView(ref, { once: true, margin: '-60px' });
//   return { ref, inView };
// }

// export const ServicesSection: React.FC = () => {
//   const { t } = useTranslation();
//   const { isDark } = useTheme();
//   const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
//   const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
//   const { ref, inView } = useReveal();

//   // Préchargement des images
//   React.useEffect(() => {
//     serviceImages.forEach(src => {
//       const img = new Image();
//       img.src = src;
//     });
//   }, []);

//   const containerVariants: Variants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.3,
//       },
//     },
//   };

//   const itemVariants: Variants = {
//     hidden: { y: 30, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         type: 'spring',
//         stiffness: 100,
//         damping: 12,
//       },
//     },
//   };

//   // Variants pour l'image de fond
//   const imageVariants: Variants = {
//     initial: { scale: 1 },
//     hover: { 
//       scale: 1.1,
//       transition: { duration: 0.6, ease: "easeOut" }
//     }
//   };

//   // Variants pour l'overlay
//   const overlayVariants: Variants = {
//     initial: { opacity: 0.7 },
//     hover: { 
//       opacity: 0.85,
//       transition: { duration: 0.3 }
//     }
//   };

//   return (
//     <section className="relative py-24 overflow-hidden">
//       {/* Arrière-plan animé */}
//       <div className="absolute inset-0">
//         <div className={`absolute inset-0 ${
//           isDark 
//             ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
//             : 'bg-gradient-to-br from-gray-50 via-white to-gray-50'
//         }`} />
        
//         {/* Particules */}
//         <div className="absolute inset-0 opacity-30">
//           {[...Array(20)].map((_, i) => (
//             <motion.div
//               key={i}
//               className="absolute w-1 h-1 bg-green-500/20 rounded-full"
//               initial={{
//                 x: Math.random() * window.innerWidth,
//                 y: Math.random() * window.innerHeight,
//               }}
//               animate={{
//                 x: Math.random() * window.innerWidth,
//                 y: Math.random() * window.innerHeight,
//                 transition: {
//                   duration: 10 + Math.random() * 10,
//                   repeat: Infinity,
//                   ease: "linear",
//                 },
//               }}
//             />
//           ))}
//         </div>

//         {/* Lignes animées */}
//         {[...Array(5)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent"
//             style={{ top: `${20 + i * 15}%`, left: 0, right: 0 }}
//             animate={{
//               x: ['-100%', '100%'],
//             }}
//             transition={{
//               duration: 8 + i * 2,
//               repeat: Infinity,
//               ease: 'linear',
//               delay: i * 1.5,
//             }}
//           />
//         ))}
//       </div>

//       <div ref={ref} className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.6 }}
//           className="grid lg:grid-cols-2 gap-12 items-end mb-16"
//         >
//           <div>
//             <Eyebrow>{t('services.eyebrow', 'Nos Expertises')}</Eyebrow>
//             <SectionTitle>
//               {t('services.title', 'Des solutions qui font la différence')}
//             </SectionTitle>
//           </div>
//           <p className="text-base leading-relaxed text-gray-600 dark:text-gray-300">
//             {t('services.subtitle', "De l'idée au lancement, nous maîtrisons chaque étape pour vous livrer un produit qui génère de la valeur réelle.")}
//           </p>
//         </motion.div>

//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           animate={inView ? "visible" : "hidden"}
//           className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
//         >
//           {SERVICES.map((service, index) => (
//             <motion.div
//               key={service.id}
//               variants={itemVariants}
//               onHoverStart={() => setHoveredIndex(index)}
//               onHoverEnd={() => setHoveredIndex(null)}
//               onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
//               className="group relative cursor-pointer overflow-hidden rounded-2xl"
//             >
//               {/* Image de fond */}
//               <motion.div
//                 variants={imageVariants}
//                 initial="initial"
//                 animate={hoveredIndex === index ? "hover" : "initial"}
//                 className="absolute inset-0"
//               >
//                 <img
//                   src={serviceImages[index]}
//                 //   alt={t(`services.${service.id}.title`, service.title)}
//                   className="w-full h-full object-cover"
//                 />
                
//                 {/* Overlay avec dégradé */}
//                 <motion.div
//                   variants={overlayVariants}
//                   initial="initial"
//                   animate={hoveredIndex === index ? "hover" : "initial"}
//                   className={`absolute inset-0 bg-gradient-to-t ${
//                     hoveredIndex === index
//                       ? 'from-gray-900 via-gray-900/80 to-gray-900/40'
//                       : 'from-gray-900 via-gray-900/70 to-gray-900/30'
//                   }`}
//                 />
//               </motion.div>

//               {/* Contenu */}
//               <motion.div
//                 animate={{
//                   y: hoveredIndex === index ? -8 : 0,
//                   scale: hoveredIndex === index ? 1.02 : 1,
//                 }}
//                 transition={{ type: 'spring', stiffness: 300, damping: 20 }}
//                 className="relative p-8 min-h-[400px] flex flex-col"
//               >
//                 {/* Effet de brillance au hover */}
//                 <motion.div
//                   className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
//                   initial={{ background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 0%, transparent 50%)' }}
//                   animate={{
//                     scale: [1, 1.2, 1],
//                     opacity: [0, 0.3, 0],
//                   }}
//                   transition={{
//                     duration: 2,
//                     repeat: Infinity,
//                   }}
//                 />

//                 {/* Icône avec animation */}
//                 <motion.div
//                   animate={{
//                     rotate: hoveredIndex === index ? 360 : 0,
//                     scale: hoveredIndex === index ? 1.1 : 1,
//                   }}
//                   transition={{ duration: 0.5 }}
//                   className={`w-16 h-16 rounded-xl mb-6 flex items-center justify-center bg-gradient-to-br ${service.gradient} shadow-lg relative z-10`}
//                 >
//                   <i className={`${service.icon} text-3xl text-white`}></i>
//                 </motion.div>

//                 {/* Titre */}
//                 <h3 className="text-xl font-bold font-display text-white mb-3 relative z-10">
//                   {t(`services.${service.id}.title`, service.title)}
//                 </h3>

//                 {/* Description */}
//                 <p className="text-sm text-gray-200 mb-4 leading-relaxed relative z-10">
//                   {t(`services.${service.id}.desc`, service.desc)}
//                 </p>

//                 {/* Tags avec animation */}
//                 <div className="flex flex-wrap gap-2 mb-4 relative z-10">
//                   {service.tags.map((tag, i) => (
//                     <motion.span
//                       key={tag}
//                       initial={{ opacity: 0, scale: 0.8 }}
//                       animate={{ opacity: 1, scale: 1 }}
//                       transition={{ delay: i * 0.05 }}
//                       className={`px-3 py-1 text-xs font-bold uppercase rounded-full border ${
//                         hoveredIndex === index
//                           ? 'bg-white/20 border-white/30 text-white'
//                           : 'bg-black/30 border-white/20 text-white'
//                       } backdrop-blur-sm`}
//                     >
//                       {tag}
//                     </motion.span>
//                   ))}
//                 </div>

//                 {/* Features supplémentaires (apparaissent au hover) */}
//                 <AnimatePresence>
//                   {(hoveredIndex === index || expandedIndex === index) && (
//                     <motion.div
//                       initial={{ opacity: 0, height: 0 }}
//                       animate={{ opacity: 1, height: 'auto' }}
//                       exit={{ opacity: 0, height: 0 }}
//                       transition={{ duration: 0.3 }}
//                       className="overflow-hidden relative z-10"
//                     >
//                       <div className="grid grid-cols-2 gap-2 pt-4 border-t border-white/20">
//                         {service.features.map((feature, i) => (
//                           <motion.div
//                             key={feature}
//                             initial={{ x: -10, opacity: 0 }}
//                             animate={{ x: 0, opacity: 1 }}
//                             transition={{ delay: i * 0.1 }}
//                             className="flex items-center gap-1 text-xs text-white/90"
//                           >
//                             <i className="bx bx-check text-green-400"></i>
//                             <span>{t(`services.features.${feature.toLowerCase()}`, feature)}</span>
//                           </motion.div>
//                         ))}
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>

//                 {/* Statistiques */}
//                 <div className="flex justify-between mt-4 text-sm relative z-10">
//                   {Object.entries(service.stats).map(([key, value]) => (
//                     <div key={key} className="text-center">
//                       <div className="font-bold text-green-400">{value}</div>
//                       <div className="text-xs text-gray-300 capitalize">
//                         {t(`services.stats.${key}`, key)}
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Flèche animée */}
//                 <motion.div
//                   animate={{
//                     x: hoveredIndex === index ? 5 : 0,
//                     rotate: hoveredIndex === index ? -45 : 0,
//                   }}
//                   className="absolute bottom-6 right-6 w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-white backdrop-blur-sm"
//                 >
//                   <i className="bx bx-arrow-back bx-rotate-180 text-lg"></i>
//                 </motion.div>
//               </motion.div>
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// };