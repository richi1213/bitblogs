import React from 'react';
import Loading from '@/components/ui/loading';
import BlogCard from '@/pages/home/components/blog-card-wrapper/blog-card/blog-card';
import { useBlogContext } from '@/context/blogs/blog-context';

const BlogCardsWrapper: React.FC = () => {
  const { blogs, isLoading, isError } = useBlogContext();

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !blogs) {
    return <div>Error fetching blogs</div>;
  }

  return (
    <section className='flex flex-col space-y-8 md:w-2/3'>
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </section>
  );
};

export default BlogCardsWrapper;
