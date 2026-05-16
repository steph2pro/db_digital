import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Project } from '../../../data/realisationsData';

interface RealisationsCardProps {
  project: Project;
  lang: 'fr' | 'en';
  index: number;
  onOpen: () => void;
}

export const RealisationsCard: React.FC<RealisationsCardProps> = ({
  project,
  lang,
  index,
  onOpen,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onOpen}
      style={{
        borderRadius: 16,
        overflow: 'hidden',
        cursor: 'pointer',
        backgroundColor: '#111',
        border: '1px solid rgba(255,255,255,0.08)',
        transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.4)' : '0 4px 12px rgba(0,0,0,0.2)',
      }}
    >
      {/* Image section */}
      <div style={{ position: 'relative', height: 220, overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${project.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
          }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)',
        }} />

        {/* Year badge */}
        <div style={{
          position: 'absolute',
          top: 14,
          right: 14,
          fontSize: 11,
          fontWeight: 700,
          padding: '4px 10px',
          borderRadius: 6,
          backgroundColor: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(8px)',
          color: 'rgba(255,255,255,0.8)',
          letterSpacing: '0.05em',
        }}>
          {project.year}
        </div>

        {/* Accent dot */}
        <div style={{
          position: 'absolute',
          top: 14,
          left: 14,
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: project.accent,
          boxShadow: `0 0 12px ${project.accent}`,
        }} />
      </div>

      {/* Content section */}
      <div style={{ padding: '20px 22px 24px' }}>
        <h3 style={{
          margin: '0 0 6px',
          fontSize: '1.1rem',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          color: '#fff',
          fontFamily: "'Outfit', sans-serif",
        }}>
          {project.title[lang]}
        </h3>

        <p style={{
          margin: '0 0 14px',
          fontSize: '0.8rem',
          fontWeight: 500,
          color: project.accent,
          letterSpacing: '0.02em',
        }}>
          {project.tagline[lang]}
        </p>

        <p style={{
          margin: 0,
          fontSize: '0.85rem',
          lineHeight: 1.6,
          color: 'rgba(255,255,255,0.5)',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {project.description[lang]}
        </p>

        {/* Tags */}
        <div style={{
          display: 'flex',
          gap: 6,
          flexWrap: 'wrap',
          marginTop: 16,
          paddingTop: 14,
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}>
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} style={{
              fontSize: 9,
              fontWeight: 600,
              padding: '3px 8px',
              borderRadius: 4,
              backgroundColor: 'rgba(255,255,255,0.06)',
              color: 'rgba(255,255,255,0.5)',
              letterSpacing: '0.03em',
            }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 16,
        }}>
          <span style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: project.accent,
          }}>
            {lang === 'fr' ? 'Découvrir →' : 'Discover →'}
          </span>

          <div style={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            backgroundColor: `${project.accent}15`,
            border: `1px solid ${project.accent}30`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: hovered ? 'rotate(45deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease',
          }}>
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke={project.accent} strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
};