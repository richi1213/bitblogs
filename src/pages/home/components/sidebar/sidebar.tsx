import FeaturedAuthorsCard from '@/pages/home/components/sidebar/featured-authors/featured-authors-card';
import PopularTagsCard from '@/pages/home/components/sidebar/popular-tags/popular-tags-card';

const SideBar: React.FC = () => {
  return (
    <aside className='space-y-8 md:w-1/3'>
      <PopularTagsCard />
      <FeaturedAuthorsCard />
    </aside>
  );
};

export default SideBar;
