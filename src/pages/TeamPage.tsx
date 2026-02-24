// src/pages/about/TeamPage.tsx
import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from "motion/react";
import { useTranslation } from 'react-i18next';
import { DICEBEAR_AVATARS, FALLBACK_AVATARS, TEAM_MEMBERS, TEAM_REASONS, TEAM_VALUES, TeamMember } from '../data/teamData';
import { useTheme } from '../contexts/ThemeContext';
import { AboutLayout } from '../components/sections/about/AboutLayout';
import { aboutImages } from '../data/aboutData';
// import { 
//   TEAM_MEMBERS, 
//   FALLBACK_AVATARS, 
//   DICEBEAR_AVATARS, 
//   TEAM_VALUES,
//   TEAM_REASONS,
//   TeamMember 
// } from '../../../data/teamData';

const Eyebrow: React.FC<{ children: React.ReactNode; center?: boolean }> = ({ children, center }) => (
  <div className={`flex items-center gap-2.5 mb-4 ${center ? 'justify-center' : 'justify-start'}`}>
    <span className="w-5 sm:w-7 h-0.5 rounded-full bg-green-500 flex-shrink-0" />
    <span className="text-[10px] sm:text-xs font-bold tracking-wider uppercase text-green-500 font-body">
      {children}
    </span>
  </div>
);

const SectionTitle: React.FC<{ children: React.ReactNode; center?: boolean }> = ({ children, center }) => (
  <h2 className={`font-display font-extrabold text-[clamp(28px,6vw,50px)] leading-tight tracking-tight text-gray-900 dark:text-white mb-3 sm:mb-4 ${center ? 'text-center' : 'text-left'}`}>
    {children}
  </h2>
);

