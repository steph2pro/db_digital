import React from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../../../contexts/ThemeContext';

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const BlogPagination: React.FC<BlogPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange
}) => {
  const { isDark } = useTheme();

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center gap-2 mt-8">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-lg transition-all ${
          currentPage === 1
            ? 'opacity-50 cursor-not-allowed'
            : isDark
              ? 'bg-gray-800 hover:bg-gray-700 text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
        }`}
      >
        <i className="bx bx-chevron-left text-xl" />
      </motion.button>

      {getPageNumbers().map((page) => (
        <motion.button
          key={page}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 rounded-lg font-medium transition-all ${
            currentPage === page
              ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg'
              : isDark
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {page}
        </motion.button>
      ))}

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-lg transition-all ${
          currentPage === totalPages
            ? 'opacity-50 cursor-not-allowed'
            : isDark
              ? 'bg-gray-800 hover:bg-gray-700 text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
        }`}
      >
        <i className="bx bx-chevron-right text-xl" />
      </motion.button>
    </div>
  );
};