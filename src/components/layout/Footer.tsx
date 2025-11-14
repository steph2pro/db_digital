import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.projects'), path: '/projects' },
    { name: t('nav.blog'), path: '/blog' },
    { name: t('nav.contact'), path: '/contact' },
    { name: t('nav.trainings'), path: '/trainings' }
  ];

  const projectLinks = [
    { name: t('nav.web-projects'), path: '/projects/web' },
    { name: t('nav.mobile-projects'), path: '/projects/mobile' },
    { name: t('nav.backend-projects'), path: '/projects/backend' },
    { name: t('nav.fullstack-projects'), path: '/projects/backend' }
  ];

  const socialLinks = [
    {
      icon: 'bx bxl-linkedin',
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/stephane-kamga-6633b1277',
      color: 'hover:text-blue-600'
    },
    {
      icon: 'bx bxl-github',
      name: 'GitHub',
      url: 'https://github.com/steph2pro/',
      color: 'hover:text-gray-700 dark:hover:text-white'
    },
    {
      icon: 'bx bxl-twitter',
      name: 'Twitter',
      url: 'https://twitter.com/steph2pro',
      color: 'hover:text-blue-400'
    },
    {
      icon: 'bx bxl-facebook',
      name: 'Facebook',
      url: 'https://www.facebook.com/stephanechencelin.kamga',
      color: 'hover:text-blue-600'
    },
    {
      icon: 'bx bxl-instagram',
      name: 'Instagram',
      url: 'https://instagram.com/steph2pro',
      color: 'hover:text-pink-600'
    }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
             <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center">
              <img
                src="/images/logo/logo-trans.png"  // 👉 chemin vers ton logo
                alt="Logo Steph2pro"
                className="w-full h-full object-contain"
              />
            </div>
              <span className="text-2xl font-bold font-title">Stéphane</span>
            </Link>
            <p className="text-gray-400 mb-4">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 ${social.color} transition-colors duration-300`}
                  title={social.name}
                >
                  <i className={`${social.icon} text-xl`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold font-title mb-4">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects */}
          <div>
            <h3 className="text-lg font-semibold font-title mb-4">
              {t('footer.projects')}
            </h3>
            <ul className="space-y-2">
              {projectLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold font-title mb-4">
              {t('footer.contact')}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <i className="bx bx-envelope text-primary"></i>
                <a
                  href="mailto:contact.stephpro@gmail.com"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  contact.stephpro@gmail.com
                </a>
              </div>
              {/* Téléphone */}
              <div className="flex items-center space-x-3">
                <i className="bx bx-phone text-primary"></i>
                <a
                  href="tel:+237671506217"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  +237 671 506 217
                </a>
              </div>

              {/* WhatsApp */}
              <div className="flex items-center space-x-3">
                <i className="bx bxl-whatsapp text-green-500"></i>
                <a
                  href="https://wa.me/237697374910?text=Bonjour%20Steph2pro%2C%20je%20souhaite%20en%20savoir%20plus%20sur%20vos%20services%20de%20développement."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-green-500 transition-colors"
                >
                  +237 697 374 910
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <i className="bx bx-map text-primary"></i>
                <span className="text-gray-400">Douala, Cameroun</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Stéphane Kamga. {t('footer.rights')}
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                to="/privacy"
                className="text-gray-400 hover:text-primary transition-colors text-sm"
              >
                {t('footer.privacy')}
              </Link>
              <Link
                to="/terms"
                className="text-gray-400 hover:text-primary transition-colors text-sm"
              >
                {t('footer.terms')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 w-12 h-12 bg-primary text-white rounded-full shadow-lg hover:bg-primary-dark transition-colors duration-300 flex items-center justify-center z-40"
        aria-label="Back to top"
      >
        <i className="bx bx-chevron-up text-xl"></i>
      </button>
    </footer>
  );
};