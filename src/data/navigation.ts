import { NavigationItem } from '../types';

export const navigation: NavigationItem[] = [
  {
    id: 'home',
    path: '/',
    label: { fr: 'Accueil', en: 'Home' },
    icon: 'bx bx-home',
    type: 'internal'
  },
  {
    id: 'projects',
    path: '/projects',
    label: { fr: 'Projets', en: 'Projects' },
    icon: 'bx bx-folder',
    type: 'internal',
    submenu: [
      {
        id: 'web-projects',
        path: '/projects/web',
        label: { fr: 'Projets Web', en: 'Web Projects' },
        icon: 'bx bx-globe',
        type: 'internal'
      },
      {
        id: 'mobile-projects',
        path: '/projects/mobile',
        label: { fr: 'Projets Mobile', en: 'Mobile Projects' },
        icon: 'bx bx-mobile',
        type: 'internal'
      },
      {
        id: 'backend-projects',
        path: '/projects/backend',
        label: { fr: 'Projets Backend', en: 'Backend Projects' },
        icon: 'bx bx-server',
        type: 'internal'
      },
      {
        id: 'fullstack-projects',
        path: '/projects/fullstack',
        label: { fr: 'Projets Fullstack', en: 'Fullstack Projects' },
        icon: 'bx bx-layout',
        type: 'internal'
      }
    ]
  },
  {
    id: 'blog',
    path: '/blog',
    label: { fr: 'Blog', en: 'Blog' },
    icon: 'bx bx-news',
    type: 'internal'
  },
  {
  id: 'trainings',
  path: '/trainings',
  label: { fr: 'Formations', en: 'Trainings' },
  icon: 'bx bx-book-open', // Icône représentant la formation / apprentissage
  type: 'internal'
},
  {
    id: 'about',
    path: '/about',
    label: { fr: 'À Propos', en: 'About' },
    icon: 'bx bx-user',
    type: 'internal'
  },
  {
    id: 'contact',
    path: '/contact',
    label: { fr: 'Contact', en: 'Contact' },
    icon: 'bx bx-envelope',
    type: 'internal'
  }
];