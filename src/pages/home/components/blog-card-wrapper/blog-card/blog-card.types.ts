import { Tables } from '@/supabase/supabase.types';

export type Blog = Tables<'blogs'>;

export type BlogCardProps = {
  blog: Blog;
};
