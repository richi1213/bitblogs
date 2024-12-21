import { Write, About, Author } from '@/pages';
import { DEFAULT_PATHS } from '@/routes/unprotected/enums';
import { Route } from 'react-router-dom';

export const DEFAULT_ROUTES = [
  <Route
    key={DEFAULT_PATHS.WRITE}
    path={DEFAULT_PATHS.WRITE}
    element={<Write />}
  />,
  <Route
    key={DEFAULT_PATHS.ABOUT}
    path={DEFAULT_PATHS.ABOUT}
    element={<About />}
  />,
  <Route
    key={DEFAULT_PATHS.AUTHOR}
    path={DEFAULT_PATHS.AUTHOR}
    element={<Author />}
  />,
];
