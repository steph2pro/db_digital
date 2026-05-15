import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import { useBlogFilters } from '../hooks/useBlogFilters';
import { BlogHero } from '../components/sections/blog/BlogHero';
import { BlogSearch } from '../components/sections/blog/BlogSearch';
import { BlogFilters } from '../components/sections/blog/BlogFilters';
import { BlogCard } from '../components/sections/blog/BlogCard';
import { BlogPagination } from '../components/sections/blog/BlogPagination';

export const BlogPage: React.FC = () => {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const postsRef = useRef<HTMLDivElement>(null);
  
  const {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    currentPage,
    setCurrentPage,
    totalPages,
    currentPosts,
    totalPosts
  } = useBlogFilters();

  return (
    <div className="min-h-screen">
      <BlogHero />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <BlogSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        
        <BlogFilters
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
          totalPosts={totalPosts}
        />

        {currentPosts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <i className={`bx bx-error text-6xl ${isDark ? 'text-gray-600' : 'text-gray-400'} mb-4`} />
            <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {t('blog.noResults.title', 'Aucun article trouvé')}
            </h3>
            <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>
              {t('blog.noResults.message', 'Essayez de modifier vos critères de recherche')}
            </p>
          </motion.div>
        ) : (
          <div ref={postsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} inView={true} />
            ))}
          </div>
        )}

        <BlogPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => {
            setCurrentPage(page);
            postsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
        />
      </div>
    </div>
  );
};