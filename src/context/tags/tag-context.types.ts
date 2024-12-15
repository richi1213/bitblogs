import { Tag } from '@/supabase/api/tags/index.types';

export type TagContextType = {
  tags: Tag[] | null;
};
