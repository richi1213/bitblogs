import SideBar from '@/pages/home/components/sidebar/sidebar';
import BlogCardsWrapper from '@/pages/home/components/blog-card-wrapper/blog-cards';
import PopularTagsCard from '@/pages/home/components/sidebar/popular-tags/popular-tags-card';
import FeaturedAuthorsCard from '@/pages/home/components/sidebar/featured-authors/featured-authors-card';
import TagSlider from '@/pages/home/components/ui/tag-slider';

const Home: React.FC = () => {
  return (
    <>
      <TagSlider />
      <div className='container mt-2 grid gap-x-4 md:grid-cols-12'>
        <BlogCardsWrapper />
        <SideBar>
          <PopularTagsCard />
          <FeaturedAuthorsCard />
        </SideBar>
      </div>
    </>
  );
};

export default Home;
