import { z } from 'zod';

export const createEditFormSchema = (t: (key: string) => string) =>
  z.object({
    'full-name-en': z.string().min(2, {
      message: t('full-name-en-min'),
    }),
    'full-name-ka': z.string().min(2, {
      message: t('full-name-ka-min'),
    }),
    avatar_url: z
      .string()
      .url({
        message: t('avatar-url'),
      })
      .optional(),
  });
