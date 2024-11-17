import Loading from '@/components/ui/loading';
import { lazy, Suspense } from 'react';

const LazyLoginPage = lazy(() => import('../components'));

const LoginPage: React.FC = () => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <LazyLoginPage />
      </Suspense>
    </>
  );
};

export default LoginPage;
