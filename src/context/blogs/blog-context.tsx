import React, { createContext, useContext, useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchBlogs, searchBlogs } from '@/supabase/api/blogs';
import { BlogContextType } from '@/context/blogs/blog-context.types';
const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [searchText, setSearchText] = useState<string | null>(null);

  const {
    data: blogs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['blogs', { searchText }],
    queryFn: ({ queryKey }) => {
      const [, { searchText }] = queryKey as [string, { searchText: string }];
      return searchText ? searchBlogs(searchText) : fetchBlogs();
    },
    staleTime: 10 * 60 * 1000,
    placeholderData: [],
  });

  const blogContextValue = useMemo(
    () => ({
      blogs,
      isLoading,
      isError,
      setSearchText,
    }),
    [blogs, isLoading, isError],
  );

  return (
    <BlogContext.Provider value={blogContextValue}>
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
