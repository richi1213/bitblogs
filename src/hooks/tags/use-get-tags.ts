import { TAGS_QUERY_KEYS } from '@/context/tags/enums';
import { UseGetTagsProps } from '@/hooks/tags/types';
import { fetchAllTags } from '@/supabase/api/tags';
import { Tag } from '@/supabase/api/tags/index.types';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export const useGetTags = <T>({
  queryOptions,
}: UseGetTagsProps<T> = {}): UseQueryResult<T, any> => {
  return useQuery<Tag[], any, T>({
    queryKey: [TAGS_QUERY_KEYS.TAGS],
    queryFn: fetchAllTags,
    ...queryOptions,
  });
};
