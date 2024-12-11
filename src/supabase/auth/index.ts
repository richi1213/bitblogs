import { supabase } from '@/supabase';
import { Database, Tables } from '@/supabase/supabase.types';
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

export type ProfilesRow = Tables<'profiles'>;
type ProfileUpdateData = Database['public']['Tables']['profiles']['Update'];

const supabaseWithSchema: SupabaseClient<Database> = supabase;

export const getMe = async () => {
  try {
    const { data: user, error } = await supabase.auth.getUser();

    if (error) {
      console.error('Error fetching user:', error.message);
      return null;
    }

    return user;
  } catch (err) {
    console.error('Unexpected error in getMe:', err);
    return null;
  }
};

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

export const fetchUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching user profile:', error.message);
    return null;
  }

  return data as ProfilesRow;
};

export const updateUserProfile = async (updates: ProfileUpdateData) => {
  const { id, ...profileUpdates } = updates;

  if (!id) {
    throw new Error('User ID is required to update the profile');
  }

  const { data, error } = await supabase
    .from('profiles')
    .update(profileUpdates)
    .eq('id', id);

  if (error) {
    console.error('Error updating user profile:', error.message);
    return null;
  }

  return data;
};
