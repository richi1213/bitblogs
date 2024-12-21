import { userAtom } from '@/atoms/auth';
import { defaultFormState, formAtom } from '@/atoms/blogs';
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
import { FancyMultiSelect } from '@/pages/write/components/ui/fancy-multi-select';
import { createBlogFormSchema } from '@/pages/write/utils/schemas/createBlogFormSchema';
import { AUTH_PATHS } from '@/routes/protected/is-authorized/auth/enums';
import { insertBlog, uploadImage } from '@/supabase/api/blogs';
import { BlogsInsertPayload } from '@/supabase/api/blogs/index.types';
import { Tag } from '@/supabase/api/tags/index.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAtom, useAtomValue } from 'jotai';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { z } from 'zod';

const BlogForm: React.FC = () => {
  const user = useAtomValue(userAtom);
  const [formState, setFormState] = useAtom(formAtom);
  const queryClient = useQueryClient();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const formSchema = createBlogFormSchema();

  type FormFields = z.infer<typeof formSchema>;

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
    defaultValues: formState || defaultFormState,
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
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      form.reset();
      localStorage.removeItem('blogFormState');
      setFormState(defaultFormState);
      navigate('/');
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
    if (!user.isLoggedIn) {
      toast({
        title: 'Authentication Required',
        description: 'Please log in to create a blog.',
        variant: 'destructive',
      });
      navigate(AUTH_PATHS.LOGIN, { state: { from: location.pathname } });
      return;
    }

    mutate(formValues);
    console.log(formValues);
  };

  const handleChange = (
    fieldName: keyof FormFields,
    value: string | undefined,
  ) => {
    setFormState((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const handleTagsChange = (tags: Tag[]) => {
    const tagIds = tags.map((tag) => tag.id);
    form.setValue('tags', tagIds);
    setFormState((prevState) => ({
      ...prevState,
      tags_ids: tagIds,
    }));
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
                <Input
                  {...field}
                  onBlur={() => form.trigger('titleEn')}
                  onChange={(e) => {
                    field.onChange(e);
                    handleChange('titleEn', e.target.value);
                  }}
                />
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
                <Input
                  {...field}
                  onBlur={() => form.trigger('titleKa')}
                  onChange={(e) => {
                    field.onChange(e);
                    handleChange('titleKa', e.target.value);
                  }}
                />
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
                  onChange={(e) => {
                    field.onChange(e);
                    handleChange('descriptionEn', e.target.value);
                  }}
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
                  onChange={(e) => {
                    field.onChange(e);
                    handleChange('descriptionKa', e.target.value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='tags'
          render={() => (
            <FormItem>
              <FormLabel className='text-foreground'>Tags</FormLabel>
              <FormControl>
                <FancyMultiSelect
                  selectedTagIds={formState.tags_ids}
                  onTagsChange={handleTagsChange}
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
