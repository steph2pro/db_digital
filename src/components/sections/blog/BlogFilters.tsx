import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../contexts/ThemeContext';
import { blogCategories } from '../../../data/blogData';

interface BlogFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortBy: 'date' | 'views' | 'likes';
  onSortChange: (sort: 'date' | 'views' | 'likes') => void;
  totalPosts: number;
}

export const BlogFilters: React.FC<BlogFiltersProps> = ({
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  totalPosts
}) => {
  const { t } = useTranslation();
  const { isDark } = useTheme();

  const sortOptions = [
    { value: 'date', label: t('blog.sort.date', 'Plus récents'), icon: 'bx bx-time' },
    { value: 'views', label: t('blog.sort.views', 'Plus vus'), icon: 'bx bx-show' },
    { value: 'likes', label: t('blog.sort.likes', 'Plus aimés'), icon: 'bx bx-like' }
  ];

  return (
    <div className="mb-8">
      {/* Catégories */}
      <div className="flex flex-wrap gap-2 mb-6">
        {blogCategories.map((category) => (
          <motion.button
            key={category.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onCategoryChange(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
              selectedCategory === category.id
                ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg'
                : isDark
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <i className={`${category.icon} text-base`} />
            {t(category.nameKey)}
            {category.id === 'all' && totalPosts > 0 && (
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                selectedCategory === category.id
                  ? 'bg-white/20'
                  : isDark ? 'bg-gray-700' : 'bg-gray-200'
              }`}>
                {totalPosts}
              </span>
            )}
          </motion.button>
        ))}
      </div>

      {/* Tri */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {t('blog.sort.label', 'Trier par :')}
          </span>
          <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onSortChange(option.value as any)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-1.5 ${
                  sortBy === option.value
                    ? 'bg-white dark:bg-gray-700 shadow-sm text-green-600 dark:text-green-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <i className={option.icon} />
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
          {totalPosts} {t('blog.articles', 'articles')}
        </div>
      </div>
    </div>
  );
};