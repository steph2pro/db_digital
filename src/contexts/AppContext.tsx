import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Project, BlogPost, Training } from '../types';
import { projects as projectsData } from '../data/projects/';
import { trainingsData } from '../data/trainings';

interface AppState {
  projects: Project[];
  blogPosts: BlogPost[];
  filteredProjects: Project[];
  searchQuery: string;
  currentCategory: string;
  isLoading: boolean;
}

type AppAction =
  | { type: 'SET_PROJECTS'; payload: Project[] }
  | { type: 'SET_BLOG_POSTS'; payload: BlogPost[] }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_CATEGORY'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean };

const initialState: AppState = {
  projects: [],
  blogPosts: [],
  filteredProjects: [],
  searchQuery: '',
  currentCategory: 'all',
  isLoading: true // Commence en true pour afficher le loading
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_PROJECTS':
      return {
        ...state,
        projects: action.payload,
        filteredProjects: action.payload
      };
    case 'SET_BLOG_POSTS':
      return { ...state, blogPosts: action.payload };
    case 'SET_SEARCH_QUERY':
      const filteredBySearch = state.projects.filter(project =>
        project.title.fr.toLowerCase().includes(action.payload.toLowerCase()) ||
        project.title.en.toLowerCase().includes(action.payload.toLowerCase()) ||
        project.technologies.some(tech => 
          tech.toLowerCase().includes(action.payload.toLowerCase())
        )
      );
      return {
        ...state,
        searchQuery: action.payload,
        filteredProjects: filteredBySearch
      };
    case 'SET_CATEGORY':
      const filteredByCategory = action.payload === 'all' 
        ? state.projects 
        : state.projects.filter(project => project.category === action.payload);
      return {
        ...state,
        currentCategory: action.payload,
        filteredProjects: filteredByCategory
      };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  getProjectById: (id: string) => Project | undefined;
  getFeaturedProjects: () => Project[];
  getProjectsByCategory: (category: string) => Project[];
  getTrainingById: (id: string) => Training | undefined;
} | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const getProjectById = (id: string) => {
    return state.projects.find(project => project.id === id);
  };

  const getFeaturedProjects = () => {
    return state.projects.filter(project => project.featured);
  };

  const getProjectsByCategory = (category: string) => {
    return state.projects.filter(project => project.category === category);
  };
  const getTrainingById = (id: string): Training | undefined => {
    return trainingsData.find(training => training.id === id);
  };

  // Chargement des données depuis le fichier projects.ts
  useEffect(() => {
    const loadData = async () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        
        // Simulation d'un délai de chargement (optionnel)
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Chargement des projets depuis les données statiques
        dispatch({ type: 'SET_PROJECTS', payload: projectsData });
        
        // Ici vous pourriez aussi charger les articles de blog depuis une API
        // const blogPosts = await fetchBlogPosts();
        // dispatch({ type: 'SET_BLOG_POSTS', payload: blogPosts });
        
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    loadData();
  }, []);

  return (
    <AppContext.Provider value={{
      state,
      dispatch,
      getProjectById,
      getFeaturedProjects,
      getProjectsByCategory,
      getTrainingById
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};