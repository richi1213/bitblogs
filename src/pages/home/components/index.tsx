import SideBar from '@/pages/home/components/sidebar/sidebar';
import BlogCardsWrapper from '@/pages/home/components/blog-card-wrapper/blog-cards';
import PopularTagsCard from '@/pages/home/components/sidebar/popular-tags/popular-tags-card';
import FeaturedAuthorsCard from '@/pages/home/components/sidebar/featured-authors/featured-authors-card';
import { BlogProvider } from '@/context/blogs/blog-context';

const Home: React.FC = () => {
  return (
    <div className='container mx-auto flex flex-col gap-8 md:flex-row'>
      <BlogProvider>
        <BlogCardsWrapper />
      </BlogProvider>
      <SideBar>
        <PopularTagsCard />
        <FeaturedAuthorsCard />
      </SideBar>
    </div>
  );
};

export default Home;
