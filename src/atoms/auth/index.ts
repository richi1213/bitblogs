import { Session } from '@supabase/supabase-js';
import { atomWithStorage } from 'jotai/utils';

export const userAtom = atomWithStorage<Session | null>(
  'supabase_session',
  null,
);
