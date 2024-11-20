import Loading from '@/components/ui/loading';
import { lazy, Suspense } from 'react';

const LazyDashboard = lazy(() => import('../components'));

const DashboardPage: React.FC = () => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <LazyDashboard />
      </Suspense>
    </>
  );
};

export default DashboardPage;
