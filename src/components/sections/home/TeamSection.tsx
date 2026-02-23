// src/components/sections/home/TeamSection.tsx
import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView, AnimatePresence, Variants } from "motion/react";
import { useTheme } from '../../../contexts/ThemeContext';

// Définition des types pour les membres de l'équipe
interface TeamMember {
  id: string;
  nameKey: string;
  roleKey: string;
  bioKey: string;
  expertiseKeys: string[];
  statsKeys: Record<string, string>;
  statsValues: Record<string, string>;
  avatar: string;
  social: Record<string, string>;
  gradient: string;
  color: string;
  isCEO?: boolean;
}

// Données de l'équipe avec avatars en ligne
const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'ceo',
    nameKey: 'team.members.ceo.name',
    roleKey: 'team.members.ceo.role',
    bioKey: 'team.members.ceo.bio',
    expertiseKeys: ['team.members.ceo.expertise.0', 'team.members.ceo.expertise.1', 'team.members.ceo.expertise.2'],
    statsKeys: {
      projets: 'team.members.ceo.stats.projets',
      clients: 'team.members.ceo.stats.clients',
      satisfaction: 'team.members.ceo.stats.satisfaction'
    },
    statsValues: { projets: '150+', clients: '80+', satisfaction: '100%' },
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    social: {
      linkedin: 'https://linkedin.com/in/thomas-anderson',
      twitter: 'https://twitter.com/thomas_anderson',
      github: 'https://github.com/thomas-anderson',
    },
    gradient: 'from-purple-500 to-pink-500',
    color: '#8B5CF6',
    isCEO: true,
  },
  {
    id: 'cto',
    nameKey: 'team.members.cto.name',
    roleKey: 'team.members.cto.role',
    bioKey: 'team.members.cto.bio',
    expertiseKeys: ['team.members.cto.expertise.0', 'team.members.cto.expertise.1', 'team.members.cto.expertise.2'],
    statsKeys: {
      projets: 'team.members.cto.stats.projets',
      uptime: 'team.members.cto.stats.uptime',
      pays: 'team.members.cto.stats.pays'
    },
    statsValues: { projets: '120+', uptime: '99.9%', pays: '3' },
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    social: {
      linkedin: 'https://linkedin.com/in/sarah-chen',
      twitter: 'https://twitter.com/sarah_chen',
      github: 'https://github.com/sarah-chen',
    },
    gradient: 'from-blue-500 to-cyan-500',
    color: '#3B82F6',
  },
  {
    id: 'lead-dev',
    nameKey: 'team.members.lead-dev.name',
    roleKey: 'team.members.lead-dev.role',
    bioKey: 'team.members.lead-dev.bio',
    expertiseKeys: ['team.members.lead-dev.expertise.0', 'team.members.lead-dev.expertise.1', 'team.members.lead-dev.expertise.2'],
    statsKeys: {
      projets: 'team.members.lead-dev.stats.projets',
      années: 'team.members.lead-dev.stats.années',
      librairies: 'team.members.lead-dev.stats.librairies'
    },
    statsValues: { projets: '80+', années: '8', librairies: '15+' },
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    social: {
      linkedin: 'https://linkedin.com/in/marc-dubois',
      twitter: 'https://twitter.com/marc_dubois',
      github: 'https://github.com/marc-dubois',
    },
    gradient: 'from-green-500 to-emerald-500',
    color: '#10B981',
  },
  {
    id: 'lead-designer',
    nameKey: 'team.members.lead-designer.name',
    roleKey: 'team.members.lead-designer.role',
    bioKey: 'team.members.lead-designer.bio',
    expertiseKeys: ['team.members.lead-designer.expertise.0', 'team.members.lead-designer.expertise.1', 'team.members.lead-designer.expertise.2'],
    statsKeys: {
      projets: 'team.members.lead-designer.stats.projets',
      prix: 'team.members.lead-designer.stats.prix',
      users: 'team.members.lead-designer.stats.users'
    },
    statsValues: { projets: '90+', prix: '5', users: '2M+' },
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    social: {
      linkedin: 'https://linkedin.com/in/emma-laurent',
      twitter: 'https://twitter.com/emma_laurent',
      behance: 'https://behance.net/emma-laurent',
    },
    gradient: 'from-orange-500 to-red-500',
    color: '#F59E0B',
  },
  {
    id: 'lead-mobile',
    nameKey: 'team.members.lead-mobile.name',
    roleKey: 'team.members.lead-mobile.role',
    bioKey: 'team.members.lead-mobile.bio',
    expertiseKeys: ['team.members.lead-mobile.expertise.0', 'team.members.lead-mobile.expertise.1', 'team.members.lead-mobile.expertise.2', 'team.members.lead-mobile.expertise.3'],
    statsKeys: {
      apps: 'team.members.lead-mobile.stats.apps',
      downloads: 'team.members.lead-mobile.stats.downloads',
      stores: 'team.members.lead-mobile.stats.stores'
    },
    statsValues: { apps: '30+', downloads: '500k+', stores: '2' },
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    social: {
      linkedin: 'https://linkedin.com/in/alex-rivera',
      twitter: 'https://twitter.com/alex_rivera',
      github: 'https://github.com/alex-rivera',
    },
    gradient: 'from-yellow-500 to-amber-500',
    color: '#EAB308',
  },
  {
    id: 'lead-seo',
    nameKey: 'team.members.lead-seo.name',
    roleKey: 'team.members.lead-seo.role',
    bioKey: 'team.members.lead-seo.bio',
    expertiseKeys: ['team.members.lead-seo.expertise.0', 'team.members.lead-seo.expertise.1', 'team.members.lead-seo.expertise.2', 'team.members.lead-seo.expertise.3'],
    statsKeys: {
      trafic: 'team.members.lead-seo.stats.trafic',
      clients: 'team.members.lead-seo.stats.clients',
      mots: 'team.members.lead-seo.stats.mots'
    },
    statsValues: { trafic: '+300%', clients: '50+', mots: '1M+' },
    avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
    social: {
      linkedin: 'https://linkedin.com/in/julie-moreau',
      twitter: 'https://twitter.com/julie_moreau',
    },
    gradient: 'from-indigo-500 to-purple-500',
    color: '#6366F1',
  },
];

