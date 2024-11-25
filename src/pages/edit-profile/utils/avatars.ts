import { createAvatar } from '@dicebear/core';
import { avataaars } from '@dicebear/collection';

export const generateAvatarUrl = (seed: string) =>
  createAvatar(avataaars, { seed }).toDataUri();
