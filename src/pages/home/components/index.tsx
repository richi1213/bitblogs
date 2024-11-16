import Aside from '@/pages/home/components/aside/aside';
import BlogCardsWrapper from '@/pages/home/components/blog-card-wrapper/blog-cards';

const Home: React.FC = () => {
  return (
    <>
      <BlogCardsWrapper />
      <Aside />
    </>
  );
};

export default Home;
