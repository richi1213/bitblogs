import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AboutTabContent from '@/pages/profile/components/profile-tabs/about/about-tab-content';
import ArticlesTabContent from '@/pages/profile/components/profile-tabs/articles/articles-tab-content';

const ProfileTabs: React.FC = () => {
  return (
    <div className='flex flex-col'>
      <Tabs defaultValue='articles' className=''>
        <TabsList className='mb-6 grid h-9 w-full grid-cols-12'>
          <TabsTrigger value='articles' className='col-span-6'>
            Articles
          </TabsTrigger>
          <TabsTrigger value='about' className='col-span-6'>
            About
          </TabsTrigger>
        </TabsList>
        <ArticlesTabContent />
        <AboutTabContent />
      </Tabs>
    </div>
  );
};

export default ProfileTabs;
