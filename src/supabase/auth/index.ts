import { supabase } from '@/supabase';
import { Database } from '@/supabase/supabase.types';
import {
  SupabaseClient,
  AuthResponse,
  isAuthApiError,
  AuthApiError,
} from '@supabase/supabase-js';

type RegisterInput = {
  email: string;
  password: string;
  full_name_en: string;
  full_name_ka: string;
  username: string;
};

type LoginInput = {
  email: string;
  password: string;
};

const supabaseWithSchema: SupabaseClient<Database> = supabase;

export const register = async ({
  email,
  password,
  full_name_en,
  full_name_ka,
  username,
}: RegisterInput): Promise<AuthResponse> => {
  const { data, error } = await supabaseWithSchema.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name_en,
        full_name_ka,
        username,
      },
    },
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

export const login = async ({ email, password }: LoginInput) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (isAuthApiError(error)) {
        throw new AuthApiError(error.message, error.status, 'AuthApiError');
      }
      throw new Error('An unexpected authentication error occurred.');
    }
    return data;
  } catch (err) {
    if (isAuthApiError(err)) {
      throw err;
    }

    throw new Error('Something went wrong during login. Please try again.');
  }
};