// Fallback avatars en cas d'erreur de chargement
const FALLBACK_AVATARS = [
  'https://ui-avatars.com/api/?name=Thomas+Anderson&background=8B5CF6&color=fff&size=200',
  'https://ui-avatars.com/api/?name=Sarah+Chen&background=3B82F6&color=fff&size=200',
  'https://ui-avatars.com/api/?name=Marc+Dubois&background=10B981&color=fff&size=200',
  'https://ui-avatars.com/api/?name=Emma+Laurent&background=F59E0B&color=fff&size=200',
  'https://ui-avatars.com/api/?name=Alex+Rivera&background=EAB308&color=fff&size=200',
  'https://ui-avatars.com/api/?name=Julie+Moreau&background=6366F1&color=fff&size=200',
];

// Alternative avec DiceBear (plus stylisé)
const DICEBEAR_AVATARS = [
  'https://avatars.dicebear.com/api/avataaars/thomas-anderson.svg?backgroundColor=8B5CF6',
  'https://avatars.dicebear.com/api/avataaars/sarah-chen.svg?backgroundColor=3B82F6',
  'https://avatars.dicebear.com/api/avataaars/marc-dubois.svg?backgroundColor=10B981',
  'https://avatars.dicebear.com/api/avataaars/emma-laurent.svg?backgroundColor=F59E0B',
  'https://avatars.dicebear.com/api/avataaars/alex-rivera.svg?backgroundColor=EAB308',
  'https://avatars.dicebear.com/api/avataaars/julie-moreau.svg?backgroundColor=6366F1',
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

export const TeamSection: React.FC = () => {
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

  // Animation variants avec typage correct
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
        type: "spring", 
        stiffness: 100, 
        damping: 12 
      },
    },
  };

  const cardVariants: Variants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.02,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const particleVariants: Variants = {
    animate: (i: number) => ({
      x: [0, Math.cos(i * 30) * 80, 0],
      y: [0, Math.sin(i * 30) * 80, 0],
      scale: [0, 1, 0],
      opacity: [0, 0.3, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        delay: i * 0.1,
      },
    }),
  };

  const orbitVariants: Variants = {
    animate: (index: number) => ({
      rotate: 360,
      transition: {
        duration: 20 + index * 5,
        repeat: Infinity,
        ease: "linear",
      },
    }),
  };

  // Valeurs de l'équipe pour les statistiques
  const teamValues = [
    { icon: 'bx bx-brain', labelKey: 'team.values.expertise', value: '15+ ans', color: '#00e676' },
    { icon: 'bx bx-heart', labelKey: 'team.values.passion', value: '100%', color: '#00a8e8' },
    { icon: 'bx bx-group', labelKey: 'team.values.cohesion', value: '6 experts', color: '#8B5CF6' },
    { icon: 'bx bx-trophy', labelKey: 'team.values.excellence', value: '50+ prix', color: '#F59E0B' },
  ];

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden">
      {/* Arrière-plan animé */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 ${
          isDark 
            ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
            : 'bg-gradient-to-br from-gray-50 via-white to-gray-50'
        }`} />

        {/* Grille hexagonale */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5L55 20L55 40L30 55L5 40L5 20L30 5Z' stroke='${isDark ? '%2300e676' : '%2300b894'}' fill='none' stroke-width='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: '80px 80px',
          }} />
        </div>

        {/* Cercles lumineux en orbite */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`orbit-${i}`}
            className="absolute top-1/2 left-1/2"
            style={{ 
              width: 400 + i * 200, 
              height: 400 + i * 200, 
              marginLeft: -(200 + i * 100), 
              marginTop: -(200 + i * 100) 
            }}
            variants={orbitVariants}
            animate="animate"
            custom={i}
          >
            <motion.div
              className="absolute top-0 left-1/2 w-2 h-2 rounded-full"
              style={{
                background: i === 0 ? '#00e676' : i === 1 ? '#00a8e8' : '#8B5CF6',
                boxShadow: `0 0 20px ${i === 0 ? '#00e676' : i === 1 ? '#00a8e8' : '#8B5CF6'}`,
              }}
            />
          </motion.div>
        ))}
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête avec bouton de bascule d'avatar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Eyebrow center>
            {t('team.eyebrow')}
          </Eyebrow>
          <SectionTitle center>
            {t('team.title')}
          </SectionTitle>
          <p className="text-base leading-relaxed text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('team.subtitle')}
          </p>
          
          {/* Bouton pour changer le style d'avatar */}
          <motion.button
            onClick={toggleAvatarStyle}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-green-500 to-blue-600 text-white hover:shadow-lg transition-all duration-300"
          >
            {t('team.avatarStyle.switch')} : {useDiceBear ? t('team.avatarStyle.illustration') : t('team.avatarStyle.real')}
          </motion.button>
        </motion.div>

        {/* Membre sélectionné (CEO en focus) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-16"
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
              {/* Effet de halo */}
              <motion.div
                className="absolute inset-0 rounded-3xl"
                animate={{
                  boxShadow: [
                    `0 0 50px ${selectedMember.color}40`,
                    `0 0 80px ${selectedMember.color}60`,
                    `0 0 50px ${selectedMember.color}40`,
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              />

              {/* Carte principale */}
              <div className={`relative rounded-3xl overflow-hidden backdrop-blur-xl border ${
                isDark 
                  ? 'bg-gray-800/70 border-gray-700' 
                  : 'bg-white/70 border-gray-200'
              }`}>
                {/* Grille d'arrière-plan */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `linear-gradient(${selectedMember.color} 1px, transparent 1px), linear-gradient(90deg, ${selectedMember.color} 1px, transparent 1px)`,
                    backgroundSize: '30px 30px',
                  }} />
                </div>

                {/* Particules autour du CEO */}
                {selectedMember.isCEO && [...Array(12)].map((_, i) => (
                  <motion.div
                    key={`particle-${i}`}
                    className="absolute w-1 h-1 rounded-full"
                    style={{
                      background: selectedMember.color,
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    variants={particleVariants}
                    animate="animate"
                    custom={i}
                  />
                ))}

                <div className="relative p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center">
                  {/* Avatar avec couronne pour CEO */}
                  <div className="relative flex-shrink-0">
                    {selectedMember.isCEO && (
                      <motion.div
                        animate={{
                          y: [0, -10, 0],
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                        }}
                        className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-4xl z-20"
                      >
                        👑
                      </motion.div>
                    )}

                    <motion.div
                      whileHover={{ scale: 1.05, rotate: 2 }}
                      className="relative"
                    >
                      <div className={`w-48 h-48 rounded-3xl bg-gradient-to-br ${selectedMember.gradient} p-1`}>
                        <div className="w-full h-full rounded-2xl overflow-hidden bg-gray-200 dark:bg-gray-700">
                          <img
                            src={getAvatarUrl(selectedMember, TEAM_MEMBERS.indexOf(selectedMember))}
                            alt={t(selectedMember.nameKey)}
                            className="w-full h-full object-cover"
                            onError={() => handleImageError(selectedMember.id)}
                          />
                        </div>
                      </div>

                      {/* Anneau rotatif */}
                      <motion.div
                        className="absolute -inset-2 rounded-[2rem] border-2 border-dashed"
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
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                        className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
                      >
                        <span className={`px-4 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${selectedMember.gradient} text-white shadow-lg`}>
                          {t(selectedMember.roleKey)}
                        </span>
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Informations */}
                  <div className="flex-1 text-center md:text-left">
                    <motion.h3
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className={`text-3xl md:text-4xl font-bold font-display mb-2 ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {t(selectedMember.nameKey)}
                    </motion.h3>

                    <motion.p
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-green-500 mb-4"
                    >
                      {t(selectedMember.roleKey)}
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className={`text-base leading-relaxed mb-6 ${
                        isDark ? 'text-gray-300' : 'text-gray-600'
                      }`}
                    >
                      {t(selectedMember.bioKey)}
                    </motion.p>

                    {/* Tags d'expertise */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="flex flex-wrap gap-2 mb-6 justify-center md:justify-start"
                    >
                      {selectedMember.expertiseKeys.map((key, index) => (
                        <motion.span
                          key={key}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.6 + index * 0.1 }}
                          whileHover={{ scale: 1.1 }}
                          className={`px-3 py-1 text-xs font-bold rounded-full border ${
                            isDark
                              ? 'bg-gray-700 border-gray-600 text-white'
                              : 'bg-gray-200 border-gray-300 text-gray-700'
                          }`}
                        >
                          {t(key)}
                        </motion.span>
                      ))}
                    </motion.div>

                    {/* Statistiques */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      className="flex gap-8 justify-center md:justify-start"
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
                            <div className="text-2xl font-bold" style={{ color: selectedMember.color }}>
                              {value}
                            </div>
                            <div className={`text-xs uppercase tracking-wider ${
                              isDark ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                              {statKey ? t(statKey) : key}
                            </div>
                          </motion.div>
                        );
                      })}
                    </motion.div>

                    {/* Réseaux sociaux */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      className="flex gap-3 mt-6 justify-center md:justify-start"
                    >
                      {Object.entries(selectedMember.social).map(([network, url], index) => (
                        <motion.a
                          key={network}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.2, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                            isDark
                              ? 'bg-gray-700 hover:bg-gray-600'
                              : 'bg-gray-200 hover:bg-gray-300'
                          }`}
                          aria-label={t(`team.social.${network}`)}
                        >
                          <i className={`bx bxl-${network} text-xl`} style={{ color: selectedMember.color }} />
                        </motion.a>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Grille des membres */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
        >
          {TEAM_MEMBERS.filter(m => !m.isCEO).map((member, index) => (
            <motion.div
              key={member.id}
              variants={itemVariants}
              onHoverStart={() => setHoveredId(member.id)}
              onHoverEnd={() => setHoveredId(null)}
              onClick={() => {
                setSelectedMember(member);
              }}
              className="group relative cursor-pointer"
            >
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                className={`relative rounded-2xl overflow-hidden backdrop-blur-sm border ${
                  selectedMember.id === member.id
                    ? `border-2 border-green-500`
                    : isDark
                      ? 'bg-gray-800/30 border-gray-700'
                      : 'bg-white/30 border-gray-200'
                }`}
              >
                {/* Effet de glow */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${member.color}20, transparent 70%)`,
                  }}
                />

                <div className="relative p-4">
                  {/* Avatar avec effet 3D */}
                  <motion.div
                    animate={{
                      rotateY: hoveredId === member.id ? 180 : 0,
                    }}
                    transition={{ duration: 0.6 }}
                    className="relative mb-4"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Face avant */}
                    <div className="relative" style={{ backfaceVisibility: 'hidden' }}>
                      <div className={`w-full aspect-square rounded-xl bg-gradient-to-br ${member.gradient} p-1`}>
                        <div className="w-full h-full rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
                          <img
                            src={getAvatarUrl(member, index + 1)}
                            alt={t(member.nameKey)}
                            className="w-full h-full object-cover"
                            onError={() => handleImageError(member.id)}
                          />
                        </div>
                      </div>

                      {/* Indicateur de sélection */}
                      {selectedMember.id === member.id && (
                        <motion.div
                          layoutId="selectedIndicator"
                          className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          aria-label={t('team.badges.selected')}
                        >
                          ✓
                        </motion.div>
                      )}
                    </div>

                    {/* Face arrière (stats au hover) */}
                    <div
                      className="absolute inset-0 rounded-xl bg-gradient-to-br p-4 flex items-center justify-center"
                      style={{
                        transform: 'rotateY(180deg)',
                        backfaceVisibility: 'hidden',
                        background: `linear-gradient(135deg, ${member.color} 0%, ${member.color}dd 100%)`,
                      }}
                    >
                      <div className="text-center text-white">
                        <div className="text-2xl font-bold mb-2">
                          {Object.values(member.statsValues)[0]}
                        </div>
                        <div className="text-xs opacity-90">
                          {t(Object.values(member.statsKeys)[0])}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Infos */}
                  <div className="text-center">
                    <h3 className={`font-bold font-display mb-1 transition-colors ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {t(member.nameKey)}
                    </h3>
                    <p className="text-xs text-green-500 mb-2">
                      {t(member.roleKey)}
                    </p>

                    {/* Tags d'expertise (simplifiés) */}
                    <div className="flex flex-wrap gap-1 justify-center">
                      {member.expertiseKeys.slice(0, 2).map((key) => (
                        <span
                          key={key}
                          className="px-2 py-0.5 text-[10px] rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                        >
                          {t(key)}
                        </span>
                      ))}
                      {member.expertiseKeys.length > 2 && (
                        <span className="px-2 py-0.5 text-[10px] rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                          {t('team.badges.more', { count: member.expertiseKeys.length - 2 })}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Lien de connexion */}
                  <motion.div
                    animate={{
                      scale: hoveredId === member.id ? [1, 1.2, 1] : 1,
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-2 right-2"
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      isDark ? 'bg-gray-700' : 'bg-gray-200'
                    }`}>
                      <i className="bx bx-link-alt text-xs" />
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Ligne de connexion au CEO (effet réseau) */}
              {hoveredId === member.id && (
                <motion.div
                  initial={{ opacity: 0, pathLength: 0 }}
                  animate={{ opacity: 1, pathLength: 1 }}
                  exit={{ opacity: 0, pathLength: 0 }}
                  className="absolute top-1/2 left-1/2 pointer-events-none"
                  style={{ zIndex: -1 }}
                >
                  <svg width="200" height="200" className="absolute transform -translate-x-1/2 -translate-y-1/2">
                    <motion.line
                      x1="0"
                      y1="0"
                      x2="200"
                      y2="200"
                      stroke={member.color}
                      strokeWidth="1"
                      strokeDasharray="5,5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                  </svg>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Valeurs de l'équipe */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
        >
          {teamValues.map((stat, index) => (
            <motion.div
              key={stat.labelKey}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`relative p-4 rounded-xl backdrop-blur-sm border text-center ${
                isDark
                  ? 'bg-gray-800/30 border-gray-700'
                  : 'bg-white/30 border-gray-200'
              }`}
            >
              <motion.div
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
              >
                <i className={`${stat.icon} text-2xl mb-2`} style={{ color: stat.color }} />
              </motion.div>
              <div className="text-sm font-bold mb-1">{stat.value}</div>
              <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {t(stat.labelKey)}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Éléments décoratifs */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`float-${i}`}
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: `hsl(${i * 18}, 70%, 50%)`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0, 0.2, 0],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}
    </section>
  );
};

export default TeamSection;