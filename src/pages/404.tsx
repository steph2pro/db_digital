import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from "motion/react"

export const NotFound: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-800 py-20">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Animated 404 */}
          <div className="relative mb-8">
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-9xl font-bold text-primary font-title"
            >
              404
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -top-4 -right-4 w-8 h-8 bg-accent rounded-full"
            ></motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute -bottom-4 -left-4 w-6 h-6 bg-accent rounded-full"
            ></motion.div>
          </div>

          {/* Message */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-3xl md:text-4xl font-bold font-title text-secondary dark:text-white mb-4"
          >
            {t('404.title')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto"
          >
            {t('404.description')}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/"
              className="bg-primary text-white px-8 py-3 rounded-custom hover:bg-primary-dark transition-colors font-medium flex items-center justify-center space-x-2"
            >
              <i className="bx bx-home"></i>
              <span>{t('404.backHome')}</span>
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="border border-primary text-primary px-8 py-3 rounded-custom hover:bg-primary hover:text-white transition-colors font-medium flex items-center justify-center space-x-2"
            >
              <i className="bx bx-arrow-back"></i>
              <span>{t('404.goBack')}</span>
            </button>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-12"
          >
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              {t('404.quickLinks')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/projects"
                className="text-primary hover:text-primary-dark transition-colors flex items-center space-x-1"
              >
                <i className="bx bx-folder"></i>
                <span>{t('nav.projects')}</span>
              </Link>
              <Link
                to="/blog"
                className="text-primary hover:text-primary-dark transition-colors flex items-center space-x-1"
              >
                <i className="bx bx-news"></i>
                <span>{t('nav.blog')}</span>
              </Link>
              <Link
                to="/about"
                className="text-primary hover:text-primary-dark transition-colors flex items-center space-x-1"
              >
                <i className="bx bx-user"></i>
                <span>{t('nav.about')}</span>
              </Link>
              <Link
                to="/contact"
                className="text-primary hover:text-primary-dark transition-colors flex items-center space-x-1"
              >
                <i className="bx bx-envelope"></i>
                <span>{t('nav.contact')}</span>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};