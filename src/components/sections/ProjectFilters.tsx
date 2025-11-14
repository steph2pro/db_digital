import React from 'react';
import { useTranslation } from 'react-i18next';

interface ProjectFiltersProps {
  category: string;
  selectedStatus: string;
  selectedSort: string;
  onStatusChange: (status: string) => void;
  onSortChange: (sort: string) => void;
}

export const ProjectFilters: React.FC<ProjectFiltersProps> = ({ 
  category, 
  selectedStatus, 
  selectedSort, 
  onStatusChange, 
  onSortChange 
}) => {
  const { t } = useTranslation();

  const statusFilters = [
    { key: 'all', label: t('projects.filters.all') },
    { key: 'completed', label: t('project.status.completed') },
    { key: 'in-progress', label: t('project.status.in-progress') },
    { key: 'planned', label: t('project.status.planned') }
  ];

  const sortOptions = [
    { key: 'newest', label: t('projects.sort.newest') },
    { key: 'oldest', label: t('projects.sort.oldest') },
    { key: 'name', label: t('projects.sort.name') }
  ];

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      {/* Status Filters */}
      <div className="flex flex-wrap gap-2">
        {statusFilters.map((filter) => (
          <button
            key={filter.key}
            onClick={() => onStatusChange(filter.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedStatus === filter.key
                ? 'bg-primary text-white'
                : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Sort Dropdown */}
      <div className="md:ml-auto">
        <select 
          value={selectedSort}
          onChange={(e) => onSortChange(e.target.value)}
          className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-custom text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {sortOptions.map((option) => (
            <option key={option.key} value={option.key}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

// import React from 'react';
// import { useTranslation } from 'react-i18next';

// interface ProjectFiltersProps {
//   category: string;
// }

// export const ProjectFilters: React.FC<ProjectFiltersProps> = ({ category }) => {
//   const { t } = useTranslation();

//   const statusFilters = [
//     { key: 'all', label: t('projects.filters.all') },
//     { key: 'completed', label: t('project.status.completed') },
//     { key: 'in-progress', label: t('project.status.in-progress') },
//     { key: 'planned', label: t('project.status.planned') }
//   ];

//   const sortOptions = [
//     { key: 'newest', label: t('projects.sort.newest') },
//     { key: 'oldest', label: t('projects.sort.oldest') },
//     { key: 'name', label: t('projects.sort.name') }
//   ];

//   return (
//     <div className="flex flex-col md:flex-row gap-4 mb-8">
//       {/* Status Filters */}
//       <div className="flex flex-wrap gap-2">
//         {statusFilters.map((filter) => (
//           <button
//             key={filter.key}
//             className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
//               filter.key === 'all'
//                 ? 'bg-primary text-white'
//                 : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
//             }`}
//           >
//             {filter.label}
//           </button>
//         ))}
//       </div>

//       {/* Sort Dropdown */}
//       <div className="md:ml-auto">
//         <select className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-custom text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary">
//           {sortOptions.map((option) => (
//             <option key={option.key} value={option.key}>
//               {option.label}
//             </option>
//           ))}
//         </select>
//       </div>
//     </div>
//   );
// };