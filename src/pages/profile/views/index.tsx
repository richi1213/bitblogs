import Loading from '@/components/ui/loading';
import { lazy, Suspense } from 'react';

const LazyProfile = lazy(() => import('../components'));

const DashboardPage: React.FC = () => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <LazyProfile />
      </Suspense>
    </>
  );
};

export default DashboardPage;
