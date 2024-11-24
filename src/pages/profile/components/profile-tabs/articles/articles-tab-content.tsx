import { TabsContent } from '@/components/ui/tabs';
import BlogCard from '@/pages/home/components/blog-card-wrapper/blog-card/blog-card';
import { useTranslation } from 'react-i18next';

const ArticlesTabContent: React.FC = () => {
  const { t: blogT } = useTranslation('home-page');
  return (
    <TabsContent value='articles' className='flex flex-col gap-6'>
      <BlogCard
        title={blogT('blog-title')}
        author={blogT('author-name')}
        date={blogT('publication-date')}
        readTime={blogT('read-time')}
        excerpt={blogT('text')}
        tags={[blogT('tag1'), blogT('tag2'), blogT('tag3')]}
        imageUrl='https://g-zwkebgiacpe.vusercontent.net/placeholder.svg?height=200&width=400'
        href='/blog/post-slug'
      />
      <BlogCard
        title={blogT('blog-title')}
        author={blogT('author-name')}
        date={blogT('publication-date')}
        readTime={blogT('read-time')}
        excerpt={blogT('text')}
        tags={[blogT('tag1'), blogT('tag2'), blogT('tag3')]}
        imageUrl='https://g-zwkebgiacpe.vusercontent.net/placeholder.svg?height=200&width=400'
        href='/blog/post-slug'
      />
      <BlogCard
        title={blogT('blog-title')}
        author={blogT('author-name')}
        date={blogT('publication-date')}
        readTime={blogT('read-time')}
        excerpt={blogT('text')}
        tags={[blogT('tag1'), blogT('tag2'), blogT('tag3')]}
        imageUrl='https://g-zwkebgiacpe.vusercontent.net/placeholder.svg?height=200&width=400'
        href='/blog/post-slug'
      />
    </TabsContent>
  );
};

export default ArticlesTabContent;
