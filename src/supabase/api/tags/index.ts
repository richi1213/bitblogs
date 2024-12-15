import { supabase } from '@/supabase';
import { Tag } from '@/supabase/api/tags/index.types';

export const fetchAllTags = async (): Promise<Tag[] | null> => {
  const { data, error } = await supabase
    .from('tags')
    .select('*')
    .throwOnError();

  if (error) {
    console.error('Error fetching tags:', error.message);
    return null;
  }

  return data as Tag[];
};
