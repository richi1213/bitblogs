import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { insertBlog, uploadImage } from '@/supabase/api/blogs';
import { BlogsInsertPayload } from '@/supabase/api/blogs/index.types';
import { BLOG_QUERY_KEYS } from '@/context/blogs/enums';
import { useAtomValue } from 'jotai';
import { userAtom } from '@/atoms/auth';

export const useCreateBlog = ({
  onSuccessCallback,
}: {
  onSuccessCallback: () => void;
}) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const user = useAtomValue(userAtom);

  const { mutate } = useMutation({
    mutationFn: async (formValues: any) => {
      const imageUrl = await uploadImage(formValues.imageFile);
      const insertBlogPayload: BlogsInsertPayload = {
        title_en: formValues.titleEn,
        title_ka: formValues.titleKa,
        description_en: formValues.descriptionEn,
        description_ka: formValues.descriptionKa,
        image_url: imageUrl || '',
        user_id: user.userInfo?.id,
        tag_ids: formValues.tags,
      };
      return await insertBlog(insertBlogPayload);
    },
    onSuccess: () => {
      toast({
        variant: 'default',
        description: 'You have successfully posted your blog!',
      });
      queryClient.invalidateQueries({ queryKey: [BLOG_QUERY_KEYS.BLOGS] });
      onSuccessCallback();
    },
    onError: (error: any) => {
      console.error(error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to create blog.',
        variant: 'destructive',
      });
    },
  });

  return { mutate };
};
