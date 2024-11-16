import FeaturedAuthorsCard from '@/pages/home/components/aside/featured-authors/featured-authors-card';
import PopularTagsCard from '@/pages/home/components/aside/popular-tags/popular-tags-card';

const Aside: React.FC = () => {
  return (
    <aside>
      <PopularTagsCard />
      <FeaturedAuthorsCard />
    </aside>
  );
};

export default Aside;
