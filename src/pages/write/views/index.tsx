import Loading from '@/components/ui/loading';
import { lazy, Suspense } from 'react';

const LazyWrite = lazy(() => import('../components'));

const Write: React.FC = () => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <LazyWrite />
      </Suspense>
    </>
  );
};

export default Write;
