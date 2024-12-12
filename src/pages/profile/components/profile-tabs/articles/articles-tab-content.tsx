import Loading from '@/components/ui/loading';
import { TabsContent } from '@/components/ui/tabs';
import { useBlogContext } from '@/context/blogs/blog-context';
import BlogCard from '@/pages/home/components/blog-card-wrapper/blog-card/blog-card';

const ArticlesTabContent: React.FC = () => {
  const { blogs, isLoading, isError } = useBlogContext();

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !blogs) {
    return <div>Error fetching blogs</div>;
  }

  return (
    <TabsContent value='articles' className='flex flex-col gap-6'>
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </TabsContent>
  );
};

export default ArticlesTabContent;
