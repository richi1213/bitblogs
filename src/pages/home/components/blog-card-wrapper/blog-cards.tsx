import Loading from '@/components/ui/loading';
import BlogCard from '@/pages/home/components/blog-card-wrapper/blog-card/blog-card';
import { fetchBlogs } from '@/supabase/api/blogs';
import { useQuery } from '@tanstack/react-query';

const BlogCardsWrapper: React.FC = () => {
  const {
    data: blogs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['blogs'],
    queryFn: () => fetchBlogs(),
  });

  console.log(blogs);

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
