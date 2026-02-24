import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from "motion/react";
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import { AboutLayout } from '../components/sections/about/AboutLayout';
import { aboutImages, companyStats, milestones, values } from '../data/aboutData';

export const AboutPage: React.FC = () => {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState<'story' | 'values' | 'milestones'>('story');
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });
  const statsInView = useInView(statsRef, { once: true });

  return (
    <AboutLayout
      title="about"
      subtitle={t('about.subtitle', "Agence digitale de classe mondiale offrant des résultats exceptionnels")}
      image={aboutImages.about}
    >
      <div ref={sectionRef} className="space-y-16">
        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className={`text-2xl md:text-3xl font-display font-bold mb-6 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {t('about.title', 'DB DIGITAL AGENCY')}
          </h2>
          <p className={`text-base md:text-lg leading-relaxed ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {t('about.description', 'DB DIGITAL AGENCY est une agence digitale de premier plan spécialisée dans le développement web, les applications mobiles, le design et le marketing digital. Avec des années d\'expérience et une équipe de professionnels talentueux, nous aidons les entreprises à transformer leur présence digitale et à atteindre leurs objectifs stratégiques.')}
          </p>
        </motion.div>

        {/* Statistiques */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { label: t('about.stats.years'), value: companyStats.years, suffix: '+', icon: 'bx bx-calendar' },
            { label: t('about.stats.projects'), value: companyStats.projects, suffix: '+', icon: 'bx bx-briefcase' },
            { label: t('about.stats.clients'), value: companyStats.clients, suffix: '+', icon: 'bx bx-user' },
            { label: t('about.stats.experts'), value: companyStats.experts, suffix: '', icon: 'bx bx-brain' },
            { label: t('about.stats.satisfaction'), value: companyStats.satisfaction, suffix: '%', icon: 'bx bx-smile' },
            { label: t('about.stats.countries'), value: companyStats.countries, suffix: '+', icon: 'bx bx-world' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={statsInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`relative p-4 rounded-xl backdrop-blur-sm border text-center overflow-hidden ${
                isDark
                  ? 'bg-gray-800/50 border-gray-700'
                  : 'bg-white/50 border-gray-200'
              }`}
            >
              {/* Cercle animé */}
              <motion.div
                className="absolute -right-5 -top-5 w-20 h-20 rounded-full opacity-20"
                style={{
                  background: `radial-gradient(circle, ${index % 2 === 0 ? '#00e676' : '#00a8e8'}, transparent)`,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
              />

              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.1 }}
              >
                <i className={`${stat.icon} text-2xl mb-2`} style={{ color: index % 2 === 0 ? '#00e676' : '#00a8e8' }} />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={statsInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="text-2xl font-bold text-green-500"
              >
                <CountUp end={stat.value} duration={2} delay={index * 0.1} />
                {stat.suffix}
              </motion.div>
              
              <div className={`text-xs mt-1 ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tabs de navigation */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 border-b pb-4">
          {[
            { id: 'story', label: t('about.tabs.story', 'Notre Histoire'), icon: 'bx bx-history' },
            { id: 'values', label: t('about.tabs.values', 'Nos Valeurs'), icon: 'bx bx-diamond' },
            { id: 'milestones', label: t('about.tabs.milestones', 'Jalons'), icon: 'bx bx-timeline' }
          ].map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-green-500 to-blue-600 text-white shadow-lg'
                  : isDark
                    ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
              }`}
            >
              <i className={tab.icon} />
              <span className="text-sm font-medium">{tab.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Contenu des tabs */}
        <div className="min-h-[400px]">
          {activeTab === 'story' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid md:grid-cols-2 gap-8 items-center"
            >
              <div className="space-y-4">
                <h3 className={`text-2xl font-bold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {t('about.story.title', 'Notre Mission')}
                </h3>
                <p className={`leading-relaxed ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {t('about.story.mission', "Notre mission est de fournir des solutions digitales de classe mondiale qui dépassent les attentes. Nous combinons créativité, expertise technique et réflexion stratégique pour créer des expériences exceptionnelles pour nos clients et leurs utilisateurs. Chaque projet est une opportunité de redéfinir l'excellence.")}
                </p>
                
                {/* Image avec animation */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative h-64 rounded-xl overflow-hidden mt-4"
                >
                  <img 
                    src={aboutImages.office}
                    alt="Office"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </motion.div>
              </div>

              <div className="space-y-4">
                <h3 className={`text-2xl font-bold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {t('about.story.vision', 'Notre Vision')}
                </h3>
                <p className={`leading-relaxed ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {t('about.story.visionText', "Devenir le partenaire digital de référence en Afrique et dans le monde, en repoussant constamment les limites de l'innovation et de la qualité.")}
                </p>

                {/* Citations inspirantes */}
                <blockquote className="relative p-6 rounded-xl bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 mt-4">
                  <i className="bx bxs-quote-left text-3xl text-green-500 mb-2" />
                  <p className="italic text-sm mb-2">
                    "L'excellence n'est pas un acte, mais une habitude."
                  </p>
                  <footer className="text-xs text-green-500">— Aristote</footer>
                </blockquote>
              </div>
            </motion.div>
          )}

          {activeTab === 'values' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {values.map((value, index) => (
                <motion.div
                  key={value.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className={`relative p-6 rounded-xl backdrop-blur-sm border overflow-hidden group ${
                    isDark
                      ? 'bg-gray-800/50 border-gray-700'
                      : 'bg-white/50 border-gray-200'
                  }`}
                >
                  {/* Effet de fond */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at 50% 0%, ${value.color}20, transparent)`,
                    }}
                  />

                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                      <motion.div
                        animate={{ 
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ duration: 4, repeat: Infinity, delay: index * 0.2 }}
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${value.gradient} flex items-center justify-center shadow-lg`}
                      >
                        <i className={`${value.icon} text-2xl text-white`} />
                      </motion.div>
                      <h3 className={`text-lg font-bold ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        {t(value.titleKey)}
                      </h3>
                    </div>

                    <p className={`text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {t(value.descriptionKey)}
                    </p>

                    {/* Barre de progression au hover */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5"
                      style={{
                        background: `linear-gradient(90deg, ${value.color}, transparent)`,
                      }}
                      initial={{ scaleX: 0, originX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 'milestones' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="relative"
            >
              {/* Ligne temporelle */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 to-blue-500" />

              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.id}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative flex flex-col md:flex-row ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    } items-start gap-4 md:gap-8`}
                  >
                    {/* Point sur la timeline */}
                    <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-green-500 z-10">
                      <motion.div
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                        className="absolute inset-0 rounded-full bg-green-500 opacity-50"
                      />
                    </div>

                    {/* Contenu */}
                    <div className={`w-full md:w-1/2 ${
                      index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                    } pl-8 md:pl-0`}>
                      <div className={`p-6 rounded-xl backdrop-blur-sm border ${
                        isDark
                          ? 'bg-gray-800/50 border-gray-700'
                          : 'bg-white/50 border-gray-200'
                      }`}>
                        <div className="flex items-center gap-3 mb-3">
                          <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="w-10 h-10 rounded-lg flex items-center justify-center"
                            style={{
                              background: `linear-gradient(135deg, ${milestone.color}, ${milestone.color}80)`,
                            }}
                          >
                            <i className={`${milestone.icon} text-xl text-white`} />
                          </motion.div>
                          <span className="text-2xl font-bold text-green-500">
                            {milestone.year}
                          </span>
                        </div>
                        <h4 className={`text-lg font-bold mb-2 ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}>
                          {t(milestone.titleKey)}
                        </h4>
                        <p className={`text-sm ${
                          isDark ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {t(milestone.descriptionKey)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {t('about.cta', 'Travailler avec nous')}
          </motion.button>
        </motion.div>
      </div>
    </AboutLayout>
  );
};

// Composant helper pour le comptage
const CountUp: React.FC<{ end: number; duration: number; delay: number }> = ({ end, duration, delay }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref);

  useEffect(() => {
    if (!inView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp - delay * 1000;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [inView, end, duration, delay]);

  return <span ref={ref}>{count}</span>;
};