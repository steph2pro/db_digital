import React from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../contexts/ThemeContext';

interface BlogSearchProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export const BlogSearch: React.FC<BlogSearchProps> = ({ searchTerm, onSearchChange }) => {
  const { t } = useTranslation();
  const { isDark } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative mb-8"
    >
      <div className="relative max-w-2xl mx-auto">
        <i className={`bx bx-search absolute left-4 top-1/2 -translate-y-1/2 text-lg ${
          isDark ? 'text-gray-500' : 'text-gray-400'
        }`} />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={t('blog.search.placeholder', 'Rechercher un article, un sujet, une techno...') || ''}
          className={`w-full pl-12 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${
            isDark
              ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
              : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
          }`}
        />
        {searchTerm && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >
            <i className={`bx bx-x text-xl ${isDark ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`} />
          </button>
        )}
      </div>
    </motion.div>
  );
};