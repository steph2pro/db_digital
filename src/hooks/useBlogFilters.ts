import { useState, useMemo } from 'react';
import { blogPosts, BlogPost } from '../data/blogData';

export const useBlogFilters = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'date' | 'views' | 'likes'>('date');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const filteredPosts = useMemo(() => {
    let filtered = blogPosts.filter(post => {
      // Recherche
      const matchesSearch = searchTerm === '' || 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      // Catégorie
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
      
      // Tags
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(tag => post.tags.includes(tag));
      
      return matchesSearch && matchesCategory && matchesTags;
    });

    // Tri
    filtered.sort((a, b) => {
      if (sortBy === 'date') return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === 'views') return b.views - a.views;
      return b.likes - a.likes;
    });

    return filtered;
  }, [searchTerm, selectedCategory, selectedTags, sortBy]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedTags,
    setSelectedTags,
    sortBy,
    setSortBy,
    currentPage,
    setCurrentPage,
    totalPages,
    currentPosts,
    totalPosts: filteredPosts.length
  };
};