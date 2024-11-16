import BlogCard from '@/pages/home/components/blog-card-wrapper/blog-card/blog-card';

const BlogCardsWrapper: React.FC = () => {
  return (
    <section>
      <BlogCard
        title='Your Title'
        author='Author Name'
        date='Publication Date'
        readTime='Read Time'
        excerpt='Your excerpt text...'
        tags={['Tag1', 'Tag2', 'Tag3']}
        imageUrl='https://g-zwkebgiacpe.vusercontent.net/placeholder.svg?height=200&width=400'
        href='/blog/post-slug'
      />
      <BlogCard
        title='Your Title'
        author='Author Name'
        date='Publication Date'
        readTime='Read Time'
        excerpt='Your excerpt text...'
        tags={['Tag1', 'Tag2', 'Tag3']}
        imageUrl='https://g-zwkebgiacpe.vusercontent.net/placeholder.svg?height=200&width=400'
        href='/blog/post-slug'
      />
    </section>
  );
};

export default BlogCardsWrapper;
