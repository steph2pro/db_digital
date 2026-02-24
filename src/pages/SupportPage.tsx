import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from "motion/react";
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import { ContactLayout } from '../components/sections/contact/ContactLayout';
import { contactImages, supportCategories, supportFAQs } from '../data/contactData';

interface SupportTicketForm {
  name: string;
  email: string;
  category: string;
  subject: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  message: string;
  attachments?: FileList;
}

export const SupportPage: React.FC = () => {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState<'new' | 'faq' | 'status'>('new');
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);
  const [formData, setFormData] = useState<SupportTicketForm>({
    name: '',
    email: '',
    category: '',
    subject: '',
    priority: 'medium',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simuler l'envoi du ticket
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        category: '',
        subject: '',
        priority: 'medium',
        message: ''
      });
      setActiveTab('status');
    }, 2000);
  };

  return (
    <ContactLayout
      title="support"
      subtitle={t('contact.support.subtitle', 'Une équipe dédiée pour vous accompagner 24h/24')}
      image={contactImages.support}
    >
      <div ref={sectionRef} className="max-w-4xl mx-auto">
        {/* Onglets de navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {[
            { id: 'new', label: t('contact.support.tabs.new', 'Nouveau ticket'), icon: 'bx bx-plus-circle' },
            { id: 'faq', label: t('contact.support.tabs.faq', 'FAQ'), icon: 'bx bx-question-mark' },
            { id: 'status', label: t('contact.support.tabs.status', 'Suivi ticket'), icon: 'bx bx-time' }
          ].map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-green-500 to-blue-600 text-white shadow-lg'
                  : isDark
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              <i className={tab.icon} />
              <span className="text-sm font-medium">{tab.label}</span>
            </motion.button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          {activeTab === 'new' && (
            <motion.div
              key="new"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.3 }}
            >
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className={`p-6 rounded-2xl backdrop-blur-sm border ${
                  isDark
                    ? 'bg-gray-800/80 border-gray-700'
                    : 'bg-white/80 border-gray-200'
                }`}>
                  <h3 className={`text-xl font-bold mb-6 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {t('contact.support.newTicket', 'Ouvrir un ticket de support')}
                  </h3>

                  <div className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${
                          isDark ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {t('contact.support.name', 'Nom complet')} *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-500 transition-all ${
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
                          {t('contact.support.email', 'Email')} *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-500 transition-all ${
                            isDark
                              ? 'bg-gray-700 border-gray-600 text-white'
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${
                          isDark ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {t('contact.support.category', 'Catégorie')} *
                        </label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          required
                          className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-500 transition-all ${
                            isDark
                              ? 'bg-gray-700 border-gray-600 text-white'
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        >
                          <option value="">{t('contact.support.selectCategory', 'Choisir une catégorie')}</option>
                          {supportCategories.map(cat => (
                            <option key={cat.id} value={cat.id}>
                              {t(cat.label)}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className={`block text-sm font-medium mb-2 ${
                          isDark ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {t('contact.support.priority', 'Priorité')} *
                        </label>
                        <select
                          name="priority"
                          value={formData.priority}
                          onChange={handleInputChange}
                          required
                          className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-500 transition-all ${
                            isDark
                              ? 'bg-gray-700 border-gray-600 text-white'
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        >
                          <option value="low">{t('contact.support.priorities.low', 'Basse')}</option>
                          <option value="medium">{t('contact.support.priorities.medium', 'Moyenne')}</option>
                          <option value="high">{t('contact.support.priorities.high', 'Haute')}</option>
                          <option value="urgent">{t('contact.support.priorities.urgent', 'Urgente')}</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {t('contact.support.subject', 'Sujet')} *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-500 transition-all ${
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
                        {t('contact.support.message', 'Message')} *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={5}
                        className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-500 transition-all ${
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
                        {t('contact.support.attachments', 'Pièces jointes')}
                      </label>
                      <input
                        type="file"
                        multiple
                        className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-500 transition-all ${
                          isDark
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      />
                    </div>

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold rounded-lg"
                    >
                      <i className="bx bx-send mr-2" />
                      {t('contact.support.submit', 'Envoyer le ticket')}
                    </motion.button>
                  </div>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`p-8 rounded-2xl text-center ${
                    isDark
                      ? 'bg-gray-800/80 border-gray-700'
                      : 'bg-white/80 border-gray-200'
                  }`}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 mx-auto mb-4 border-4 border-green-500 border-t-transparent rounded-full"
                  />
                  <h3 className={`text-xl font-bold mb-2 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {t('contact.support.sending', 'Envoi en cours...')}
                  </h3>
                </motion.div>
              )}
            </motion.div>
          )}

          {activeTab === 'faq' && (
            <motion.div
              key="faq"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.3 }}
              className={`p-6 rounded-2xl backdrop-blur-sm border ${
                isDark
                  ? 'bg-gray-800/80 border-gray-700'
                  : 'bg-white/80 border-gray-200'
              }`}
            >
              <h3 className={`text-xl font-bold mb-6 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {t('contact.support.faq.title', 'Questions fréquentes')}
              </h3>

              <div className="space-y-3">
                {supportFAQs.map((faq) => (
                  <div
                    key={faq.id}
                    className={`border rounded-lg overflow-hidden ${
                      isDark ? 'border-gray-700' : 'border-gray-200'
                    }`}
                  >
                    <button
                      onClick={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
                      className={`w-full px-4 py-3 flex items-center justify-between text-left ${
                        isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                      }`}
                    >
                      <span className={`font-medium ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        {t(faq.questionKey)}
                      </span>
                      <motion.span
                        animate={{ rotate: openFAQ === faq.id ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <i className="bx bx-chevron-down text-xl" />
                      </motion.span>
                    </button>
                    
                    <AnimatePresence>
                      {openFAQ === faq.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className={`px-4 pb-3 ${
                            isDark ? 'text-gray-300' : 'text-gray-600'
                          }`}
                        >
                          {t(faq.answerKey)}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'status' && (
            <motion.div
              key="status"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.3 }}
              className={`p-6 rounded-2xl backdrop-blur-sm border ${
                isDark
                  ? 'bg-gray-800/80 border-gray-700'
                  : 'bg-white/80 border-gray-200'
              }`}
            >
              <h3 className={`text-xl font-bold mb-6 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {t('contact.support.status.title', 'Suivre votre ticket')}
              </h3>

              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {t('contact.support.ticketNumber', 'Numéro de ticket')}
                  </label>
                  <input
                    type="text"
                    placeholder="TICKET-2024-001"
                    className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-500 transition-all ${
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
                    {t('contact.support.emailTicket', 'Email associé')}
                  </label>
                  <input
                    type="email"
                    placeholder="client@exemple.com"
                    className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-500 transition-all ${
                      isDark
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-4 py-2 bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold rounded-lg"
                >
                  <i className="bx bx-search mr-2" />
                  {t('contact.support.track', 'Suivre mon ticket')}
                </motion.button>

                <div className={`mt-6 p-4 rounded-lg ${
                  isDark ? 'bg-gray-700/50' : 'bg-gray-100/50'
                }`}>
                  <p className={`text-sm ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    <i className="bx bx-info-circle text-green-500 mr-2" />
                    {t('contact.support.status.info', 'Un email avec votre numéro de ticket vous a été envoyé lors de la création.')}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contact direct */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="mt-8 grid sm:grid-cols-3 gap-4"
        >
          {[
            { icon: 'bx bx-phone', label: t('contact.support.hotline', 'Hotline'), value: '+237 657 128 712' },
            { icon: 'bx bx-envelope', label: 'Email', value: 'support@dbdigital.agency' },
            { icon: 'bx bx-chat', label: t('contact.support.livechat', 'Live Chat'), value: t('contact.support.available', 'Disponible 24h/24') }
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02, y: -3 }}
              className={`p-4 rounded-xl backdrop-blur-sm border text-center ${
                isDark
                  ? 'bg-gray-800/50 border-gray-700'
                  : 'bg-white/50 border-gray-200'
              }`}
            >
              <i className={`${item.icon} text-2xl text-green-500 mb-2`} />
              <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {item.label}
              </div>
              <div className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {item.value}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </ContactLayout>
  );
};

export default SupportPage;