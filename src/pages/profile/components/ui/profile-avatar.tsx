import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getInitials } from '@/utils/string-utils';

export type ProfileAvatarProps = {
  avatarUrl: string | null | undefined;
  name: string;
};

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ avatarUrl, name }) => {
  return (
    <Avatar className='size-10'>
      {avatarUrl ? (
        <AvatarImage src={avatarUrl} alt={name} />
      ) : (
        <AvatarFallback className='bg-muted'>
          {getInitials(name)}
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default ProfileAvatar;
