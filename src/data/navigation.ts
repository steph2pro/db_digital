import { NavigationItem } from '../types';

export const navigation: NavigationItem[] = [
  {
    id: 'home',
    path: '/',
    label: 'home', // clé de traduction
    icon: 'bx bx-home',
    type: 'internal'
  },
  {
    id: 'services',
    path: '/services',
    label: 'services', // clé de traduction
    icon: 'bx bx-briefcase',
    type: 'internal',
  },
  {
    id: 'expertise',
    path: '/expertise',
    label: 'expertise', // clé de traduction
    icon: 'bx bx-cube',
    type: 'internal',
    submenu: [
      {
        id: 'technologies',
        path: '/technologies',
        label: 'technologies', // clé de traduction
        icon: 'bx bx-chip',
        type: 'internal'
      },
      {
        id: 'methodology',
        path: '/methodology',
        label: 'methodology', // clé de traduction
        icon: 'bx bx-git-branch',
        type: 'internal'
      },
      {
        id: 'quality-commitment',
        path: '/quality',
        label: 'quality-commitment', // clé de traduction
        icon: 'bx bx-check-shield',
        type: 'internal'
      }
    ]
  },
  {
    id: 'blog',
    path: '/blog',
    label: 'blog', // clé de traduction
    icon: 'bx bx-news',
    type: 'internal',
    submenu: [
      {
        id: 'tech-articles',
        path: '/blog',
        label: 'tech-articles', // clé de traduction
        icon: 'bx bx-code',
        type: 'internal'
      },
      {
        id: 'industry-news',
        path: '/blog',
        label: 'industry-news', // clé de traduction
        icon: 'bx bx-trending-up',
        type: 'internal'
      },
      {
        id: 'tutorials',
        path: '/blog',
        label: 'tutorials', // clé de traduction
        icon: 'bx bx-video',
        type: 'internal'
      }
    ]
  },
  {
    id: 'company',
    path: '/company',
    label: 'company', // clé de traduction
    icon: 'bx bx-building',
    type: 'internal',
    submenu: [
      {
        id: 'about',
        path: '/about',
        label: 'about', // clé de traduction
        icon: 'bx bx-user',
        type: 'internal'
      },
      {
        id: 'team',
        path: '/team',
        label: 'team', // clé de traduction
        icon: 'bx bx-group',
        type: 'internal'
      },
      {
        id: 'partners',
        path: '/partners',
        label: 'partners', // clé de traduction
        icon: 'bx bx-handshake',
        type: 'internal'
      }
    ]
  },
  {
    id: 'contact',
    path: '/contact',
    label: 'contact', // clé de traduction
    icon: 'bx bx-envelope',
    type: 'internal',
    submenu: [
      {
        id: 'get-quote',
        path: '/contact/quote',
        label: 'get-quote', // clé de traduction
        icon: 'bx bx-calculator',
        type: 'internal'
      },
      {
        id: 'support',
        path: '/contact/support',
        label: 'support', // clé de traduction
        icon: 'bx bx-support',
        type: 'internal'
      },
      {
        id: 'location',
        path: '/contact/location',
        label: 'location', // clé de traduction
        icon: 'bx bx-map',
        type: 'internal'
      }
    ]
  }
];