import { atomWithStorage } from 'jotai/utils';
import { ProfilesRow } from '@/supabase/auth';

export const userAtom = atomWithStorage<{
  isLoggedIn: boolean;
  userInfo: null | ProfilesRow;
}>('user-session', {
  isLoggedIn: false,
  userInfo: null,
});
