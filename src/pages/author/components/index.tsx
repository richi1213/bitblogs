import AuthorDetails from '@/pages/author/components/author-details';
import AuthorTabs from '@/pages/author/components/author-tabs';

const Author: React.FC = () => {
  return (
    <div>
      <AuthorDetails />
      <AuthorTabs />
    </div>
  );
};

export default Author;
