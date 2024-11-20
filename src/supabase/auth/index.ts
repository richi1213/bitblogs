import { supabase } from '@/supabase';
import { Database } from '@/supabase/supabase.types';
import { SupabaseClient, AuthResponse } from '@supabase/supabase-js';

const supabaseWithSchema: SupabaseClient<Database> = supabase;

type RegisterInput = {
  email: string;
  password: string;
};

export const register = async ({
  email,
  password,
}: RegisterInput): Promise<AuthResponse> => {
  const { data, error } = await supabaseWithSchema.auth.signUp({
    email,
    password,
  });

  if (error) {
    return {
      data: {
        user: null,
        session: null,
      },
      error,
    };
  }

  return {
    data: {
      user: data.user,
      session: data.session,
    },
    error: null,
  };
};

export const login = async ({ email, password }: RegisterInput) => {
  const { data, error } = await supabaseWithSchema.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      data: {
        user: null,
        session: null,
      },
      error,
    };
  }

  console.log(data);

  return {
    data: {
      user: data.user,
      session: data.session,
    },
    error: null,
  };
};
