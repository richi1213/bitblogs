import { createBlogFormSchema } from '@/pages/write/utils/schemas/createBlogFormSchema';
import { supabase } from '@/supabase';
import { Tables } from '@/supabase/supabase.types';
import { z } from 'zod';

type BlogRow = Tables<'blogs'>;

const formSchema = createBlogFormSchema();
type FormFields = z.infer<typeof formSchema>;

export const uploadImage = async (imageFile: File | undefined) => {
  if (!imageFile) throw new Error('Image file is required');
  const { data, error } = await supabase.storage
    .from('blog_images')
    .upload(imageFile.name, imageFile);
  if (error) throw error;
  return data?.fullPath;
};

export const insertBlog = async (
  formValues: FormFields,
  imageUrl: string,
  userId: string,
) => {
  const { error } = await supabase.from('blogs').insert({
    title_en: formValues.titleEn,
    title_ka: formValues.titleKa,
    description_en: formValues.descriptionEn,
    description_ka: formValues.descriptionKa,
    image_url: imageUrl,
    user_id: userId,
  });
  if (error) throw error;
};

export const fetchBlogs = async () => {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .throwOnError();

  if (error) {
    console.error('Error fetching blogs:', error.message);
    return null;
  }

  return data as BlogRow[];
};
