import { atomWithStorage } from 'jotai/utils';
import { ProfilesRow } from '@/supabase/auth';

export const userAtom = atomWithStorage<{
  isLoading?: boolean;
  isLoggedIn: boolean;
  userInfo: null | ProfilesRow;
}>('user-session', {
  isLoading: true,
  isLoggedIn: false,
  userInfo: null,
});
