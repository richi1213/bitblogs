const Mission: React.FC = () => {
  return (
    <section className='grid items-center gap-8 md:grid-cols-2'>
      <div className='space-y-4'>
        <h2 className='text-2xl font-semibold'>Our Mission</h2>
        <p className='text-md text-muted-foreground'>
          At BitBlogs, we believe in the power of shared knowledge. Our mission
          is to create a platform where tech enthusiasts, developers, and
          innovators can come together to share ideas, learn from each other,
          and push the boundaries of what's possible in the world of technology.
        </p>
      </div>
      <div className='relative h-64 md:h-full'>
        <img
          src='https://g-zwkebgiacpe.vusercontent.net/placeholder.svg?height=400&width=400'
          alt='Team Colaboration'
          className='rounded-lg'
        />
      </div>
    </section>
  );
};

export default Mission;
