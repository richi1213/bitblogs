import { Database } from '@/supabase/supabase.types';
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);
