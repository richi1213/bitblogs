import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getInitials } from '@/utils/string-utils';
import { cva } from 'class-variance-authority';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export type ProfileAvatarProps = {
  avatarUrl: string | null | undefined;
  name: string;
  size?: 'small' | 'medium' | 'extraLarge';
  className?: string;
};

const avatarStyles = cva('relative rounded-full overflow-hidden', {
  variants: {
    size: {
      small: 'size-6',
      medium: 'size-10',
      large: 'size-16',
      extraLarge: 'size-32',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  avatarUrl,
  name,
  size = 'medium',
  className,
}) => {
  const isExtraLarge = size === 'extraLarge';

  return (
    <Avatar className={twMerge(clsx(avatarStyles({ size }), className))}>
      {avatarUrl ? (
        <AvatarImage src={avatarUrl} alt={name} />
      ) : (
        <AvatarFallback
          className={clsx(
            'bg-muted text-muted-foreground',
            isExtraLarge && 'text-xl',
          )}
        >
          {getInitials(name)}
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default ProfileAvatar;
