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
    // submenu: [
    //   {
    //     id: 'web-development',
    //     path: '/services/web-development',
    //     label: 'web-development', // clé de traduction
    //     icon: 'bx bx-code-alt',
    //     type: 'internal',
    //   },
    //   {
    //     id: 'mobile-development',
    //     path: '/services/mobile-development',
    //     label: 'mobile-development', // clé de traduction
    //     icon: 'bx bx-mobile-alt',
    //     type: 'internal',
    //   },
    //   {
    //     id: 'ui-ux-design',
    //     path: '/services/ui-ux-design',
    //     label: 'ui-ux-design', // clé de traduction
    //     icon: 'bx bx-palette',
    //     type: 'internal',
    //   },
    //   {
    //     id: 'seo-performance',
    //     path: '/services/seo-performance',
    //     label: 'seo-performance', // clé de traduction
    //     icon: 'bx bx-line-chart',
    //     type: 'internal',
    //   },
    //   {
    //     id: 'consulting',
    //     path: '/services/consulting',
    //     label: 'consulting', // clé de traduction
    //     icon: 'bx bx-chalkboard',
    //     type: 'internal',
    //   }
    // ]
  },
  // {
  //   id: 'projects',
  //   path: '/projects',
  //   label: 'projects', // clé de traduction
  //   icon: 'bx bx-folder',
  //   type: 'internal',
  //   submenu: [
  //     {
  //       id: 'featured-projects',
  //       path: '/projects/featured',
  //       label: 'featured-projects', // clé de traduction
  //       icon: 'bx bx-star',
  //       type: 'internal'
  //     },
  //     {
  //       id: 'web-projects',
  //       path: '/projects/web',
  //       label: 'web-projects', // clé de traduction
  //       icon: 'bx bx-globe',
  //       type: 'internal'
  //     },
  //     {
  //       id: 'ecommerce-projects',
  //       path: '/projects/ecommerce',
  //       label: 'ecommerce-projects', // clé de traduction
  //       icon: 'bx bx-cart',
  //       type: 'internal'
  //     },
  //     {
  //       id: 'mobile-projects',
  //       path: '/projects/mobile',
  //       label: 'mobile-projects', // clé de traduction
  //       icon: 'bx bx-mobile',
  //       type: 'internal'
  //     },
  //     {
  //       id: 'case-studies',
  //       path: '/case-studies',
  //       label: 'case-studies', // clé de traduction
  //       icon: 'bx bx-file',
  //       type: 'internal'
  //     }
  //   ]
  // },
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
        path: '/blog/tech',
        label: 'tech-articles', // clé de traduction
        icon: 'bx bx-code',
        type: 'internal'
      },
      {
        id: 'industry-news',
        path: '/blog/news',
        label: 'industry-news', // clé de traduction
        icon: 'bx bx-trending-up',
        type: 'internal'
      },
      {
        id: 'tutorials',
        path: '/blog/tutorials',
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
        id: 'careers',
        path: '/careers',
        label: 'careers', // clé de traduction
        icon: 'bx bx-briefcase-alt-2',
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