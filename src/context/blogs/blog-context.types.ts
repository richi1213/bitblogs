import { BlogRow } from '@/supabase/api/blogs/index.types';

export type BlogContextType = {
  blogs: BlogRow[] | null | undefined;
  isLoading: boolean;
  isError: boolean;
};
