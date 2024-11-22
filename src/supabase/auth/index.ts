import { supabase } from '@/supabase';
import { Database } from '@/supabase/supabase.types';
import {
  SupabaseClient,
  AuthResponse,
  isAuthApiError,
} from '@supabase/supabase-js';

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

// export const login = async ({ email, password }: RegisterInput) => {
//   const { data, error } = await supabaseWithSchema.auth.signInWithPassword({
//     email,
//     password,
//   });

//   if (error) {
//     return {
//       data: {
//         user: null,
//         session: null,
//       },
//       error,
//     };
//   }

//   console.log(data);

//   return {
//     data: {
//       user: data.user,
//       session: data.session,
//     },
//     error: null,
//   };
// };

export const login = async ({ email, password }: RegisterInput) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    let errorMessage = 'An error occurred. Please try again.';

    if (isAuthApiError(error)) {
      switch (error.status) {
        case 400:
          errorMessage = 'Invalid email or password.';
          break;
        case 401:
          errorMessage = 'Unauthorized. Please check your credentials.';
          break;
        default:
          errorMessage = error.message;
          break;
      }
    }

    return {
      data: {
        user: null,
        session: null,
      },
      error: { ...error, message: errorMessage },
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
