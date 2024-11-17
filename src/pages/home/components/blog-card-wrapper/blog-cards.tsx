import BlogCard from '@/pages/home/components/blog-card-wrapper/blog-card/blog-card';
import { useTranslation } from 'react-i18next';

const BlogCardsWrapper: React.FC = () => {
  const { t } = useTranslation('home-page');

  return (
    <section className='flex flex-col space-y-8 md:w-2/3'>
      <BlogCard
        title={t('blog-title')}
        author={t('author-name')}
        date={t('publication-date')}
        readTime={t('read-time')}
        excerpt={t('text')}
        tags={[t('tag1'), t('tag2'), t('tag3')]}
        imageUrl='https://g-zwkebgiacpe.vusercontent.net/placeholder.svg?height=200&width=400'
        href='/blog/post-slug'
      />
      <BlogCard
        title={t('blog-title')}
        author={t('author-name')}
        date={t('publication-date')}
        readTime={t('read-time')}
        excerpt={t('text')}
        tags={[t('tag1'), t('tag2'), t('tag3')]}
        imageUrl='https://g-zwkebgiacpe.vusercontent.net/placeholder.svg?height=200&width=400'
        href='/blog/post-slug'
      />
    </section>
  );
};

export default BlogCardsWrapper;
