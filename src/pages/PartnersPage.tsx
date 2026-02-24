import React, { useRef, useState } from 'react';
import { motion, useInView } from "motion/react";
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import { AboutLayout } from '../components/sections/about/AboutLayout';
import { aboutImages, partners} from '../data/aboutData';

export const PartnersPage: React.FC = () => {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });

  const categories = [
    { id: 'all', label: t('partners.categories.all', 'Tous'), icon: 'bx bx-grid-alt' },
    { id: 'technology', label: t('partners.categories.technology', 'Technologie'), icon: 'bx bx-chip' },
    { id: 'business', label: t('partners.categories.business', 'Business'), icon: 'bx bx-briefcase' },
    { id: 'certification', label: t('partners.categories.certification', 'Certification'), icon: 'bx bx-certification' }
  ];

  const filteredPartners = selectedCategory === 'all'
    ? partners
    : partners.filter(p => p.category === selectedCategory);

  return (
    <AboutLayout
      title="partners"
      subtitle={t('partners.subtitle', "Ils nous font confiance et nous accompagnent")}
      image={aboutImages.partners}
    >
      <div ref={sectionRef} className="space-y-12">
        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className={`text-2xl md:text-3xl font-display font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {t('partners.title', 'Nos Partenaires')}
          </h2>
          <p className={`text-base ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {t('partners.description', "Nous collaborons avec les leaders de l'industrie pour offrir le meilleur à nos clients.")}
          </p>
        </motion.div>

        {/* Filtres par catégorie */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
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

        {/* Grille des partenaires */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPartners.map((partner, index) => (
            <motion.a
              key={partner.id}
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`relative group p-6 rounded-xl backdrop-blur-sm border overflow-hidden ${
                isDark
                  ? 'bg-gray-800/50 border-gray-700'
                  : 'bg-white/50 border-gray-200'
              }`}
            >
              {/* Effet de glow */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${partner.color}20, transparent 70%)`,
                }}
              />

              <div className="relative z-10">
                {/* Logo */}
                <div className="flex justify-center mb-4">
                  <div className="w-24 h-24 rounded-xl overflow-hidden bg-white p-2">
                    <img
                      src={partner.logo}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* Info */}
                <h3 className={`text-center font-bold mb-2 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {t(partner.nameKey)}
                </h3>

                <p className={`text-xs text-center mb-3 ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {t(partner.descriptionKey)}
                </p>

                {/* Badges */}
                <div className="flex flex-wrap justify-center gap-2">
                  <span className="px-2 py-1 text-[10px] rounded-full bg-green-500/10 text-green-500 border border-green-500/20">
                    {partner.category === 'technology' && t('partners.badges.technology', 'Technologie')}
                    {partner.category === 'business' && t('partners.badges.business', 'Business')}
                    {partner.category === 'certification' && t('partners.badges.certification', 'Certification')}
                  </span>
                  <span className="px-2 py-1 text-[10px] rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20">
                    {t('partners.since', 'Depuis')} {partner.partnershipSince}
                  </span>
                </div>
              </div>

              {/* Lien externe */}
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-2 right-2"
              >
                <i className="bx bx-link-external text-lg" style={{ color: partner.color }} />
              </motion.div>
            </motion.a>
          ))}
        </div>

        {/* Section des certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="mt-12 p-8 rounded-xl bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20"
        >
          <h3 className={`text-xl font-bold text-center mb-6 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {t('partners.certifications', 'Nos Certifications')}
          </h3>

          <div className="flex flex-wrap justify-center gap-6">
            {['ISO 9001', 'ISO 27001', 'GDPR Compliant', 'WCAG 2.1'].map((cert) => (
              <motion.div
                key={cert}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20"
              >
                <span className="text-sm font-bold text-green-500">{cert}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </AboutLayout>
  );
};