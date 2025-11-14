import React, { useState } from 'react';

interface CardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  details: string[];
}

export const Card: React.FC<CardProps> = ({
  title,
  description,
  image,
  technologies,
  githubUrl,
  liveUrl,
  details
}) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-custom shadow-custom overflow-hidden transition-transform duration-300 hover:scale-105">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-secondary dark:text-white">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-primary-light text-primary-dark rounded-full text-sm"
            >
              {tech}
            </span>
          ))}
        </div>

        {showDetails && (
          <ul className="mb-4 space-y-2 text-gray-600 dark:text-gray-300">
            {details.map((detail, index) => (
              <li key={index} className="text-sm">• {detail}</li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-primary hover:text-primary-dark font-medium text-sm"
          >
            {showDetails ? 'Voir moins' : 'Voir plus'}
          </button>
          
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-dark font-medium text-sm"
            >
              GitHub
            </a>
          )}
          
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-dark font-medium text-sm"
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};