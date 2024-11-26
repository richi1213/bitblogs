import { z } from 'zod';

export const createRegisterFormSchema = (t: (key: string) => string) =>
  z
    .object({
      'full-name-en': z.string().min(2, {
        message: t('full-name-en'),
      }),
      'full-name-ka': z.string().min(2, {
        message: t('full-name-ka'),
      }),
      username: z
        .string()
        .min(2, {
          message: t('username-min'),
        })
        .max(30, { message: t('username-max') }),
      email: z.string().email({
        message: t('valid-email'),
      }),
      password: z.string().min(8, {
        message: t('password-min'),
      }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('passwords-mismatch'),
      path: ['confirmPassword'],
    });
