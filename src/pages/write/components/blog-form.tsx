import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';
import { createBlogFormSchema } from '@/pages/write/utils/schemas/createBlogFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

const BlogForm: React.FC = () => {
  const formSchema = createBlogFormSchema();

  type FormFields = z.infer<typeof formSchema>;

  const { handleSubmit, control } = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titleEn: '',
      titleKa: '',
      descriptionEn: '',
      descriptionKa: '',
      image: undefined,
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
      <Controller
        control={control}
        name='titleEn'
        render={({ field: { onChange, value } }) => (
          <Input
            onChange={onChange}
            value={value}
            placeholder='Title (English)'
          />
        )}
      />

      <Controller
        control={control}
        name='titleKa'
        render={({ field: { onChange, value } }) => (
          <Input
            onChange={onChange}
            value={value}
            placeholder='Title (Georgian)'
          />
        )}
      />

      <Controller
        control={control}
        name='descriptionEn'
        render={({ field: { onChange, value } }) => (
          <Input
            onChange={onChange}
            value={value}
            placeholder='Description (English)'
          />
        )}
      />
      <Controller
        control={control}
        name='descriptionKa'
        render={({ field: { onChange, value } }) => (
          <Input
            onChange={onChange}
            value={value}
            placeholder='Description (Georgian)'
          />
        )}
      />
      <Controller
        control={control}
        name='image'
        render={({ field: { onChange } }) => (
          <input
            type='file'
            accept='image/*'
            onChange={(e) => {
              const file = e.target.files?.[0];
              onChange(file);
            }}
          />
        )}
      />
      <Button type='submit'>Submit</Button>
    </form>
  );
};

export default BlogForm;
