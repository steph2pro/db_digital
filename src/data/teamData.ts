// Types pour les membres de l'équipe
export interface TeamMember {
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
export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'ceo',
    nameKey: 'team.members.ceo.name',
    roleKey: 'team.members.ceo.role',
    bioKey: 'team.members.ceo.bio',
    expertiseKeys: [
      'team.members.ceo.expertise.0',
      'team.members.ceo.expertise.1',
      'team.members.ceo.expertise.2'
    ],
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
    expertiseKeys: [
      'team.members.cto.expertise.0',
      'team.members.cto.expertise.1',
      'team.members.cto.expertise.2'
    ],
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
    expertiseKeys: [
      'team.members.lead-dev.expertise.0',
      'team.members.lead-dev.expertise.1',
      'team.members.lead-dev.expertise.2'
    ],
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
    expertiseKeys: [
      'team.members.lead-designer.expertise.0',
      'team.members.lead-designer.expertise.1',
      'team.members.lead-designer.expertise.2'
    ],
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
    expertiseKeys: [
      'team.members.lead-mobile.expertise.0',
      'team.members.lead-mobile.expertise.1',
      'team.members.lead-mobile.expertise.2',
      'team.members.lead-mobile.expertise.3'
    ],
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
    expertiseKeys: [
      'team.members.lead-seo.expertise.0',
      'team.members.lead-seo.expertise.1',
      'team.members.lead-seo.expertise.2',
      'team.members.lead-seo.expertise.3'
    ],
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
export const FALLBACK_AVATARS: string[] = [
  'https://ui-avatars.com/api/?name=Thomas+Anderson&background=8B5CF6&color=fff&size=200',
  'https://ui-avatars.com/api/?name=Sarah+Chen&background=3B82F6&color=fff&size=200',
  'https://ui-avatars.com/api/?name=Marc+Dubois&background=10B981&color=fff&size=200',
  'https://ui-avatars.com/api/?name=Emma+Laurent&background=F59E0B&color=fff&size=200',
  'https://ui-avatars.com/api/?name=Alex+Rivera&background=EAB308&color=fff&size=200',
  'https://ui-avatars.com/api/?name=Julie+Moreau&background=6366F1&color=fff&size=200',
];

// Alternative avec DiceBear (plus stylisé)
export const DICEBEAR_AVATARS: string[] = [
  'https://avatars.dicebear.com/api/avataaars/thomas-anderson.svg?backgroundColor=8B5CF6',
  'https://avatars.dicebear.com/api/avataaars/sarah-chen.svg?backgroundColor=3B82F6',
  'https://avatars.dicebear.com/api/avataaars/marc-dubois.svg?backgroundColor=10B981',
  'https://avatars.dicebear.com/api/avataaars/emma-laurent.svg?backgroundColor=F59E0B',
  'https://avatars.dicebear.com/api/avataaars/alex-rivera.svg?backgroundColor=EAB308',
  'https://avatars.dicebear.com/api/avataaars/julie-moreau.svg?backgroundColor=6366F1',
];

// Valeurs de l'équipe pour les statistiques
export interface TeamValue {
  icon: string;
  labelKey: string;
  value: string;
  color: string;
}

export const TEAM_VALUES: TeamValue[] = [
  { icon: 'bx bx-brain', labelKey: 'team.values.expertise', value: '15+ ans', color: '#00e676' },
  { icon: 'bx bx-heart', labelKey: 'team.values.passion', value: '100%', color: '#00a8e8' },
  { icon: 'bx bx-group', labelKey: 'team.values.cohesion', value: '6 experts', color: '#8B5CF6' },
  { icon: 'bx bx-trophy', labelKey: 'team.values.excellence', value: '50+ prix', color: '#F59E0B' },
];

// Raisons de choisir l'équipe
export interface TeamReason {
  icon: string;
  textKey: string;
}

export const TEAM_REASONS: TeamReason[] = [
  { icon: 'bx bx-check-shield', textKey: 'team.reasons.expertise' },
  { icon: 'bx bx-heart', textKey: 'team.reasons.passion' },
  { icon: 'bx bx-line-chart', textKey: 'team.reasons.results' }
];