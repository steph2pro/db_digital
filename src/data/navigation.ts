import { NavigationItem } from '../types';

export const navigation: NavigationItem[] = [
  {
    id: 'home',
    path: '/',
    label: 'home',
    icon: 'bx bx-home',
    type: 'internal'
  },
  {
    id: 'services',
    path: '/services',
    label: 'services',
    icon: 'bx bx-briefcase',
    type: 'internal',
  },
  {
    id: 'expertise',
    path: '/expertise',
    label: 'expertise',
    icon: 'bx bx-cube',
    type: 'internal',
    submenu: [
      {
        id: 'technologies',
        path: '/technologies',
        label: 'technologies',
        icon: 'bx bx-chip',
        type: 'internal'
      },
      {
        id: 'methodology',
        path: '/methodology',
        label: 'methodology',
        icon: 'bx bx-git-branch',
        type: 'internal'
      },
      {
        id: 'quality-commitment',
        path: '/quality',
        label: 'quality-commitment',
        icon: 'bx bx-check-shield',
        type: 'internal'
      }
    ]
  },
  {
    id: 'company',
    path: '/company',
    label: 'company',
    icon: 'bx bx-building',
    type: 'internal',
    submenu: [
      {
        id: 'about',
        path: '/about',
        label: 'about',
        icon: 'bx bx-user',
        type: 'internal'
      },
      {
        id: 'careers',
        path: '/careers',
        label: 'careers',
        icon: 'bx bx-briefcase-alt-2',
        type: 'internal'
      },
      {
        id: 'partners',
        path: '/partners',
        label: 'partners',
        icon: 'bx bx-handshake',
        type: 'internal'
      }
    ]
  },
  {
    id: 'contact',
    path: '/contact',
    label: 'contact',
    icon: 'bx bx-envelope',
    type: 'internal',
    submenu: [
      {
        id: 'get-quote',
        path: '/contact/quote',
        label: 'get-quote',
        icon: 'bx bx-calculator',
        type: 'internal'
      },
      {
        id: 'support',
        path: '/contact/support',
        label: 'support',
        icon: 'bx bx-support',
        type: 'internal'
      },
      {
        id: 'location',
        path: '/contact/location',
        label: 'location',
        icon: 'bx bx-map',
        type: 'internal'
      }
    ]
  }
];