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
import useLogOut from '@/atoms/auth/hooks/use-log-out';
import { useAtomValue } from 'jotai';
import { userAtom } from '@/atoms/auth';
import { useNavigate } from 'react-router-dom';
import { PROFILE_PATHS } from '@/routes/protected/is-unauthorized/profile/enums';

const UserMenu: React.FC<ProfileAvatarProps> = ({ avatarUrl, name }) => {
  const user = useAtomValue(userAtom);
  const { logout } = useLogOut();
  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (user?.userInfo?.username) {
      navigate(`${PROFILE_PATHS.PROFILE}/${user.userInfo.username}`);
    } else {
      console.error('Username is not available');
    }
  };

  const handleProfileEditClick = () => {
    if (user?.userInfo?.username) {
      navigate(PROFILE_PATHS.EDIT);
    } else {
      console.error('Edit is not available');
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='relative h-8 w-8 rounded-full hover:bg-primary'
        >
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
        <DropdownMenuItem className='text-red-600' onClick={logout}>
          <LogOut className='mr-2 h-4 w-4' />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
