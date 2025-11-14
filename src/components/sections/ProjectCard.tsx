import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from "motion/react"
import { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language as 'fr' | 'en';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white dark:bg-gray-900 rounded-custom shadow-custom overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105"
    >
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.images[0]}
          alt={project.title[currentLanguage]}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute top-4 left-4 flex space-x-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            project.status === 'completed' 
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : project.status === 'in-progress'
              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
              : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
          }`}>
            {t(`project.status.${project.status}`)}
          </span>
          {project.featured && (
            <span className="px-3 py-1 bg-accent text-white rounded-full text-sm font-medium">
              {t('project.featured')}
            </span>
          )}
          {project.isPrivate && (
            <span className="px-3 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded-full text-sm font-medium">
              <i className="bx bx-lock-alt mr-1"></i>
              {t('project.private')}
            </span>
          )}
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold font-title text-secondary dark:text-white mb-2 line-clamp-2">
          {project.title[currentLanguage]}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {project.description[currentLanguage]}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 3).map((tech, techIndex) => (
            <span
              key={techIndex}
              className="px-3 py-1 bg-primary-light text-primary-dark rounded-full text-xs font-medium"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full text-xs">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <Link
            to={`/projects/${project.id}`}
            className="text-primary hover:text-primary-dark transition-colors font-medium flex items-center space-x-1"
          >
            <span>{t('project.viewDetails')}</span>
            <i className="bx bx-chevron-right"></i>
          </Link>

          <div className="flex space-x-2">
            {project.isPrivate ? (
              <div 
                className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-300"
                title={t('project.private')|| ''}
              >
                <i className="bx bx-lock-alt"></i>
              </div>
            ) : (
              project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  title="GitHub"
                >
                  <i className="bx bxl-github"></i>
                </a>
              )
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary-dark transition-colors"
                title="Live Demo"
              >
                <i className="bx bx-link-external"></i>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// import React from 'react';
// import { useTranslation } from 'react-i18next';
// import { Link } from 'react-router-dom';
// import { motion } from "motion/react"
// import { Project } from '../../types';

// interface ProjectCardProps {
//   project: Project;
//   index: number;
// }

// export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
//   const { t, i18n } = useTranslation();
//   const currentLanguage = i18n.language as 'fr' | 'en';

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6, delay: index * 0.1 }}
//       className="bg-white dark:bg-gray-900 rounded-custom shadow-custom overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105"
//     >
//       {/* Project Image */}
//       <div className="relative h-48 overflow-hidden">
//         <img
//           src={project.images[0]}
//           alt={project.title[currentLanguage]}
//           className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
//         />
//         <div className="absolute top-4 left-4 flex space-x-2">
//           <span className={`px-3 py-1 rounded-full text-sm font-medium ${
//             project.status === 'completed' 
//               ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
//               : project.status === 'in-progress'
//               ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
//               : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
//           }`}>
//             {t(`project.status.${project.status}`)}
//           </span>
//           {project.featured && (
//             <span className="px-3 py-1 bg-accent text-white rounded-full text-sm font-medium">
//               {t('project.featured')}
//             </span>
//           )}
//         </div>
//       </div>

//       {/* Project Content */}
//       <div className="p-6">
//         <h3 className="text-xl font-semibold font-title text-secondary dark:text-white mb-2 line-clamp-2">
//           {project.title[currentLanguage]}
//         </h3>
        
//         <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
//           {project.description[currentLanguage]}
//         </p>

//         {/* Technologies */}
//         <div className="flex flex-wrap gap-2 mb-4">
//           {project.technologies.slice(0, 3).map((tech, techIndex) => (
//             <span
//               key={techIndex}
//               className="px-3 py-1 bg-primary-light text-primary-dark rounded-full text-xs font-medium"
//             >
//               {tech}
//             </span>
//           ))}
//           {project.technologies.length > 3 && (
//             <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full text-xs">
//               +{project.technologies.length - 3}
//             </span>
//           )}
//         </div>

//         {/* Action Buttons */}
//         <div className="flex items-center justify-between">
//           <Link
//             to={`/projects/${project.id}`}
//             className="text-primary hover:text-primary-dark transition-colors font-medium flex items-center space-x-1"
//           >
//             <span>{t('project.viewDetails')}</span>
//             <i className="bx bx-chevron-right"></i>
//           </Link>

//           <div className="flex space-x-2">
//             {project.githubUrl && (
//               <a
//                 href={project.githubUrl}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
//                 title="GitHub"
//               >
//                 <i className="bx bxl-github"></i>
//               </a>
//             )}
//             {project.liveUrl && (
//               <a
//                 href={project.liveUrl}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary-dark transition-colors"
//                 title="Live Demo"
//               >
//                 <i className="bx bx-link-external"></i>
//               </a>
//             )}
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };