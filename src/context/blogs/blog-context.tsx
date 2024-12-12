import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchBlogs } from '@/supabase/api/blogs';
import { BlogContextType } from '@/context/blogs/blog-context.types';

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const {
    data: blogs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['blogs'],
    queryFn: fetchBlogs,
    staleTime: 10 * 60 * 1000,
  });

  return (
    <BlogContext.Provider value={{ blogs, isLoading, isError }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlogContext = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlogContext must be used within a BlogProvider');
  }
  return context;
};
