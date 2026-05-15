import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../contexts/ThemeContext';
import { RelatedPosts } from './RelatedPosts';
import { BlogPost, blogPosts } from '../../../data/blogData';

export const BlogPostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const foundPost = blogPosts.find(p => p.id === id);
    if (foundPost) {
      setPost(foundPost);
      // Incrémenter les vues (simulé)
      foundPost.views += 1;
    }
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <i className="bx bx-error text-6xl text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Article non trouvé</h2>
          <button
            onClick={() => navigate('/blog')}
            className="text-green-500 hover:underline"
          >
            Retour au blog
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
  };

  const handleLike = () => {
    if (!liked) {
      post.likes += 1;
      setLiked(true);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero de l'article */}
      <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${post.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-green-500 to-blue-500">
                  {t(post.categoryKey)}
                </span>
                {post.featured && (
                  <span className="px-2 py-1 rounded-full text-xs font-bold bg-yellow-500 flex items-center gap-1">
                    <i className="bx bx-star" /> À la une
                  </span>
                )}
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">
                {t(post.titleKey)}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <img src={post.authorAvatar} alt={post.author} className="w-8 h-8 rounded-full" />
                  <span>{post.author}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <i className="bx bx-calendar" />
                  <span>{formatDate(post.date)}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <i className="bx bx-time" />
                  <span>{post.readTime} min de lecture</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Contenu de l'article */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Excerpt */}
          <div className={`text-xl leading-relaxed mb-8 italic ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {t(post.excerptKey)}
          </div>

          {/* Contenu */}
          <div className={`prose prose-lg max-w-none ${
            isDark ? 'prose-invert' : ''
          }`}>
            {t(post.contentKey).split('\n').map((paragraph, i) => (
              <p key={i} className="mb-4 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 my-8 pt-8 border-t border-gray-200 dark:border-gray-800">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className={`px-3 py-1 rounded-full text-sm ${
                  isDark
                    ? 'bg-gray-800 text-gray-400'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Interactions */}
          <div className="flex items-center gap-4 py-6 border-y border-gray-200 dark:border-gray-800">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                liked
                  ? 'bg-green-500 text-white'
                  : isDark
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <i className="bx bx-like" />
              <span>{post.likes}</span>
            </button>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'
            }`}>
              <i className="bx bx-show" />
              <span>{post.views} vues</span>
            </div>
          </div>

          {/* Partager */}
          <div className="flex items-center gap-4 mt-6">
            <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Partager :</span>
            <div className="flex gap-2">
              {['facebook', 'twitter', 'linkedin', 'whatsapp'].map((social) => (
                <button
                  key={social}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    isDark
                      ? 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  <i className={`bx bxl-${social} text-lg`} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Articles similaires */}
      <RelatedPosts currentPostId={post.id} currentCategory={post.category} />
    </div>
  );
};