import { createAvatar } from '@dicebear/core';
import { avataaars } from '@dicebear/collection';

export const generateAvatarUrl = (seed: string) =>
  createAvatar(avataaars, { seed }).toDataUri();

export const avatarSeeds = [
  'quwysa',
  'cdlsk',
  'saksakas',
  'sadasd',
  'fhgfh',
  'saasd',
  'sasdks',
  'msajs',
  'sadkdjs',
  'lol',
];
