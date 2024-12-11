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
import { createBlogFormSchema } from '@/pages/write/utils/schemas/createBlogFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const BlogForm: React.FC = () => {
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

  const onSubmit = (formValues: FormFields) => {
    console.log(formValues);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
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
