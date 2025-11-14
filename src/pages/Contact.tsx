import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from "motion/react"

export const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulation d'envoi
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: 'bx bx-envelope',
      title: 'Email',
      value: 'contact.stephpro@gmail.com',
      link: 'mailto:contact.stephpro@gmail.com'
    },
    {
      icon: 'bx bx-phone',
      title: 'Téléphone',
      value: '+237 671 506 217',
      link: 'tel:+237671506217'
    },
    {
      icon: 'bx bxl-whatsapp ',
      title: 'Whatsap',
      value: '+237 697 374 910',
      link: 'https://wa.me/237697374910?text=Bonjour%20Steph2pro%2C%20je%20souhaite%20en%20savoir%20plus%20sur%20vos%20services%20de%20développement.'
    },
    {
      icon: 'bx bx-map',
      title: 'Localisation',
      value: 'Douala, Cameroun',
      link: '#'
    },
    {
      icon: 'bx bx-time',
      title: 'Disponibilité',
      value: 'Lun - Sam, 9h - 18h',
      link: '#'
    }
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
    }
  ];

  return (
    <div className="min-h-screen py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold font-title text-secondary dark:text-white mb-6">
            {t('contact.title')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('contact.description')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold font-title text-secondary dark:text-white mb-8">
              {t('contact.letsTalk')}
            </h2>

            {/* Contact Methods */}
            <div className="space-y-6 mb-8">
              {contactMethods.map((method, index) => (
                <a
                  key={index}
                  href={method.link}
                  className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-900 rounded-custom shadow-custom hover:shadow-lg transition-shadow duration-300 group"
                >
                  <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center group-hover:bg-primary transition-colors">
                    <i className={`${method.icon} text-xl text-primary-dark group-hover:text-white`}></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary dark:text-white">{method.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{method.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-lg font-semibold font-title text-secondary dark:text-white mb-4">
                {t('contact.followMe')}
              </h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 bg-white dark:bg-gray-900 rounded-lg flex items-center justify-center shadow-custom text-gray-600 dark:text-gray-400 ${social.color} transition-colors duration-300`}
                    title={social.name}
                  >
                    <i className={`${social.icon} text-xl`}></i>
                  </a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="mt-8 p-6 bg-primary-light rounded-custom">
              <div className="flex items-center space-x-3">
                <i className="bx bx-check-circle text-2xl text-primary-dark"></i>
                <div>
                  <h4 className="font-semibold text-secondary dark:text-gray-600">
                    {t('contact.availability.title')}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-500 text-sm">
                    {t('contact.availability.description')}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 rounded-custom shadow-custom p-8">
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-custom">
                  {t('contact.successMessage')}
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-custom">
                  {t('contact.errorMessage')}
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('contact.form.name')} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-custom focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('contact.form.email')} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-custom focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('contact.form.subject')} *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-custom focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('contact.form.message')} *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-custom focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-white py-3 px-6 rounded-custom hover:bg-primary-dark transition-colors duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>{t('contact.form.sending')}</span>
                  </>
                ) : (
                  <>
                    <i className="bx bx-send"></i>
                    <span>{t('contact.form.send')}</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};