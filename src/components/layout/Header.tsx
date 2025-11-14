import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { navigation } from '../../data/navigation';
import { useTheme } from '../../contexts/ThemeContext';
import { LanguageSwitcher } from '../LanguageSwitcher';

export const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  const isActiveLink = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const toggleSubmenu = (menuId: string) => {
    setActiveSubmenu(activeSubmenu === menuId ? null : menuId);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md z-50 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center">
              <img
                src="/images/logo/logo-trans.png"  // 👉 chemin vers ton logo
                alt="Logo Steph2pro"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-xl sm:text-2xl font-bold text-primary-dark font-title">
              Stéphane
            </span>
          </Link>


          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <div key={item.id} className="relative group">
                {item.submenu ? (
                  <div className="relative">
                    <button
                      onClick={() => toggleSubmenu(item.id)}
                      className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors duration-300 ${
                        isActiveLink(item.path)
                          ? 'text-primary bg-primary-light'
                          : 'text-secondary dark:text-gray-300 hover:text-primary dark:hover:text-primary'
                      }`}
                    >
                      <i className={`${item.icon} text-lg`}></i>
                      <span className="font-medium">
                        {t(`nav.${item.id}` as any)}
                      </span>
                      <i className="bx bx-chevron-down text-sm"></i>
                    </button>

                    {/* Submenu Desktop */}
                    <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-custom border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.id}
                          to={subItem.path}
                          className={`flex items-center space-x-2 px-4 py-3 hover:bg-primary-light dark:hover:bg-gray-700 transition-colors duration-200 ${
                            isActiveLink(subItem.path)
                              ? 'text-primary bg-primary-light/50'
                              : 'text-secondary dark:text-gray-300'
                          } first:rounded-t-lg last:rounded-b-lg`}
                        >
                          <i className={`${subItem.icon} text-lg`}></i>
                          <span>{t(`nav.${subItem.id}` as any)}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-300 ${
                      isActiveLink(item.path)
                        ? 'text-primary bg-primary-light'
                        : 'text-secondary dark:text-gray-300 hover:text-primary dark:hover:text-primary'
                    }`}
                  >
                    <i className={`${item.icon} text-lg`}></i>
                    <span className="font-medium">
                      {t(`nav.${item.id}` as any)}
                    </span>
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Controls */}
          <div className="hidden lg:flex items-center space-x-4">
            <LanguageSwitcher />
            <button
              onClick={toggleTheme}
              className="p-3 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <i className="bx bx-sun text-xl"></i>
              ) : (
                <i className="bx bx-moon text-xl"></i>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 flex flex-col justify-between">
              <span
                className={`w-full h-0.5 bg-secondary dark:bg-white transition-transform duration-300 ${
                  isMenuOpen ? 'rotate-45 translate-y-2.5' : ''
                }`}
              ></span>
              <span
                className={`w-full h-0.5 bg-secondary dark:bg-white transition-opacity duration-300 ${
                  isMenuOpen ? 'opacity-0' : ''
                }`}
              ></span>
              <span
                className={`w-full h-0.5 bg-secondary dark:bg-white transition-transform duration-300 ${
                  isMenuOpen ? '-rotate-45 -translate-y-2.5' : ''
                }`}
              ></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col space-y-2 mt-4">
              {navigation.map((item) => (
                <div key={item.id}>
                  {item.submenu ? (
                    <div>
                      <button
                        onClick={() => toggleSubmenu(item.id)}
                        className={`flex items-center justify-between w-full px-4 py-3 rounded-lg transition-colors duration-300 ${
                          isActiveLink(item.path)
                            ? 'text-primary bg-primary-light'
                            : 'text-secondary dark:text-gray-300 hover:text-primary dark:hover:text-primary'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <i className={`${item.icon} text-lg`}></i>
                          <span className="font-medium">
                            {t(`nav.${item.id}` as any)}
                          </span>
                        </div>
                        <i
                          className={`bx bx-chevron-down transition-transform duration-300 ${
                            activeSubmenu === item.id ? 'rotate-180' : ''
                          }`}
                        ></i>
                      </button>

                      {/* Mobile Submenu */}
                      {activeSubmenu === item.id && (
                        <div className="ml-6 mt-2 space-y-1">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.id}
                              to={subItem.path}
                              onClick={() => setIsMenuOpen(false)}
                              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-300 ${
                                isActiveLink(subItem.path)
                                  ? 'text-primary bg-primary-light/50'
                                  : 'text-secondary dark:text-gray-300 hover:text-primary dark:hover:text-primary'
                              }`}
                            >
                              <i className={`${subItem.icon}`}></i>
                              <span>{t(`nav.${subItem.id}` as any)}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors duration-300 ${
                        isActiveLink(item.path)
                          ? 'text-primary bg-primary-light'
                          : 'text-secondary dark:text-gray-300 hover:text-primary dark:hover:text-primary'
                      }`}
                    >
                      <i className={`${item.icon} text-lg`}></i>
                      <span className="font-medium">
                        {t(`nav.${item.id}` as any)}
                      </span>
                    </Link>
                  )}
                </div>
              ))}

              {/* Mobile Controls */}
              <div className="flex space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <LanguageSwitcher />
                <button
                  onClick={toggleTheme}
                  className="flex-1 p-3 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
                >
                  {isDark ? (
                    <i className="bx bx-sun text-xl"></i>
                  ) : (
                    <i className="bx bx-moon text-xl"></i>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};