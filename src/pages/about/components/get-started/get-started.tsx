import { Button } from '@/components/ui/button';

const GetStarted: React.FC = () => {
  return (
    <section className='text-center'>
      <h2 className='mb-4 text-2xl font-semibold'>Join Us on Our Journey</h2>
      <p className='mb-6 text-sm text-muted-foreground'>
        Whether you're a seasoned developer, a curious beginner, or somewhere in
        between, there's a place for you at bitBlogs. Let's shape the future of
        technology together.
      </p>
      <Button className='h-10 px-8 text-sm text-foreground'>
        Get Started Today
      </Button>
    </section>
  );
};

export default GetStarted;
