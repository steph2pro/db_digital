import React from 'react';
import { motion } from "motion/react";

interface ImageModalProps {
  image: string;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
  title: string;
}

export const ImageModal: React.FC<ImageModalProps> = ({ 
  image, 
  isOpen, 
  onClose, 
  onNext, 
  onPrev, 
  hasNext, 
  hasPrev, 
  title 
}) => {
  if (!isOpen) return null;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowRight' && hasNext) onNext();
    if (e.key === 'ArrowLeft' && hasPrev) onPrev();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center">
        {/* Bouton fermer */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors p-2"
        >
          <i className="bx bx-x text-3xl"></i>
        </button>

        {/* Bouton précédent */}
        {hasPrev && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors p-4"
          >
            <i className="bx bx-chevron-left text-4xl"></i>
          </button>
        )}

        {/* Image */}
        <div className="relative w-full h-full flex items-center justify-center p-8">
          <img
            src={image}
            alt={title}
            className="max-w-full max-h-full object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>

        {/* Bouton suivant */}
        {hasNext && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors p-4"
          >
            <i className="bx bx-chevron-right text-4xl"></i>
          </button>
        )}
      </div>
    </motion.div>
  );
};