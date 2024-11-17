import Loading from '@/components/ui/loading';
import { lazy, Suspense } from 'react';

const LazyRegisterPage = lazy(() => import('../components'));

const LoginPage: React.FC = () => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <LazyRegisterPage />
      </Suspense>
    </>
  );
};

export default LoginPage;
