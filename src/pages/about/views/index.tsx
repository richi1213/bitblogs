import Loading from '@/components/ui/loading';
import { lazy, Suspense } from 'react';

const LazyAbout = lazy(() => import('../components'));

const About: React.FC = () => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <LazyAbout />
      </Suspense>
    </>
  );
};

export default About;
