import Loading from '@/components/ui/loading';
import { lazy, Suspense } from 'react';

const LazyEditProfilePage = lazy(() => import('../components'));

const AuthorPage: React.FC = () => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <LazyEditProfilePage />
      </Suspense>
    </>
  );
};

export default AuthorPage;
