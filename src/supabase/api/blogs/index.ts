import { supabase } from '@/supabase';
import { BlogRow, BlogsInsertPayload } from '@/supabase/api/blogs/index.types';

export const uploadImage = async (imageFile: File | undefined) => {
  if (!imageFile) throw new Error('Image file is required');
  const { data, error } = await supabase.storage
    .from('blog_images')
    .upload(imageFile.name, imageFile);
  if (error) throw error;
  return data?.fullPath;
};

export const insertBlog = async (payload: BlogsInsertPayload) => {
  const { data, error } = await supabase.from('blogs').insert(payload).select();

  if (error) {
    console.error('Error inserting blog:', error.message);
    throw error;
  }

  return data;
};

export const fetchBlogs = async (): Promise<BlogRow[] | null> => {
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

export const searchBlogs = async (
  searchTerm: string,
): Promise<BlogRow[] | null> => {
  if (!searchTerm.trim()) {
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .or(`title_en.ilike.%${searchTerm}%,description_en.ilike.%${searchTerm}%`)
      .throwOnError();

    if (error) {
      console.error('Error searching blogs:', error.message);
      return null;
    }

    return data as BlogRow[];
  } catch (error) {
    console.error('Error searching blogs:', error);
    return null;
  }
};
