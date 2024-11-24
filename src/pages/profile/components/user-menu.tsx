import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Settings, User, LogOut } from 'lucide-react';
import ProfileAvatar from '@/pages/profile/components/ui/profile-avatar';
import { ProfileAvatarProps } from '@/pages/profile/components/ui/profile-avatar';
import useLogOut from '@/atoms/auth/hooks/use-log-out';

const UserMenu: React.FC<ProfileAvatarProps> = ({ avatarUrl, name }) => {
  const { logout } = useLogOut();
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
            <Settings className='mr-2 h-4 w-4' />
            <span>User settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
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
