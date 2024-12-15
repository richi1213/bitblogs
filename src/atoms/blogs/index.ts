import { BlogFormState } from '@/pages/write/components/blog-form.types';
import { atomWithStorage } from 'jotai/utils';

export const defaultFormState: BlogFormState = {
  titleEn: '',
  titleKa: '',
  descriptionEn: '',
  descriptionKa: '',
  tags_ids: [],
  imageFile: undefined,
};

export const formAtom = atomWithStorage<BlogFormState>(
  'blogFormState',
  defaultFormState,
);
