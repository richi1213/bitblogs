// import { atomWithStorage } from 'jotai/utils';
// import { ProfilesRow } from '@/supabase/auth';

// export const userAtom = atomWithStorage<{
//   isLoggedIn: boolean;
//   userInfo: null | ProfilesRow;
// }>('user-session', {
//   isLoggedIn: false,
//   userInfo: null,
// });

import { atomWithStorage } from 'jotai/utils';
import { ProfilesRow } from '@/supabase/auth';

export const userAtom = atomWithStorage<{
  isLoading: boolean;
  isLoggedIn: boolean;
  userInfo: null | ProfilesRow;
}>('user-session', {
  isLoading: true, // Initially true to indicate loading
  isLoggedIn: false,
  userInfo: null,
});
