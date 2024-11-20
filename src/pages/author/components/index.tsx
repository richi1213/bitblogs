import AuthorDetails from '@/pages/author/components/author-details';
import AuthorTabs from '@/pages/author/components/author-tabs';

const Author: React.FC = () => {
  return (
    <div className='mx-auto max-w-4xl'>
      <AuthorDetails />
      <AuthorTabs />
    </div>
  );
};

export default Author;
