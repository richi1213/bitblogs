import GetStarted from '@/pages/about/components/get-started/get-started';
import Mission from '@/pages/about/components/mission/mission';
import WhatWeOffer from '@/pages/about/components/offer/what-we-offer';
import Story from '@/pages/about/components/story/story';
import AboutTitle from '@/pages/about/components/title/about-title';

const About: React.FC = () => {
  return (
    <div className='mx-auto mt-2 max-w-4xl space-y-12'>
      <AboutTitle />
      <Mission />
      <WhatWeOffer />
      <Story />
      <GetStarted />
    </div>
  );
};

export default About;
