import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Dot, User } from 'lucide-react';
import { Tables } from '@/supabase/supabase.types';

type Blog = Tables<'blogs'>;

type BlogCardProps = {
  blog: Blog;
  tags?: string[];
  author: string;
  read_time?: number;
};

const BlogCard: React.FC<BlogCardProps> = ({ blog, author }) => {
  const { title_en, created_at, image_url, description_en } = blog;

  const blogImageUrl = image_url
    ? `${import.meta.env.VITE_SUPABASE_BLOG_IMAGES_STORAGE_URL}/${image_url}`
    : '';

  const date = new Date(created_at).toLocaleDateString();

  return (
    <Card className='overflow-hidden p-4 transition-all hover:shadow-lg'>
      <div className='relative'>
        <img
          src={blogImageUrl}
          alt={title_en || ''}
          className='h-[200px] w-full rounded-lg object-cover'
        />
      </div>
      <CardHeader>
        <div className='space-y-1'>
          <h2 className='text-2xl font-bold tracking-tight hover:text-primary'>
            {title_en}
          </h2>
          <div className='flex items-center gap-4 text-sm text-muted-foreground'>
            <div className='flex items-center gap-1'>
              <User className='size-4' />
              <span className='hover:underline'>{author || 'TEMP AUTHOR'}</span>
            </div>
            <Dot />
            <span>{date}</span>
            <Dot />
            {/* <div className='flex items-center gap-1'>
              <Clock className='size-4' />
              <span>{read_time || '5 min read'}</span>
            </div> */}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className='text-muted-foreground'>
          {description_en || 'No description available'}
        </p>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
