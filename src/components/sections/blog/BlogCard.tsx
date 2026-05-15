import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext';
import { BlogPost } from '../../../data/blogData';

interface BlogCardProps {
  post: BlogPost;
  index: number;
  inView: boolean;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post, index, inView }) => {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = post.image;
    img.onload = () => setImageLoaded(true);
  }, [post.image]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      pricing: 'from-emerald-500 to-teal-500',
      'web-dev': 'from-blue-500 to-cyan-500',
      'ai-tech': 'from-purple-500 to-pink-500',
      career: 'from-orange-500 to-red-500',
      trends: 'from-green-500 to-emerald-500'
    };
    return colors[category] || 'from-gray-500 to-gray-600';
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group cursor-pointer h-full"
      onClick={() => navigate(`/blog/${post.id}`)}
    >
      <div className={`relative rounded-2xl overflow-hidden backdrop-blur-sm border transition-all duration-500 h-full flex flex-col ${
        isDark 
          ? 'bg-gray-900/70 border-gray-700/50' 
          : 'bg-white/70 border-gray-200/50'
      } ${isHovered ? 'shadow-2xl -translate-y-1' : 'shadow-lg'}`}>
        
        {/* Image */}
        <div className="relative h-48 overflow-hidden flex-shrink-0">
          <motion.div
            animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${post.image})`,
                opacity: imageLoaded ? 1 : 0,
              }}
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${
              isDark ? 'from-gray-900 via-transparent' : 'from-gray-900/60 via-transparent'
            }`} />
          </motion.div>

          {/* Catégorie badge */}
          <div className="absolute top-3 left-3 z-10">
            <span className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${getCategoryColor(post.category)} text-white shadow-lg`}>
              {t(post.categoryKey)}
            </span>
          </div>

          {/* Featured badge */}
          {post.featured && (
            <div className="absolute top-3 right-3 z-10">
              <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-yellow-500 text-white shadow-lg flex items-center gap-1">
                <i className="bx bx-star text-xs" />
                {t('blog.featured', 'À la une')}
              </span>
            </div>
          )}
        </div>

        {/* Contenu */}
        <div className="p-5 flex-1 flex flex-col">
          {/* Metadata */}
          <div className="flex items-center gap-3 text-xs mb-3">
            <div className="flex items-center gap-1.5">
              <img 
                src={post.authorAvatar} 
                alt={post.author}
                className="w-6 h-6 rounded-full"
              />
              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                {post.author}
              </span>
            </div>
            <span className={isDark ? 'text-gray-600' : 'text-gray-400'}>•</span>
            <div className="flex items-center gap-1.5">
              <i className="bx bx-calendar text-xs" />
              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                {formatDate(post.date)}
              </span>
            </div>
            <span className={isDark ? 'text-gray-600' : 'text-gray-400'}>•</span>
            <div className="flex items-center gap-1.5">
              <i className="bx bx-time text-xs" />
              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                {post.readTime} min
              </span>
            </div>
          </div>

          {/* Titre */}
          <h3 className={`text-xl font-bold mb-2 line-clamp-2 transition-colors ${
            isDark ? 'text-white group-hover:text-green-400' : 'text-gray-900 group-hover:text-green-600'
          }`}>
            {t(post.titleKey)}
          </h3>

          {/* Excerpt */}
          <p className={`text-sm mb-4 line-clamp-3 flex-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {t(post.excerptKey)}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                  isDark
                    ? 'bg-gray-800/80 text-gray-400'
                    : 'bg-gray-100/80 text-gray-500'
                }`}
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Stats & Lire la suite */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-200/20">
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1">
                <i className="bx bx-show text-green-500" />
                <span className={isDark ? 'text-gray-500' : 'text-gray-400'}>
                  {post.views} vues
                </span>
              </div>
              <div className="flex items-center gap-1">
                <i className="bx bx-like text-green-500" />
                <span className={isDark ? 'text-gray-500' : 'text-gray-400'}>
                  {post.likes}
                </span>
              </div>
            </div>
            <motion.span
              animate={isHovered ? { x: 5 } : { x: 0 }}
              className="text-sm font-semibold text-green-500 flex items-center gap-1"
            >
              {t('blog.readMore', 'Lire la suite')}
              <i className="bx bx-right-arrow-alt" />
            </motion.span>
          </div>
        </div>

        {/* Barre de progression au hover */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500 to-blue-500"
          initial={{ scaleX: 0, originX: 0 }}
          animate={isHovered ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.article>
  );
};