import { z } from 'zod';

export const createBlogFormSchema = () =>
  z.object({
    titleEn: z.string().min(2, {
      message: 'Title (English) must be at least 2 characters long.',
    }),
    titleKa: z.string().min(2, {
      message: 'Title (Georgian) must be at least 2 characters long.',
    }),
    descriptionEn: z.string().min(2, {
      message: 'Description (English) must be at least 2 characters long.',
    }),
    descriptionKa: z.string().min(2, {
      message: 'Description (Georgian) must be at least 2 characters long.',
    }),
    imageFile: z
      .custom<File>((value) => value instanceof File, {
        message: 'Please upload a valid image file.',
      })
      .refine((file) => file.size <= 5 * 1024 * 1024, {
        message: 'Image file size must not exceed 5MB.',
      })
      .refine(
        (file) => ['image/jpeg', 'image/png', 'image/gif'].includes(file.type),
        { message: 'Only JPEG, PNG, or GIF images are allowed.' },
      ),
    tags: z
      .array(
        z
          .number({ invalid_type_error: 'Each tag must be a valid ID.' })
          .int()
          .positive({ message: 'Tag IDs must be positive integers.' }),
      )
      .min(1, { message: 'At least one tag is required.' })
      .max(5, { message: 'You can only select up to 5 tags.' }),
  });
