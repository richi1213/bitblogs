import { userAtom } from '@/atoms/auth';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { createBlogFormSchema } from '@/pages/write/utils/schemas/createBlogFormSchema';
import { insertBlog, uploadImage } from '@/supabase/api/blogs';
import { BlogsInsertPayload } from '@/supabase/api/blogs/index.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const BlogForm: React.FC = () => {
  const user = useAtomValue(userAtom);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const formSchema = createBlogFormSchema();

  type FormFields = z.infer<typeof formSchema>;

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
    defaultValues: {
      titleEn: '',
      titleKa: '',
      descriptionEn: '',
      descriptionKa: '',
      imageFile: undefined,
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (formValues: FormFields) => {
      const imageUrl = await uploadImage(formValues.imageFile);
      const insertBlogPayload: BlogsInsertPayload = {
        title_en: formValues.titleEn,
        title_ka: formValues.titleKa,
        description_en: formValues.descriptionEn,
        description_ka: formValues.descriptionKa,
        image_url: imageUrl || '',
        user_id: user.userInfo?.id || '',
      };
      return await insertBlog(insertBlogPayload);
    },
    onSuccess: () => {
      toast({
        variant: 'default',
        description: 'You have successfully posted your blog!',
      });
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      form.reset();
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to create blog.',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (formValues: FormFields) => {
    mutate(formValues);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-full space-y-4 sm:w-4/5'
      >
        <FormField
          control={form.control}
          name='titleEn'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-foreground'>Title (English)</FormLabel>
              <FormControl>
                <Input {...field} onBlur={() => form.trigger('titleEn')} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='titleKa'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-foreground'>
                Title (Georgian)
              </FormLabel>
              <FormControl>
                <Input {...field} onBlur={() => form.trigger('titleKa')} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='descriptionEn'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-foreground'>
                Description (English)
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  onBlur={() => form.trigger('descriptionEn')}
                  className='h-28'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='descriptionKa'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-foreground'>
                Description (Georgian)
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  onBlur={() => form.trigger('descriptionKa')}
                  className='h-28'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='imageFile'
          render={({ field: { onChange, value, ...rest } }) => (
            <FormItem>
              <FormLabel className='text-foreground'>Image</FormLabel>
              <FormControl>
                <Input
                  type='file'
                  accept='image/*'
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    onChange(file);
                  }}
                  {...rest}
                  onBlur={() => form.trigger('imageFile')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit'>Create Blog</Button>
      </form>
    </Form>
  );
};

export default BlogForm;
