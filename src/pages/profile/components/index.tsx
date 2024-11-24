import ProfileDetails from '@/pages/profile/components/profile-detials';
import ProfileTabs from '@/pages/profile/components/profile-tabs';

const Profile: React.FC = () => {
  return (
    <div className='mx-auto max-w-4xl'>
      <ProfileDetails />
      <ProfileTabs />
    </div>
  );
};

export default Profile;
