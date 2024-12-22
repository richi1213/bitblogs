import { Tag } from '@/supabase/api/tags/index.types';
import { UseQueryOptions } from '@tanstack/react-query';

export type UseGetTagsProps<T> = {
  queryOptions?: Omit<UseQueryOptions<Tag[], any, T>, 'queryKey'>;
};
