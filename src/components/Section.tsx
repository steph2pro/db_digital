import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface SectionProps {
  children: React.ReactNode;
  id: string;
  className?: string;
  variant?: 'light' | 'primary-light';
}

export const Section: React.FC<SectionProps> = ({ 
  children, 
  id, 
  className = '',
  variant = 'light'
}) => {
  const ref = useScrollReveal();

  const variants = {
    light: "bg-tertiary",
    'primary-light': "bg-primary-light"
  };

  return (
    <section
      id={id}
      ref={ref}
      className={`py-20 px-5 md:px-20 rounded-custom shadow-custom transition-opacity duration-500 opacity-0 ${variants[variant]} ${className}`}
    >
      {children}
    </section>
  );
};