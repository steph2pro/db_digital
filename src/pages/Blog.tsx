import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { BlogPost } from '../types';
import { blogPosts } from '../data/blogPosts';

export const Blog: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const currentLanguage = i18n.language as 'fr' | 'en';

  // Extraire les catégories uniques des articles
  const categories = ['all', ...Array.from(new Set(blogPosts.map(post => post.category)))];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title[currentLanguage].toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt[currentLanguage].toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Trouver l'article featured le plus récent
  const featuredPost = blogPosts
    .filter(post => post.featured)
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())[0];

  return (
    <div className="min-h-screen py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-title text-secondary dark:text-white mb-4">
            {t('blog.title')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('blog.description')}
          </p>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div className="bg-white dark:bg-gray-900 rounded-custom shadow-custom overflow-hidden mb-12">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative h-64 md:h-full">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title[currentLanguage]}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                    {t('blog.featured')}
                  </span>
                </div>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="bg-primary-light text-primary-dark px-3 py-1 rounded-full text-sm font-medium">
                    {featuredPost.category}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    {new Date(featuredPost.publishDate).toLocaleDateString(currentLanguage === 'fr' ? 'fr-FR' : 'en-US')}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    {featuredPost.readTime} {t('blog.minRead')}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold font-title text-secondary dark:text-white mb-4">
                  {featuredPost.title[currentLanguage]}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {featuredPost.excerpt[currentLanguage]}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">SK</span>
                    </div>
                    <div>
                      <p className="font-medium text-secondary dark:text-white">{featuredPost.author}</p>
                    </div>
                  </div>
                  <Link
                    to={`/blog/${featuredPost.id}`}
                    className="flex items-center space-x-2 text-primary hover:text-primary-dark transition-colors"
                  >
                    <span>{t('blog.readMore')}</span>
                    <i className="bx bx-chevron-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <i className="bx bx-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                placeholder={t('blog.searchPlaceholder') || ''}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-custom focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex space-x-2 overflow-x-auto">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {category === 'all' ? t('blog.categories.all') : category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white dark:bg-gray-900 rounded-custom shadow-custom overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-48">
                <img
                  src={post.image}
                  alt={post.title[currentLanguage]}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary-light text-primary-dark px-3 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-3">
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    {new Date(post.publishDate).toLocaleDateString(currentLanguage === 'fr' ? 'fr-FR' : 'en-US')}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    {post.readTime} {t('blog.minRead')}
                  </span>
                </div>
                <h3 className="text-xl font-semibold font-title text-secondary dark:text-white mb-3">
                  {post.title[currentLanguage]}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {post.excerpt[currentLanguage]}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 3).map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <Link
                  to={`/blog/${post.id}`}
                  className="flex items-center space-x-2 text-primary hover:text-primary-dark transition-colors font-medium"
                >
                  <span>{t('blog.readMore')}</span>
                  <i className="bx bx-chevron-right"></i>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <i className="bx bx-news text-6xl text-gray-400 mb-4"></i>
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              {t('blog.noPosts')}
            </p>
          </div>
        )}

        {/* Newsletter Subscription */}
        <div className="bg-primary-light rounded-custom p-8 mt-12 text-center">
          <h3 className="text-2xl font-bold font-title text-secondary dark:text-white mb-4">
            {t('blog.newsletter.title')}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            {t('blog.newsletter.description')}
          </p>
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder={t('blog.newsletter.placeholder') || ''}
              className="flex-1 px-4 py-3 rounded-l-custom border border-r-0 border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="bg-primary text-white px-6 py-3 rounded-r-custom hover:bg-primary-dark transition-colors">
              {t('blog.newsletter.subscribe')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


// import React, { useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import { Link } from 'react-router-dom';
// import { BlogPost } from '../types';

// // Données temporaires pour le blog
// const blogPosts: BlogPost[] = [
//   {
//     id: 'react-best-practices-2024',
//     title: {
//       fr: "Meilleures pratiques React en 2024",
//       en: "React Best Practices in 2024"
//     },
//     excerpt: {
//       fr: "Découvrez les meilleures pratiques et patterns React pour développer des applications modernes et performantes.",
//       en: "Discover React best practices and patterns for developing modern and performant applications."
//     },
//     content: {
//       fr: "Contenu complet de l'article sur les meilleures pratiques React...",
//       en: "Full content of the article about React best practices..."
//     },
//     author: "Stéphane Kamga",
//     publishDate: "2024-01-15",
//     category: "React",
//     tags: ["React", "TypeScript", "Best Practices"],
//     image: "/assets/img/blog/react-best-practices.jpg",
//     readTime: 8,
//     featured: true
//   },
//   {
//     id: 'tailwind-css-advanced',
//     title: {
//       fr: "Techniques avancées avec Tailwind CSS",
//       en: "Advanced Techniques with Tailwind CSS"
//     },
//     excerpt: {
//       fr: "Maîtrisez les techniques avancées de Tailwind CSS pour créer des designs complexes et responsive.",
//       en: "Master advanced Tailwind CSS techniques to create complex and responsive designs."
//     },
//     content: {
//       fr: "Contenu complet sur les techniques avancées Tailwind CSS...",
//       en: "Full content about advanced Tailwind CSS techniques..."
//     },
//     author: "Stéphane Kamga",
//     publishDate: "2024-01-10",
//     category: "CSS",
//     tags: ["Tailwind", "CSS", "Design"],
//     image: "/assets/img/blog/tailwind-advanced.jpg",
//     readTime: 6,
//     featured: true
//   },
//   // Ajouter d'autres articles...
// ];

// export const Blog: React.FC = () => {
//   const { t, i18n } = useTranslation();
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [searchQuery, setSearchQuery] = useState('');

//   const currentLanguage = i18n.language as 'fr' | 'en';

//   const categories = ['all', 'React', 'TypeScript', 'CSS', 'Node.js', 'Mobile', 'Architecture'];

//   const filteredPosts = blogPosts.filter(post => {
//     const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
//     const matchesSearch = post.title[currentLanguage].toLowerCase().includes(searchQuery.toLowerCase()) ||
//                          post.excerpt[currentLanguage].toLowerCase().includes(searchQuery.toLowerCase()) ||
//                          post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
//     return matchesCategory && matchesSearch;
//   });

//   const featuredPost = blogPosts.find(post => post.featured);

//   return (
//     <div className="min-h-screen py-20 bg-gray-50 dark:bg-gray-800">
//       <div className="container mx-auto px-6">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl md:text-5xl font-bold font-title text-secondary dark:text-white mb-4">
//             {t('blog.title')}
//           </h1>
//           <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
//             {t('blog.description')}
//           </p>
//         </div>

//         {/* Featured Post */}
//         {featuredPost && (
//           <div className="bg-white dark:bg-gray-900 rounded-custom shadow-custom overflow-hidden mb-12">
//             <div className="grid md:grid-cols-2 gap-8">
//               <div className="relative h-64 md:h-full">
//                 <img
//                   src={featuredPost.image}
//                   alt={featuredPost.title[currentLanguage]}
//                   className="w-full h-full object-cover"
//                 />
//                 <div className="absolute top-4 left-4">
//                   <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
//                     {t('blog.featured')}
//                   </span>
//                 </div>
//               </div>
//               <div className="p-8 flex flex-col justify-center">
//                 <div className="flex items-center space-x-4 mb-4">
//                   <span className="bg-primary-light text-primary-dark px-3 py-1 rounded-full text-sm font-medium">
//                     {featuredPost.category}
//                   </span>
//                   <span className="text-gray-500 dark:text-gray-400 text-sm">
//                     {new Date(featuredPost.publishDate).toLocaleDateString(currentLanguage === 'fr' ? 'fr-FR' : 'en-US')}
//                   </span>
//                   <span className="text-gray-500 dark:text-gray-400 text-sm">
//                     {featuredPost.readTime} {t('blog.minRead')}
//                   </span>
//                 </div>
//                 <h2 className="text-2xl md:text-3xl font-bold font-title text-secondary dark:text-white mb-4">
//                   {featuredPost.title[currentLanguage]}
//                 </h2>
//                 <p className="text-gray-600 dark:text-gray-300 mb-6">
//                   {featuredPost.excerpt[currentLanguage]}
//                 </p>
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-3">
//                     <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
//                       <span className="text-white font-bold text-sm">SK</span>
//                     </div>
//                     <div>
//                       <p className="font-medium text-secondary dark:text-white">{featuredPost.author}</p>
//                     </div>
//                   </div>
//                   <Link
//                     to={`/blog/${featuredPost.id}`}
//                     className="flex items-center space-x-2 text-primary hover:text-primary-dark transition-colors"
//                   >
//                     <span>{t('blog.readMore')}</span>
//                     <i className="bx bx-chevron-right"></i>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Filters */}
//         <div className="flex flex-col md:flex-row gap-4 mb-8">
//           <div className="flex-1">
//             <div className="relative">
//               <i className="bx bx-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
//               <input
//                 type="text"
//                 placeholder={t('blog.searchPlaceholder') || ''}
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-custom focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//               />
//             </div>
//           </div>
//           <div className="flex space-x-2 overflow-x-auto">
//             {categories.map(category => (
//               <button
//                 key={category}
//                 onClick={() => setSelectedCategory(category)}
//                 className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
//                   selectedCategory === category
//                     ? 'bg-primary text-white'
//                     : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
//                 }`}
//               >
//                 {category === 'all' ? t('blog.categories.all') : category}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Blog Posts Grid */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {filteredPosts.map((post) => (
//             <article
//               key={post.id}
//               className="bg-white dark:bg-gray-900 rounded-custom shadow-custom overflow-hidden hover:shadow-lg transition-shadow duration-300"
//             >
//               <div className="relative h-48">
//                 <img
//                   src={post.image}
//                   alt={post.title[currentLanguage]}
//                   className="w-full h-full object-cover"
//                 />
//                 <div className="absolute top-4 left-4">
//                   <span className="bg-primary-light text-primary-dark px-3 py-1 rounded-full text-sm font-medium">
//                     {post.category}
//                   </span>
//                 </div>
//               </div>
//               <div className="p-6">
//                 <div className="flex items-center space-x-4 mb-3">
//                   <span className="text-gray-500 dark:text-gray-400 text-sm">
//                     {new Date(post.publishDate).toLocaleDateString(currentLanguage === 'fr' ? 'fr-FR' : 'en-US')}
//                   </span>
//                   <span className="text-gray-500 dark:text-gray-400 text-sm">
//                     {post.readTime} {t('blog.minRead')}
//                   </span>
//                 </div>
//                 <h3 className="text-xl font-semibold font-title text-secondary dark:text-white mb-3">
//                   {post.title[currentLanguage]}
//                 </h3>
//                 <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
//                   {post.excerpt[currentLanguage]}
//                 </p>
//                 <div className="flex flex-wrap gap-2 mb-4">
//                   {post.tags.slice(0, 3).map(tag => (
//                     <span
//                       key={tag}
//                       className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded text-xs"
//                     >
//                       #{tag}
//                     </span>
//                   ))}
//                 </div>
//                 <Link
//                   to={`/blog/${post.id}`}
//                   className="flex items-center space-x-2 text-primary hover:text-primary-dark transition-colors font-medium"
//                 >
//                   <span>{t('blog.readMore')}</span>
//                   <i className="bx bx-chevron-right"></i>
//                 </Link>
//               </div>
//             </article>
//           ))}
//         </div>

//         {filteredPosts.length === 0 && (
//           <div className="text-center py-12">
//             <i className="bx bx-news text-6xl text-gray-400 mb-4"></i>
//             <p className="text-gray-500 dark:text-gray-400 text-lg">
//               {t('blog.noPosts')}
//             </p>
//           </div>
//         )}

//         {/* Newsletter Subscription */}
//         <div className="bg-primary-light rounded-custom p-8 mt-12 text-center">
//           <h3 className="text-2xl font-bold font-title text-secondary dark:text-white mb-4">
//             {t('blog.newsletter.title')}
//           </h3>
//           <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
//             {t('blog.newsletter.description')}
//           </p>
//           <div className="flex max-w-md mx-auto">
//             <input
//               type="email"
//               placeholder={t('blog.newsletter.placeholder') || ''}
//               className="flex-1 px-4 py-3 rounded-l-custom border border-r-0 border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
//             />
//             <button className="bg-primary text-white px-6 py-3 rounded-r-custom hover:bg-primary-dark transition-colors">
//               {t('blog.newsletter.subscribe')}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };