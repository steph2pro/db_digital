import React, { useState, useRef } from 'react';
import { motion, useInView } from "motion/react";
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import { AboutLayout } from '../components/sections/about/AboutLayout';
import { aboutImages } from '../data/aboutData';

interface JobApplication {
  fullName: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  message: string;
  cv: File | null;
}

export const CareersPage: React.FC = () => {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [, setSelectedPosition] = useState<string>('');
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<JobApplication>({
    fullName: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    message: '',
    cv: null
  });

  const positions = [
    { value: 'developer', label: t('careers.positions.developer') },
    { value: 'designer', label: t('careers.positions.designer') },
    { value: 'project-manager', label: t('careers.positions.projectManager') },
    { value: 'marketing', label: t('careers.positions.marketing') },
    { value: 'sales', label: t('careers.positions.sales') },
    { value: 'other', label: t('careers.positions.other') }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'position') setSelectedPosition(value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file && file.type !== 'application/pdf' && file.type !== 'application/msword' && file.type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      alert(t('careers.errors.fileType'));
      return;
    }
    if (file && file.size > 5 * 1024 * 1024) {
      alert(t('careers.errors.fileSize'));
      return;
    }
    setFormData(prev => ({ ...prev, cv: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simuler l'envoi (à remplacer par votre API)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Candidature soumise:', formData);
    setSubmitted(true);
    setIsLoading(false);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      position: '',
      experience: '',
      message: '',
      cv: null
    });
    if (fileInputRef.current) fileInputRef.current.value = '';
    
    setTimeout(() => setSubmitted(false), 5000);
  };

  const values = [
    { icon: 'bx bx-trending-up', titleKey: 'careers.values.innovation.title', descKey: 'careers.values.innovation.desc', color: '#3B82F6' },
    { icon: 'bx bx-group', titleKey: 'careers.values.collaboration.title', descKey: 'careers.values.collaboration.desc', color: '#10B981' },
    { icon: 'bx bx-rocket', titleKey: 'careers.values.excellence.title', descKey: 'careers.values.excellence.desc', color: '#F59E0B' },
    { icon: 'bx bx-heart', titleKey: 'careers.values.passion.title', descKey: 'careers.values.passion.desc', color: '#EC4899' }
  ];

  return (
    <AboutLayout
      title="careers"
      subtitle={t('careers.subtitle')}
      image={aboutImages.careers || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=600&fit=crop'}
    >
      <div ref={sectionRef} className="space-y-12">
        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className={`text-2xl md:text-3xl font-display font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {t('careers.title')}
          </h2>
          <p className={`text-base ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {t('careers.description')}
          </p>
        </motion.div>

        {/* Valeurs de l'entreprise */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          <h3 className={`text-xl font-bold text-center mb-8 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {t('careers.values.title')}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.3 + index * 0.1 }}
                className={`p-6 rounded-xl text-center ${
                  isDark ? 'bg-gray-800/50' : 'bg-white/50'
                } backdrop-blur-sm border border-gray-200 dark:border-gray-700`}
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center"
                  style={{ background: `${value.color}20` }}>
                  <i className={`${value.icon} text-2xl`} style={{ color: value.color }} />
                </div>
                <h4 className={`font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t(value.titleKey)}
                </h4>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {t(value.descKey)}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Formulaire de candidature */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="max-w-3xl mx-auto"
        >
          <div className={`p-8 rounded-xl ${
            isDark ? 'bg-gray-800/50' : 'bg-white/50'
          } backdrop-blur-sm border border-gray-200 dark:border-gray-700`}>
            <h3 className={`text-xl font-bold text-center mb-6 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {t('careers.form.title')}
            </h3>

            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-500 text-center"
              >
                {t('careers.form.success')}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {t('careers.form.fullName')} *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                      isDark
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {t('careers.form.email')} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                      isDark
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {t('careers.form.phone')}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                      isDark
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {t('careers.form.position')} *
                  </label>
                  <select
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                      isDark
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="">{t('careers.form.selectPosition')}</option>
                    {positions.map(pos => (
                      <option key={pos.value} value={pos.value}>{pos.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {t('careers.form.experience')}
                </label>
                <textarea
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  rows={3}
                  placeholder={t('careers.form.experiencePlaceholder') as string}
                  className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    isDark
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {t('careers.form.message')}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder={t('careers.form.messagePlaceholder') as string}
                  className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    isDark
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {t('careers.form.cv')} * (PDF, DOC, DOCX - max 5MB)
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    isDark
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 rounded-lg font-bold transition-all duration-300 ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-500 to-blue-600 text-white hover:shadow-lg hover:scale-105'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {t('careers.form.sending')}
                  </div>
                ) : (
                  t('careers.form.submit')
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </AboutLayout>
  );
};