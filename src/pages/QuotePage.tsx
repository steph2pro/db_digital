import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from "motion/react";
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import { ContactLayout } from '../components/sections/contact/ContactLayout';
import { budgetRanges, contactImages, quoteServices } from '../data/contactData';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  message: string;
  newsletter: boolean;
}

export const QuotePage: React.FC = () => {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    budget: '',
    message: '',
    newsletter: true
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });

  const steps = [
    { number: 1, title: t('contact.quote.steps.contact', 'Coordonnées'), icon: 'bx bx-user' },
    { number: 2, title: t('contact.quote.steps.project', 'Détails du projet'), icon: 'bx bx-briefcase' },
    { number: 3, title: t('contact.quote.steps.review', 'Récapitulatif'), icon: 'bx bx-check-circle' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Simuler l'envoi du formulaire
      setIsSubmitted(true);
      setTimeout(() => {
        // Réinitialiser après soumission
        setIsSubmitted(false);
        setCurrentStep(1);
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: '',
          budget: '',
          message: '',
          newsletter: true
        });
      }, 3000);
    }
  };

  return (
    <ContactLayout
      title="quote"
      subtitle={t('contact.quote.subtitle', 'Obtenez un devis personnalisé pour votre projet')}
      image={contactImages.quote}
    >
      <div ref={sectionRef} className="max-w-3xl mx-auto">
        {/* Barre de progression */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-8"
        >
          <div className="flex justify-between items-center">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className="flex flex-col items-center">
                  <motion.div
                    animate={{
                      scale: currentStep >= step.number ? [1, 1.2, 1] : 1,
                      backgroundColor: currentStep >= step.number ? '#00e676' : isDark ? '#374151' : '#E5E7EB'
                    }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      currentStep >= step.number ? 'text-white' : isDark ? 'text-gray-500' : 'text-gray-400'
                    }`}
                  >
                    {currentStep > step.number ? (
                      <i className="bx bx-check text-lg" />
                    ) : (
                      <i className={step.icon} />
                    )}
                  </motion.div>
                  <span className={`text-xs mt-2 ${
                    currentStep >= step.number
                      ? isDark ? 'text-white' : 'text-gray-900'
                      : isDark ? 'text-gray-500' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className="flex-1 h-1 mx-2 rounded-full bg-gray-300 dark:bg-gray-700">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: currentStep > index ? '100%' : '0%' }}
                      transition={{ duration: 0.5 }}
                      className="h-full rounded-full bg-gradient-to-r from-green-500 to-blue-600"
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>

        {/* Formulaire */}
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key={`step-${currentStep}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <form onSubmit={handleSubmit} className={`p-6 rounded-2xl backdrop-blur-sm border ${
                isDark
                  ? 'bg-gray-800/80 border-gray-700'
                  : 'bg-white/80 border-gray-200'
              }`}>
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <h3 className={`text-xl font-bold mb-6 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {t('contact.quote.contactInfo', 'Vos coordonnées')}
                    </h3>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${
                          isDark ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {t('contact.quote.name', 'Nom complet')} *
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
                          {t('contact.quote.email', 'Email')} *
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

                      <div>
                        <label className={`block text-sm font-medium mb-2 ${
                          isDark ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {t('contact.quote.phone', 'Téléphone')}
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
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
                          {t('contact.quote.company', 'Entreprise')}
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-500 transition-all ${
                            isDark
                              ? 'bg-gray-700 border-gray-600 text-white'
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-4">
                    <h3 className={`text-xl font-bold mb-6 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {t('contact.quote.projectInfo', 'Détails du projet')}
                    </h3>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {t('contact.quote.service', 'Service souhaité')} *
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-500 transition-all ${
                          isDark
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      >
                        <option value="">{t('contact.quote.selectService', 'Sélectionnez un service')}</option>
                        {quoteServices.map(service => (
                          <option key={service.id} value={service.id}>
                            {t(service.label)}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {t('contact.quote.budget', 'Budget estimé')}
                      </label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-500 transition-all ${
                          isDark
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      >
                        <option value="">{t('contact.quote.selectBudget', 'Sélectionnez une fourchette')}</option>
                        {budgetRanges.map(budget => (
                          <option key={budget.id} value={budget.id}>
                            {t(budget.label)}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {t('contact.quote.message', 'Message')} *
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
                        placeholder={'Décrivez votre projet...'}
                      />
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-6">
                    <h3 className={`text-xl font-bold mb-6 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {t('contact.quote.review', 'Récapitulatif')}
                    </h3>

                    <div className={`p-4 rounded-lg ${
                      isDark ? 'bg-gray-700/50' : 'bg-gray-100/50'
                    }`}>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <span className={`text-xs ${
                            isDark ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            {t('contact.quote.name', 'Nom')}
                          </span>
                          <p className={`font-medium ${
                            isDark ? 'text-white' : 'text-gray-900'
                          }`}>
                            {formData.name}
                          </p>
                        </div>
                        <div>
                          <span className={`text-xs ${
                            isDark ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            Email
                          </span>
                          <p className={`font-medium ${
                            isDark ? 'text-white' : 'text-gray-900'
                          }`}>
                            {formData.email}
                          </p>
                        </div>
                        {formData.phone && (
                          <div>
                            <span className={`text-xs ${
                              isDark ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                              {t('contact.quote.phone', 'Téléphone')}
                            </span>
                            <p className={`font-medium ${
                              isDark ? 'text-white' : 'text-gray-900'
                            }`}>
                              {formData.phone}
                            </p>
                          </div>
                        )}
                        {formData.company && (
                          <div>
                            <span className={`text-xs ${
                              isDark ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                              {t('contact.quote.company', 'Entreprise')}
                            </span>
                            <p className={`font-medium ${
                              isDark ? 'text-white' : 'text-gray-900'
                            }`}>
                              {formData.company}
                            </p>
                          </div>
                        )}
                        <div>
                          <span className={`text-xs ${
                            isDark ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            {t('contact.quote.service', 'Service')}
                          </span>
                          <p className={`font-medium ${
                            isDark ? 'text-white' : 'text-gray-900'
                          }`}>
                            {formData.service ? t(quoteServices.find(s => s.id === formData.service)?.label || '') : '-'}
                          </p>
                        </div>
                        <div>
                          <span className={`text-xs ${
                            isDark ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            {t('contact.quote.budget', 'Budget')}
                          </span>
                          <p className={`font-medium ${
                            isDark ? 'text-white' : 'text-gray-900'
                          }`}>
                            {formData.budget ? t(budgetRanges.find(b => b.id === formData.budget)?.label || '') : '-'}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <span className={`text-xs ${
                          isDark ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {t('contact.quote.message', 'Message')}
                        </span>
                        <p className={`text-sm mt-1 ${
                          isDark ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          {formData.message}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="newsletter"
                        id="newsletter"
                        checked={formData.newsletter}
                        onChange={handleInputChange}
                        className="w-4 h-4 rounded border-gray-300 text-green-500 focus:ring-green-500"
                      />
                      <label htmlFor="newsletter" className={`text-sm ${
                        isDark ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {t('contact.quote.newsletter', "Je souhaite recevoir la newsletter et les actualités")}
                      </label>
                    </div>
                  </div>
                )}

                <div className="flex justify-between mt-8">
                  {currentStep > 1 && (
                    <motion.button
                      type="button"
                      onClick={() => setCurrentStep(prev => prev - 1)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`px-6 py-2 rounded-lg border ${
                        isDark
                          ? 'bg-gray-700 text-white border-gray-600 hover:bg-gray-600'
                          : 'bg-gray-200 text-gray-700 border-gray-300 hover:bg-gray-300'
                      }`}
                    >
                      <i className="bx bx-chevron-left mr-2" />
                      {t('common.back', 'Retour')}
                    </motion.button>
                  )}
                  
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`px-8 py-2 bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold rounded-lg ${
                      currentStep === 1 ? 'ml-auto' : ''
                    }`}
                  >
                    {currentStep < 3 ? (
                      <>
                        {t('common.next', 'Suivant')}
                        <i className="bx bx-chevron-right ml-2" />
                      </>
                    ) : (
                      <>
                        <i className="bx bx-send mr-2" />
                        {t('contact.quote.submit', 'Envoyer la demande')}
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
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
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5 }}
                className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500 flex items-center justify-center"
              >
                <i className="bx bx-check text-3xl text-white" />
              </motion.div>
              <h3 className={`text-xl font-bold mb-2 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {t('contact.quote.success', 'Demande envoyée !')}
              </h3>
              <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                {t('contact.quote.successMessage', 'Nous vous répondrons sous 24h. Merci de votre confiance !')}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ContactLayout>
  );
};

export default QuotePage;