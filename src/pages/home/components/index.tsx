import SideBar from '@/pages/home/components/sidebar/sidebar';
import BlogCardsWrapper from '@/pages/home/components/blog-card-wrapper/blog-cards';

const Home: React.FC = () => {
  return (
    <div className='container mx-auto flex flex-col gap-8 md:flex-row'>
      <BlogCardsWrapper />
      <SideBar />
    </div>
  );
};

export default Home;
