import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, LogOut } from 'lucide-react';
import ProfileAvatar from '@/pages/profile/components/ui/profile-avatar';
import { ProfileAvatarProps } from '@/pages/profile/components/ui/profile-avatar';
import useLogOut from '@/atoms/auth/hooks/use-log-out';
import EditUserDialog from '@/pages/profile/components/user-menu/components/edit-user-dialog';
import { useAtomValue } from 'jotai';
import { userAtom } from '@/atoms/auth';
import { useNavigate } from 'react-router-dom';

const UserMenu: React.FC<ProfileAvatarProps> = ({ avatarUrl, name }) => {
  const user = useAtomValue(userAtom);
  const { logout } = useLogOut();
  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (user?.userInfo?.username) {
      navigate(`/profile/${user.userInfo.username}`);
    } else {
      console.error('Username is not available');
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
          <DropdownMenuItem>
            <EditUserDialog />
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