export const TeamPage: React.FC = () => {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const [selectedMember, setSelectedMember] = useState<TeamMember>(TEAM_MEMBERS[0]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [useDiceBear, setUseDiceBear] = useState<boolean>(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Gestionnaire d'erreur d'image
  const handleImageError = (memberId: string) => {
    setImageErrors(prev => ({ ...prev, [memberId]: true }));
  };

  // Obtenir l'URL de l'avatar avec fallback
  const getAvatarUrl = (member: TeamMember, index: number): string => {
    if (imageErrors[member.id]) {
      return useDiceBear ? DICEBEAR_AVATARS[index] : FALLBACK_AVATARS[index];
    }
    return member.avatar;
  };

  // Basculer entre les styles d'avatar
  const toggleAvatarStyle = (): void => {
    setUseDiceBear(!useDiceBear);
    setImageErrors({}); // Réinitialiser les erreurs
  };

  return (
    <AboutLayout
      title="team"
      subtitle={t('team.subtitle', "Des experts passionnés au service de votre réussite")}
      image={aboutImages.team}
    >
      <div ref={sectionRef} className="space-y-12 sm:space-y-16">
        {/* En-tête avec bouton de bascule d'avatar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Eyebrow center>
            {t('team.eyebrow')}
          </Eyebrow>
          <SectionTitle center>
            {t('team.title')}
          </SectionTitle>
          <p className="text-sm sm:text-base leading-relaxed text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
            {t('team.subtitle')}
          </p>
          
          {/* Bouton pour changer le style d'avatar - adapté mobile */}
          <motion.button
            onClick={toggleAvatarStyle}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium bg-gradient-to-r from-green-500 to-blue-600 text-white hover:shadow-lg transition-all duration-300"
          >
            {t('team.avatarStyle.switch')} : {useDiceBear ? t('team.avatarStyle.illustration') : t('team.avatarStyle.real')}
          </motion.button>
        </motion.div>

        {/* Membre sélectionné (CEO en focus) - version mobile améliorée */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="mb-10 sm:mb-12"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedMember.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="relative"
            >
              {/* Effet de halo - adapté mobile */}
              <motion.div
                className="absolute inset-0 rounded-2xl sm:rounded-3xl"
                animate={{
                  boxShadow: [
                    `0 0 30px ${selectedMember.color}40`,
                    `0 0 50px ${selectedMember.color}60`,
                    `0 0 30px ${selectedMember.color}40`,
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              />

              {/* Carte principale */}
              <div className={`relative rounded-2xl sm:rounded-3xl overflow-hidden backdrop-blur-xl border ${
                isDark 
                  ? 'bg-gray-800/80 border-gray-700' 
                  : 'bg-white/80 border-gray-200'
              }`}>
                {/* Grille d'arrière-plan */}
                <div className="absolute inset-0 opacity-5 sm:opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `linear-gradient(${selectedMember.color} 1px, transparent 1px), linear-gradient(90deg, ${selectedMember.color} 1px, transparent 1px)`,
                    backgroundSize: '20px 20px',
                  }} />
                </div>

                {/* Particules autour du CEO - adaptées mobile */}
                {selectedMember.isCEO && [...Array(8)].map((_, i) => (
                  <motion.div
                    key={`particle-${i}`}
                    className="absolute w-0.5 h-0.5 rounded-full"
                    style={{
                      background: selectedMember.color,
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      x: [0, Math.cos(i * 45) * 40, 0],
                      y: [0, Math.sin(i * 45) * 40, 0],
                      scale: [0, 1, 0],
                      opacity: [0, 0.3, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  />
                ))}

                <div className="relative p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8 items-center">
                  {/* Avatar avec couronne pour CEO */}
                  <div className="relative flex-shrink-0 w-32 sm:w-40 md:w-48">
                    {selectedMember.isCEO && (
                      <motion.div
                        animate={{
                          y: [0, -8, 0],
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                        }}
                        className="absolute -top-6 sm:-top-8 left-1/2 transform -translate-x-1/2 text-2xl sm:text-3xl md:text-4xl z-20"
                      >
                        👑
                      </motion.div>
                    )}

                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      className="relative"
                    >
                      <div className={`w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-2xl sm:rounded-3xl bg-gradient-to-br ${selectedMember.gradient} p-1`}>
                        <div className="w-full h-full rounded-xl sm:rounded-2xl overflow-hidden bg-gray-200 dark:bg-gray-700">
                          <img
                            src={getAvatarUrl(selectedMember, TEAM_MEMBERS.indexOf(selectedMember))}
                            
                            className="w-full h-full object-cover"
                            onError={() => handleImageError(selectedMember.id)}
                          />
                        </div>
                      </div>

                      {/* Anneau rotatif - simplifié sur mobile */}
                      <motion.div
                        className="absolute -inset-1 sm:-inset-2 rounded-[1.5rem] sm:rounded-[2rem] border border-dashed"
                        style={{ borderColor: selectedMember.color }}
                        animate={{
                          rotate: 360,
                        }}
                        transition={{
                          duration: 20,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />

                      {/* Badge de rôle */}
                      <motion.div
                        animate={{
                          scale: [1, 1.05, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                        className="absolute -bottom-2 sm:-bottom-3 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
                      >
                        <span className={`px-2 sm:px-3 md:px-4 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold bg-gradient-to-r ${selectedMember.gradient} text-white shadow-lg`}>
                          {t(selectedMember.roleKey)}
                        </span>
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Informations */}
                  <div className="flex-1 text-center lg:text-left">
                    <motion.h3
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-display mb-1 sm:mb-2 ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {t(selectedMember.nameKey)}
                    </motion.h3>

                    <motion.p
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-green-500 text-xs sm:text-sm mb-2 sm:mb-4"
                    >
                      {t(selectedMember.roleKey)}
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className={`text-xs sm:text-sm md:text-base leading-relaxed mb-3 sm:mb-4 md:mb-6 ${
                        isDark ? 'text-gray-300' : 'text-gray-600'
                      }`}
                    >
                      {t(selectedMember.bioKey)}
                    </motion.p>

                    {/* Tags d'expertise - adaptés mobile */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4 md:mb-6 justify-center lg:justify-start"
                    >
                      {selectedMember.expertiseKeys.map((key, index) => (
                        <motion.span
                          key={key}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.6 + index * 0.1 }}
                          whileHover={{ scale: 1.05 }}
                          className={`px-2 sm:px-3 py-0.5 sm:py-1 text-[8px] sm:text-xs font-bold rounded-full border ${
                            isDark
                              ? 'bg-gray-700 border-gray-600 text-white'
                              : 'bg-gray-200 border-gray-300 text-gray-700'
                          }`}
                        >
                          {t(key)}
                        </motion.span>
                      ))}
                    </motion.div>

                    {/* Statistiques - adaptées mobile */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      className="flex flex-wrap gap-3 sm:gap-4 md:gap-8 justify-center lg:justify-start"
                    >
                      {Object.entries(selectedMember.statsValues).map(([key, value], index) => {
                        const statKey = selectedMember.statsKeys[key];
                        return (
                          <motion.div
                            key={key}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 + index * 0.1 }}
                            className="text-center"
                          >
                            <div className="text-lg sm:text-xl md:text-2xl font-bold" style={{ color: selectedMember.color }}>
                              {value}
                            </div>
                            <div className={`text-[8px] sm:text-xs uppercase tracking-wider ${
                              isDark ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                              {statKey ? t(statKey) : key}
                            </div>
                          </motion.div>
                        );
                      })}
                    </motion.div>

                    {/* Réseaux sociaux - adaptés mobile */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      className="flex gap-2 sm:gap-3 mt-3 sm:mt-4 md:mt-6 justify-center lg:justify-start"
                    >
                      {Object.entries(selectedMember.social).map(([network, url]) => (
                        <motion.a
                          key={network}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.95 }}
                          className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg sm:rounded-xl flex items-center justify-center transition-colors ${
                            isDark
                              ? 'bg-gray-700 hover:bg-gray-600'
                              : 'bg-gray-200 hover:bg-gray-300'
                          }`}
                        >
                          <i className={`bx bxl-${network} text-base sm:text-lg md:text-xl`} style={{ color: selectedMember.color }} />
                        </motion.a>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Grille des membres - responsive grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6"
        >
          {TEAM_MEMBERS.filter(m => !m.isCEO).map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              onHoverStart={() => setHoveredId(member.id)}
              onHoverEnd={() => setHoveredId(null)}
              onClick={() => setSelectedMember(member)}
              className="group relative cursor-pointer"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative rounded-xl sm:rounded-2xl overflow-hidden backdrop-blur-sm border ${
                  selectedMember.id === member.id
                    ? `border-2 border-green-500`
                    : isDark
                      ? 'bg-gray-800/50 border-gray-700'
                      : 'bg-white/50 border-gray-200'
                }`}
              >
                {/* Effet de glow */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${member.color}20, transparent 70%)`,
                  }}
                />

                <div className="relative p-2 sm:p-3 md:p-4">
                  {/* Avatar avec effet 3D */}
                  <motion.div
                    animate={{
                      rotateY: hoveredId === member.id ? 180 : 0,
                    }}
                    transition={{ duration: 0.6 }}
                    className="relative mb-2 sm:mb-3"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Face avant */}
                    <div className="relative" style={{ backfaceVisibility: 'hidden' }}>
                      <div className={`w-full aspect-square rounded-lg sm:rounded-xl bg-gradient-to-br ${member.gradient} p-0.5 sm:p-1`}>
                        <div className="w-full h-full rounded-md sm:rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
                          <img
                            src={getAvatarUrl(member, index + 1)}
                            className="w-full h-full object-cover"
                            onError={() => handleImageError(member.id)}
                          />
                        </div>
                      </div>

                      {/* Indicateur de sélection */}
                      {selectedMember.id === member.id && (
                        <motion.div
                          layoutId="selectedIndicator"
                          className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-[8px] sm:text-xs"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          ✓
                        </motion.div>
                      )}
                    </div>

                    {/* Face arrière (stats au hover) */}
                    <div
                      className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-br p-2 flex items-center justify-center"
                      style={{
                        transform: 'rotateY(180deg)',
                        backfaceVisibility: 'hidden',
                        background: `linear-gradient(135deg, ${member.color} 0%, ${member.color}dd 100%)`,
                      }}
                    >
                      <div className="text-center text-white">
                        <div className="text-base sm:text-lg md:text-xl font-bold mb-1">
                          {Object.values(member.statsValues)[0]}
                        </div>
                        <div className="text-[8px] sm:text-[10px] opacity-90">
                          {t(Object.values(member.statsKeys)[0])}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Infos */}
                  <div className="text-center">
                    <h3 className={`font-bold font-display text-xs sm:text-sm mb-0.5 sm:mb-1 transition-colors ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {t(member.nameKey)}
                    </h3>
                    <p className="text-[8px] sm:text-xs text-green-500 mb-1 sm:mb-2">
                      {t(member.roleKey)}
                    </p>

                    {/* Tags d'expertise (simplifiés) */}
                    <div className="flex flex-wrap gap-0.5 justify-center">
                      {member.expertiseKeys.slice(0, 2).map((key) => (
                        <span
                          key={key}
                          className="px-1 py-0.5 text-[6px] sm:text-[8px] rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                        >
                          {t(key)}
                        </span>
                      ))}
                      {member.expertiseKeys.length > 2 && (
                        <span className="px-1 py-0.5 text-[6px] sm:text-[8px] rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                          +{member.expertiseKeys.length - 2}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Lien de connexion */}
                  <motion.div
                    animate={{
                      scale: hoveredId === member.id ? [1, 1.1, 1] : 1,
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2"
                  >
                    <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center ${
                      isDark ? 'bg-gray-700' : 'bg-gray-200'
                    }`}>
                      <i className="bx bx-link-alt text-[8px] sm:text-xs" />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Valeurs de l'équipe */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mt-8 sm:mt-12"
        >
          {TEAM_VALUES.map((stat, index) => (
            <motion.div
              key={stat.labelKey}
              whileHover={{ scale: 1.02, y: -3 }}
              whileTap={{ scale: 0.98 }}
              className={`relative p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl backdrop-blur-sm border text-center overflow-hidden ${
                isDark
                  ? 'bg-gray-800/50 border-gray-700'
                  : 'bg-white/50 border-gray-200'
              }`}
            >
              {/* Cercle animé en arrière-plan */}
              <motion.div
                className="absolute -right-5 -top-5 w-20 h-20 rounded-full opacity-20"
                style={{
                  background: `radial-gradient(circle, ${stat.color}, transparent)`,
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
                animate={{
                  y: [0, -3, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
              >
                <i className={`${stat.icon} text-lg sm:text-xl md:text-2xl mb-1`} style={{ color: stat.color }} />
              </motion.div>
              <div className="text-xs sm:text-sm font-bold mb-0.5">{stat.value}</div>
              <div className={`text-[8px] sm:text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {t(stat.labelKey)}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Section "Pourquoi nous choisir" */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="mt-8 sm:mt-12 p-6 sm:p-8 rounded-xl bg-gradient-to-r from-green-500/5 to-blue-500/5 border border-green-500/20"
        >
          <h3 className={`text-lg sm:text-xl font-bold text-center mb-6 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {t('team.whyUs', "Pourquoi notre équipe ?")}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {TEAM_REASONS.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 p-3 rounded-lg bg-white/5 backdrop-blur-sm"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-green-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                  <i className={`${item.icon} text-white text-sm`} />
                </div>
                <span className={`text-xs sm:text-sm ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {t(item.textKey)}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </AboutLayout>
  );
};

export default TeamPage;