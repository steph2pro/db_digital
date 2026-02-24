import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from "motion/react";
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import { expertiseImages, technologies } from '../data/expertiseData';
import { ExpertiseLayout } from '../components/sections/expertise/ExpertiseLayout';

export const TechnologiesPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { isDark } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });

  const categories = [
    { id: 'all', label: i18n.language === 'fr' ? 'Tous' : 'All', icon: 'bx bx-grid-alt' },
    { id: 'frontend', label: i18n.language === 'fr' ? 'Frontend' : 'Frontend', icon: 'bx bx-code-alt' },
    { id: 'backend', label: i18n.language === 'fr' ? 'Backend' : 'Backend', icon: 'bx bx-server' },
    { id: 'mobile', label: i18n.language === 'fr' ? 'Mobile' : 'Mobile', icon: 'bx bx-mobile-alt' },
    { id: 'database', label: i18n.language === 'fr' ? 'Base de données' : 'Database', icon: 'bx bx-data' },
    { id: 'devops', label: 'DevOps', icon: 'bx bx-cloud' }
  ];

  const filteredTechnologies = selectedCategory === 'all' 
    ? technologies 
    : technologies.filter(tech => tech.category === selectedCategory);

  return (
    <ExpertiseLayout
      title="technologies"
      subtitle={i18n.language === 'fr' 
        ? "Nous maîtrisons les technologies les plus récentes pour vos projets"
        : "We master the latest technologies for your projects"}
      image={expertiseImages.technologies}
    >
      {/* Filtres par catégorie */}
      <motion.div
        ref={sectionRef}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex flex-wrap justify-center gap-3 mb-12"
      >
        {categories.map((cat, index) => (
          <motion.button
            key={cat.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-300 ${
              selectedCategory === cat.id
                ? 'bg-gradient-to-r from-green-500 to-blue-600 text-white shadow-lg'
                : isDark
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            <i className={cat.icon} />
            <span className="text-sm font-medium">{cat.label}</span>
          </motion.button>
        ))}
      </motion.div>

      {/* Grille des technologies */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="wait">
          {filteredTechnologies.map((tech, index) => (
            <motion.div
              key={tech.id}
              layout
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -50 }}
              transition={{ 
                duration: 0.5,
                delay: index * 0.1,
                layout: { duration: 0.3 }
              }}
              onHoverStart={() => setHoveredTech(tech.id)}
              onHoverEnd={() => setHoveredTech(null)}
              className="group relative"
            >
              {/* Effet de glow */}
              <motion.div
                className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(135deg, ${tech.color}40, transparent)`,
                  filter: 'blur(8px)',
                }}
                animate={hoveredTech === tech.id ? { scale: 1.05 } : { scale: 1 }}
              />

              <div className={`relative rounded-2xl overflow-hidden backdrop-blur-sm border transition-all duration-500 ${
                isDark 
                  ? 'bg-gray-800/50 border-gray-700' 
                  : 'bg-white/50 border-gray-200'
              } ${hoveredTech === tech.id ? 'shadow-2xl' : 'shadow-lg'}`}>
                
                {/* Image d'en-tête */}
                <div className="relative h-32 overflow-hidden">
                  <motion.div
                    animate={hoveredTech === tech.id ? { scale: 1.1 } : { scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${tech.gradient} opacity-90`} />
                    
                    {/* Particules animées */}
                    {hoveredTech === tech.id && [...Array(6)].map((_, i) => (
                      <motion.div
                        key={`particle-${i}`}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                          scale: [0, 1, 0],
                          opacity: [0, 1, 0],
                          x: [0, (Math.random() - 0.5) * 50],
                          y: [0, (Math.random() - 0.5) * 50],
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: i * 0.1,
                        }}
                      />
                    ))}
                  </motion.div>

                  {/* Icône et nom */}
                  <div className="relative h-full flex items-center justify-center text-white">
                    <motion.div
                      animate={hoveredTech === tech.id ? { 
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.2, 1]
                      } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      <i className={`${tech.icon} text-4xl mb-2`} />
                    </motion.div>
                  </div>
                </div>

                {/* Contenu */}
                <div className="p-4">
                  <h3 className={`text-lg font-bold mb-1 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {t(tech.nameKey)}
                  </h3>

                  <p className={`text-xs mb-3 ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {t(tech.descriptionKey)}
                  </p>

                  {/* Barre de progression */}
                  <div className="mb-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                        Maîtrise
                      </span>
                      <span className="text-green-500 font-bold">{tech.proficiency}%</span>
                    </div>
                    <div className={`h-1.5 rounded-full overflow-hidden ${
                      isDark ? 'bg-gray-700' : 'bg-gray-200'
                    }`}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${tech.proficiency}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className="h-full rounded-full"
                        style={{
                          background: `linear-gradient(90deg, ${tech.color}, #00e676)`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex justify-between text-xs">
                    <div className="flex items-center gap-1">
                      <i className="bx bx-time text-green-500" />
                      <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                        {tech.experience}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <i className="bx bx-briefcase text-blue-500" />
                      <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                        {tech.projects} projets
                      </span>
                    </div>
                  </div>

                  {/* Catégorie badge */}
                  <motion.div
                    animate={hoveredTech === tech.id ? { 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    } : {}}
                    className="absolute top-2 right-2"
                  >
                    <span className={`px-2 py-1 text-[10px] font-bold rounded-full ${
                      isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {categories.find(c => c.id === tech.category)?.label}
                    </span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </ExpertiseLayout>
  );
};