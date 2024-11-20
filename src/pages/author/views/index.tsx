import Loading from '@/components/ui/loading';
import { lazy, Suspense } from 'react';

const LazyAuthorPage = lazy(() => import('../components'));

const AuthorPage: React.FC = () => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <LazyAuthorPage />
      </Suspense>
    </>
  );
};

export default AuthorPage;
