import Loading from '@/components/ui/loading';
import { lazy, Suspense } from 'react';

const LazyHomePage = lazy(() => import('../components'));

const HomePage: React.FC = () => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <LazyHomePage />
      </Suspense>
    </>
  );
};

export default HomePage;
