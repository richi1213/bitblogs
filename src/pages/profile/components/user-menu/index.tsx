import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, LogOut, Settings } from 'lucide-react';
import ProfileAvatar from '@/pages/profile/components/ui/profile-avatar';
import { ProfileAvatarProps } from '@/pages/profile/components/ui/profile-avatar';
import { useAtomValue } from 'jotai';
import { userAtom } from '@/atoms/auth';
import { useNavigate } from 'react-router-dom';
import { useLogOut } from '@/supabase/auth/hooks/use-log-out';

const UserMenu: React.FC<ProfileAvatarProps> = ({ avatarUrl, name }) => {
  const user = useAtomValue(userAtom);
  const { logOut } = useLogOut();
  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (user?.user.user_metadata?.username) {
      navigate(`/profile/${user?.user.user_metadata?.username}`);
    } else {
      console.error('Username is not available');
    }
  };

  const handleProfileEditClick = () => {
    if (user?.user.user_metadata?.username) {
      navigate('/profile/edit');
    } else {
      console.error('Edit is not available');
    }
  };

  const handleLogoutClick = async () => {
    try {
      await logOut();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
          <ProfileAvatar avatarUrl={avatarUrl} name={name} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleProfileEditClick}>
            <Settings className='mr-2 h-4 w-4' />
            <span>User settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleProfileClick}>
            <User className='mr-2 h-4 w-4' />
            <span>Profile</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='text-red-600' onClick={handleLogoutClick}>
          <LogOut className='mr-2 h-4 w-4' />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
