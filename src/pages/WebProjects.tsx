import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ProjectCard } from '../components/sections/ProjectCard';
import { ProjectFilters } from '../components/sections/ProjectFilters';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { useApp } from '../contexts/AppContext';

export const WebProjects: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { getProjectsByCategory, state } = useApp();
  
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedSort, setSelectedSort] = useState<string>('newest');
  
  const allWebProjects = getProjectsByCategory('web');
  const currentLang = i18n.language as 'fr' | 'en';

  // Filtrer et trier les projets
  const filteredAndSortedProjects = useMemo(() => {
    let projects = [...allWebProjects];

    // Filtrage par statut
    if (selectedStatus !== 'all') {
      projects = projects.filter(project => project.status === selectedStatus);
    }

    // Tri
    projects.sort((a, b) => {
      switch (selectedSort) {
        case 'newest':
          return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
        case 'oldest':
          return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
        case 'name':
          return a.title[currentLang].localeCompare(b.title[currentLang]);
        default:
          return 0;
      }
    });

    return projects;
  }, [allWebProjects, selectedStatus, selectedSort, currentLang]);

  // Statistiques mises à jour basées sur les projets filtrés
  const stats = useMemo(() => ({
    total: filteredAndSortedProjects.length,
    completed: filteredAndSortedProjects.filter(p => p.status === 'completed').length,
    inProgress: filteredAndSortedProjects.filter(p => p.status === 'in-progress').length,
    planned: filteredAndSortedProjects.filter(p => p.status === 'planned').length,
    react: filteredAndSortedProjects.filter(p => 
      p.technologies.some(tech => tech.toLowerCase().includes('react'))
    ).length,
    vue: filteredAndSortedProjects.filter(p => 
      p.technologies.some(tech => tech.toLowerCase().includes('vue'))
    ).length,
    angular: filteredAndSortedProjects.filter(p => 
      p.technologies.some(tech => tech.toLowerCase().includes('angular'))
    ).length,
  }), [filteredAndSortedProjects]);

  if (state.isLoading) {
    return (
      <div className="min-h-screen py-20 bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mb-4" />
          <p className="text-gray-600 dark:text-gray-300">
            {t('common.loading')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-title text-secondary dark:text-white mb-4">
            {t('projects.web.title')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('projects.web.description')}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-900 rounded-custom shadow-custom p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">{stats.total}</div>
            <div className="text-gray-600 dark:text-gray-300">{t('projects.stats.total')}</div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-custom shadow-custom p-6 text-center">
            <div className="text-3xl font-bold text-green-500 mb-2">
              {stats.completed}
            </div>
            <div className="text-gray-600 dark:text-gray-300">{t('projects.stats.completed')}</div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-custom shadow-custom p-6 text-center">
            <div className="text-3xl font-bold text-blue-500 mb-2">
              {stats.react}
            </div>
            <div className="text-gray-600 dark:text-gray-300">React</div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-custom shadow-custom p-6 text-center">
            <div className="text-3xl font-bold text-purple-500 mb-2">
              {stats.vue}
            </div>
            <div className="text-gray-600 dark:text-gray-300">Vue.js</div>
          </div>
        </div>

        {/* Filters */}
        <ProjectFilters 
          category="web"
          selectedStatus={selectedStatus}
          selectedSort={selectedSort}
          onStatusChange={setSelectedStatus}
          onSortChange={setSelectedSort}
        />

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAndSortedProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>

        {filteredAndSortedProjects.length === 0 && !state.isLoading && (
          <div className="text-center py-12">
            <i className="bx bx-globe text-6xl text-gray-400 mb-4"></i>
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              {selectedStatus === 'all' 
                ? t('projects.noProjects')
                : t('project.noFilteredProjects', { status: t(`project.status.${selectedStatus}`) })
              }
            </p>
            {selectedStatus !== 'all' && (
              <button
                onClick={() => setSelectedStatus('all')}
                className="mt-4 px-4 py-2 bg-primary text-white rounded-custom hover:bg-primary-dark transition-colors"
              >
                {t('project.showAllProjects')}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};


// import React from 'react';
// import { useTranslation } from 'react-i18next';
// import { ProjectCard } from '../components/sections/ProjectCard';
// import { ProjectFilters } from '../components/sections/ProjectFilters';
// import { LoadingSpinner } from '../components/ui/LoadingSpinner';
// import { useApp } from '../contexts/AppContext';

// export const WebProjects: React.FC = () => {
//   const { t } = useTranslation();
//   const { getProjectsByCategory, state } = useApp();
  
//   const webProjects = getProjectsByCategory('web');

//   if (state.isLoading) {
//     return (
//       <div className="min-h-screen py-20 bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
//         <div className="text-center">
//           <LoadingSpinner size="lg" className="mb-4" />
//           <p className="text-gray-600 dark:text-gray-300">
//             {t('common.loading')}
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen py-20 bg-gray-50 dark:bg-gray-800">
//       <div className="container mx-auto px-6">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl md:text-5xl font-bold font-title text-secondary dark:text-white mb-4">
//             {t('projects.web.title')}
//           </h1>
//           <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
//             {t('projects.web.description')}
//           </p>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
//           <div className="bg-white dark:bg-gray-900 rounded-custom shadow-custom p-6 text-center">
//             <div className="text-3xl font-bold text-primary mb-2">{webProjects.length}</div>
//             <div className="text-gray-600 dark:text-gray-300">{t('projects.stats.total')}</div>
//           </div>
//           <div className="bg-white dark:bg-gray-900 rounded-custom shadow-custom p-6 text-center">
//             <div className="text-3xl font-bold text-green-500 mb-2">
//               {webProjects.filter(p => p.status === 'completed').length}
//             </div>
//             <div className="text-gray-600 dark:text-gray-300">{t('projects.stats.completed')}</div>
//           </div>
//           <div className="bg-white dark:bg-gray-900 rounded-custom shadow-custom p-6 text-center">
//             <div className="text-3xl font-bold text-blue-500 mb-2">
//               {webProjects.filter(p => p.technologies.includes('React')).length}
//             </div>
//             <div className="text-gray-600 dark:text-gray-300">React</div>
//           </div>
//           <div className="bg-white dark:bg-gray-900 rounded-custom shadow-custom p-6 text-center">
//             <div className="text-3xl font-bold text-purple-500 mb-2">
//               {webProjects.filter(p => p.technologies.includes('Vue.js')).length}
//             </div>
//             <div className="text-gray-600 dark:text-gray-300">Vue.js</div>
//           </div>
//         </div>

//         {/* Filters */}
//         <ProjectFilters category="web" />

//         {/* Projects Grid */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {webProjects.map((project, index) => (
//             <ProjectCard
//               key={project.id}
//               project={project}
//               index={index}
//             />
//           ))}
//         </div>

//         {webProjects.length === 0 && !state.isLoading && (
//           <div className="text-center py-12">
//             <i className="bx bx-globe text-6xl text-gray-400 mb-4"></i>
//             <p className="text-gray-500 dark:text-gray-400 text-lg">
//               {t('projects.noProjects')}
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };