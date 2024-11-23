import { atom } from 'jotai';
import { Database } from '@/supabase/supabase.types';

type ProfileRow = Database['public']['Tables']['profiles']['Row'];

export const userAtom = atom<{
  isLoggedIn: boolean;
  userInfo: null | ProfileRow;
}>({
  isLoggedIn: false,
  userInfo: null,
});
