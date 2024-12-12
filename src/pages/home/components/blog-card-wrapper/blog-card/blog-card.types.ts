import { Tables } from '@/supabase/supabase.types';

type Blog = Tables<'blogs'>;

export type BlogCardProps = {
  blog: Blog;
};
