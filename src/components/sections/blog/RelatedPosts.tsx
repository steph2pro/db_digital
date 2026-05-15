import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext';
import { blogPosts } from '../../../data/blogData';

interface RelatedPostsProps {
  currentPostId: string;
  currentCategory: string;
}

export const RelatedPosts: React.FC<RelatedPostsProps> = ({ currentPostId, currentCategory }) => {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.1 });

  const relatedPosts = blogPosts
    .filter(p => p.id !== currentPostId && p.category === currentCategory)
    .slice(0, 3);

  if (relatedPosts.length === 0) return null;

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
      className="bg-gray-50 dark:bg-gray-900/50 py-12 mt-12"
    >
      <div className="container mx-auto px-4">
        <h2 className={`text-2xl font-bold text-center mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {t('blog.related', 'Articles similaires')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => navigate(`/blog/${post.id}`)}
              className="cursor-pointer group"
            >
              <div className={`rounded-xl overflow-hidden border transition-all ${
                isDark
                  ? 'bg-gray-800 border-gray-700 hover:border-green-500'
                  : 'bg-white border-gray-200 hover:border-green-400'
              }`}>
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-40 object-cover transition-transform group-hover:scale-105 duration-500"
                />
                <div className="p-4">
                  <h3 className={`font-bold mb-2 line-clamp-2 group-hover:text-green-500 transition-colors ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {t(post.titleKey)}
                  </h3>
                  <p className={`text-sm line-clamp-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {t(post.excerptKey)}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.div>
  );
};