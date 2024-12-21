import { Write, About, Author } from '@/pages';
import { DEFAULT_PATHS } from '@/routes/unprotected/enums';
import { Route } from 'react-router-dom';

export const DEFAULT_ROUTES = [
  <Route path={DEFAULT_PATHS.WRITE} element={<Write />} />,
  <Route path={DEFAULT_PATHS.ABOUT} element={<About />} />,
  <Route path={DEFAULT_PATHS.AUTHOR} element={<Author />} />,
];
