
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { blogPosts } from '../data/blogPosts';

export const BlogPost: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const post = blogPosts.find(p => p.id === postId);
  const currentLanguage = i18n.language as 'fr' | 'en';

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-600 dark:text-gray-400 mb-4">
            {t('blog.postNotFound')}
          </h2>
          <button
            onClick={() => navigate('/blog')}
            className="bg-primary text-white px-6 py-3 rounded-custom hover:bg-primary-dark transition-colors"
          >
            {t('blog.backToBlog')}
          </button>
        </div>
      </div>
    );
  }

  // Articles liés (même catégorie, excluant l'article actuel)
  const relatedPosts = blogPosts
    .filter(p => p.id !== postId && p.category === post.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 py-20">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-8">
          <Link to="/" className="hover:text-primary transition-colors">
            {t('nav.home')}
          </Link>
          <span>/</span>
          <Link to="/blog" className="hover:text-primary transition-colors">
            {t('nav.blog')}
          </Link>
          <span>/</span>
          <span className="text-primary line-clamp-1">{post.title[currentLanguage]}</span>
        </nav>

        {/* Article Header */}
        <article className="bg-white dark:bg-gray-900 rounded-custom shadow-custom overflow-hidden">
          {/* Featured Image */}
          <div className="relative h-64 md:h-96">
            <img
              src={post.image}
              alt={post.title[currentLanguage]}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20"></div>
          </div>

          {/* Article Content */}
          <div className="p-8">
            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="bg-primary-light text-primary-dark px-3 py-1 rounded-full text-sm font-medium">
                {post.category}
              </span>
              <span className="text-gray-500 dark:text-gray-400">
                {new Date(post.publishDate).toLocaleDateString(currentLanguage === 'fr' ? 'fr-FR' : 'en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
              <span className="text-gray-500 dark:text-gray-400">
                {post.readTime} {t('blog.minRead')}
              </span>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xs">SK</span>
                </div>
                <span className="text-gray-500 dark:text-gray-400">{post.author}</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-title text-secondary dark:text-white mb-6">
              {post.title[currentLanguage]}
            </h1>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Content */}
            <div 
              className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-title prose-headings:text-secondary dark:prose-headings:text-white prose-a:text-primary prose-strong:text-secondary dark:prose-strong:text-white"
              dangerouslySetInnerHTML={{ __html: post.content[currentLanguage] }}
            />

            {/* Share Buttons */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mt-8">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-gray-600 dark:text-gray-300 font-medium">
                    {t('blog.share')}:
                  </span>
                </div>
                <div className="flex space-x-4">
                  <button className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors">
                    <i className="bx bxl-twitter text-xl"></i>
                  </button>
                  <button className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors">
                    <i className="bx bxl-linkedin text-xl"></i>
                  </button>
                  <button className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors">
                    <i className="bx bxl-facebook text-xl"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Author Bio */}
        <div className="bg-white dark:bg-gray-900 rounded-custom shadow-custom p-8 mt-8">
          <div className="flex items-start space-x-6">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-xl">SK</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold font-title text-secondary dark:text-white mb-2">
                Stéphane Kamga
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {t('blog.authorBio')}
              </p>
              <div className="flex space-x-4">
                <a href="https://github.com/steph2pro" className="text-gray-400 hover:text-primary transition-colors">
                  <i className="bx bxl-github text-xl"></i>
                </a>
                <a href="https://linkedin.com/in/stephane-kamga" className="text-gray-400 hover:text-primary transition-colors">
                  <i className="bx bxl-linkedin text-xl"></i>
                </a>
                <a href="https://twitter.com/steph2pro" className="text-gray-400 hover:text-primary transition-colors">
                  <i className="bx bxl-twitter text-xl"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold font-title text-secondary dark:text-white mb-6">
              {t('blog.relatedPosts')}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map(relatedPost => (
                <Link
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.id}`}
                  className="bg-white dark:bg-gray-900 rounded-custom shadow-custom overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="h-40">
                    <img
                      src={relatedPost.image}
                      alt={relatedPost.title[currentLanguage]}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-secondary dark:text-white mb-2 line-clamp-2">
                      {relatedPost.title[currentLanguage]}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      {new Date(relatedPost.publishDate).toLocaleDateString(currentLanguage === 'fr' ? 'fr-FR' : 'en-US')}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-12">
          <button
            onClick={() => navigate('/blog')}
            className="flex items-center space-x-2 text-primary hover:text-primary-dark transition-colors"
          >
            <i className="bx bx-arrow-back"></i>
            <span>{t('blog.backToBlog')}</span>
          </button>
          
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center space-x-2 text-primary hover:text-primary-dark transition-colors"
          >
            <span>{t('blog.backToTop')}</span>
            <i className="bx bx-arrow-to-top"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

// import React from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';

// // Données temporaires
// const blogPosts = [
//   {
//     id: 'react-best-practices-2024',
//     title: {
//       fr: "Meilleures pratiques React en 2024",
//       en: "React Best Practices in 2024"
//     },
//     content: {
//       fr: `
//         <h2>Introduction</h2>
//         <p>React continue d'évoluer rapidement, et 2024 apporte son lot de nouvelles meilleures pratiques. Voici un guide complet pour développer des applications React modernes et performantes.</p>
        
//         <h2>1. Utilisation de TypeScript</h2>
//         <p>TypeScript est devenu incontournable pour les projets React sérieux. Il offre :</p>
//         <ul>
//           <li>Une détection précoce des erreurs</li>
//           <li>Une meilleure autocomplétion</li>
//           <li>Une documentation vivante du code</li>
//         </ul>
        
//         <h2>2. Gestion d'état avec Zustand</h2>
//         <p>Zustand offre une alternative légère et simple à Redux pour la gestion d'état globale.</p>
        
//         <h2>Conclusion</h2>
//         <p>En suivant ces pratiques, vous maintiendrez un code React propre, maintenable et performant.</p>
//       `,
//       en: `
//         <h2>Introduction</h2>
//         <p>React continues to evolve rapidly, and 2024 brings its share of new best practices. Here's a comprehensive guide to developing modern and performant React applications.</p>
        
//         <h2>1. Using TypeScript</h2>
//         <p>TypeScript has become essential for serious React projects. It offers:</p>
//         <ul>
//           <li>Early error detection</li>
//           <li>Better autocompletion</li>
//           <li>Living code documentation</li>
//         </ul>
        
//         <h2>2. State Management with Zustand</h2>
//         <p>Zustand provides a lightweight and simple alternative to Redux for global state management.</p>
        
//         <h2>Conclusion</h2>
//         <p>By following these practices, you'll maintain clean, maintainable, and performant React code.</p>
//       `
//     },
//     author: "Stéphane Kamga",
//     publishDate: "2024-01-15",
//     category: "React",
//     tags: ["React", "TypeScript", "Best Practices", "2024"],
//     image: "/assets/img/blog/react-best-practices.jpg",
//     readTime: 8,
//     featured: true
//   }
// ];

// export const BlogPost: React.FC = () => {
//   const { postId } = useParams<{ postId: string }>();
//   const { t, i18n } = useTranslation();
//   const navigate = useNavigate();

//   const post = blogPosts.find(p => p.id === postId);
//   const currentLanguage = i18n.language as 'fr' | 'en';

//   if (!post) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-gray-600 dark:text-gray-400 mb-4">
//             {t('blog.postNotFound')}
//           </h2>
//           <button
//             onClick={() => navigate('/blog')}
//             className="bg-primary text-white px-6 py-3 rounded-custom hover:bg-primary-dark transition-colors"
//           >
//             {t('blog.backToBlog')}
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const relatedPosts = blogPosts.filter(p => p.id !== postId).slice(0, 3);

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-800 py-20">
//       <div className="container mx-auto px-6 max-w-4xl">
//         {/* Breadcrumb */}
//         <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-8">
//           <Link to="/" className="hover:text-primary transition-colors">
//             {t('nav.home')}
//           </Link>
//           <span>/</span>
//           <Link to="/blog" className="hover:text-primary transition-colors">
//             {t('nav.blog')}
//           </Link>
//           <span>/</span>
//           <span className="text-primary line-clamp-1">{post.title[currentLanguage]}</span>
//         </nav>

//         {/* Article Header */}
//         <article className="bg-white dark:bg-gray-900 rounded-custom shadow-custom overflow-hidden">
//           {/* Featured Image */}
//           <div className="relative h-64 md:h-96">
//             <img
//               src={post.image}
//               alt={post.title[currentLanguage]}
//               className="w-full h-full object-cover"
//             />
//             <div className="absolute inset-0 bg-black/20"></div>
//           </div>

//           {/* Article Content */}
//           <div className="p-8">
//             {/* Meta Information */}
//             <div className="flex flex-wrap items-center gap-4 mb-6">
//               <span className="bg-primary-light text-primary-dark px-3 py-1 rounded-full text-sm font-medium">
//                 {post.category}
//               </span>
//               <span className="text-gray-500 dark:text-gray-400">
//                 {new Date(post.publishDate).toLocaleDateString(currentLanguage === 'fr' ? 'fr-FR' : 'en-US', {
//                   year: 'numeric',
//                   month: 'long',
//                   day: 'numeric'
//                 })}
//               </span>
//               <span className="text-gray-500 dark:text-gray-400">
//                 {post.readTime} {t('blog.minRead')}
//               </span>
//               <div className="flex items-center space-x-2">
//                 <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
//                   <span className="text-white font-bold text-xs">SK</span>
//                 </div>
//                 <span className="text-gray-500 dark:text-gray-400">{post.author}</span>
//               </div>
//             </div>

//             {/* Title */}
//             <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-title text-secondary dark:text-white mb-6">
//               {post.title[currentLanguage]}
//             </h1>

//             {/* Tags */}
//             <div className="flex flex-wrap gap-2 mb-8">
//               {post.tags.map(tag => (
//                 <span
//                   key={tag}
//                   className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full text-sm"
//                 >
//                   #{tag}
//                 </span>
//               ))}
//             </div>

//             {/* Content */}
//             <div 
//               className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-title prose-headings:text-secondary dark:prose-headings:text-white prose-a:text-primary prose-strong:text-secondary dark:prose-strong:text-white"
//               dangerouslySetInnerHTML={{ __html: post.content[currentLanguage] }}
//             />

//             {/* Share Buttons */}
//             <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mt-8">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <span className="text-gray-600 dark:text-gray-300 font-medium">
//                     {t('blog.share')}:
//                   </span>
//                 </div>
//                 <div className="flex space-x-4">
//                   <button className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors">
//                     <i className="bx bxl-twitter text-xl"></i>
//                   </button>
//                   <button className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors">
//                     <i className="bx bxl-linkedin text-xl"></i>
//                   </button>
//                   <button className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors">
//                     <i className="bx bxl-facebook text-xl"></i>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </article>

//         {/* Author Bio */}
//         <div className="bg-white dark:bg-gray-900 rounded-custom shadow-custom p-8 mt-8">
//           <div className="flex items-start space-x-6">
//             <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
//               <span className="text-white font-bold text-xl">SK</span>
//             </div>
//             <div>
//               <h3 className="text-xl font-semibold font-title text-secondary dark:text-white mb-2">
//                 Stéphane Kamga
//               </h3>
//               <p className="text-gray-600 dark:text-gray-300 mb-4">
//                 {t('blog.authorBio')}
//               </p>
//               <div className="flex space-x-4">
//                 <a href="https://github.com/steph2pro" className="text-gray-400 hover:text-primary transition-colors">
//                   <i className="bx bxl-github text-xl"></i>
//                 </a>
//                 <a href="https://linkedin.com/in/stephane-kamga" className="text-gray-400 hover:text-primary transition-colors">
//                   <i className="bx bxl-linkedin text-xl"></i>
//                 </a>
//                 <a href="https://twitter.com/steph2pro" className="text-gray-400 hover:text-primary transition-colors">
//                   <i className="bx bxl-twitter text-xl"></i>
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Related Posts */}
//         {relatedPosts.length > 0 && (
//           <div className="mt-12">
//             <h2 className="text-2xl font-bold font-title text-secondary dark:text-white mb-6">
//               {t('blog.relatedPosts')}
//             </h2>
//             <div className="grid md:grid-cols-3 gap-6">
//               {relatedPosts.map(relatedPost => (
//                 <Link
//                   key={relatedPost.id}
//                   to={`/blog/${relatedPost.id}`}
//                   className="bg-white dark:bg-gray-900 rounded-custom shadow-custom overflow-hidden hover:shadow-lg transition-shadow duration-300"
//                 >
//                   <div className="h-40">
//                     <img
//                       src={relatedPost.image}
//                       alt={relatedPost.title[currentLanguage]}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                   <div className="p-4">
//                     <h3 className="font-semibold text-secondary dark:text-white mb-2 line-clamp-2">
//                       {relatedPost.title[currentLanguage]}
//                     </h3>
//                     <p className="text-gray-500 dark:text-gray-400 text-sm">
//                       {new Date(relatedPost.publishDate).toLocaleDateString(currentLanguage === 'fr' ? 'fr-FR' : 'en-US')}
//                     </p>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Navigation */}
//         <div className="flex justify-between mt-12">
//           <button
//             onClick={() => navigate('/blog')}
//             className="flex items-center space-x-2 text-primary hover:text-primary-dark transition-colors"
//           >
//             <i className="bx bx-arrow-back"></i>
//             <span>{t('blog.backToBlog')}</span>
//           </button>
          
//           {/* Vous pourriez ajouter une navigation vers l'article suivant/précédent */}
//           <button
//             onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
//             className="flex items-center space-x-2 text-primary hover:text-primary-dark transition-colors"
//           >
//             <span>{t('blog.backToTop')}</span>
//             <i className="bx bx-arrow-to-top"></i>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };