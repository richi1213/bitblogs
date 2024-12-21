import { Login, Register } from '@/pages';
import { AUTH_PATHS } from '@/routes/protected/is-authorized/auth/enums';
import { Route } from 'react-router-dom';

export const AUTH_ROUTES = [
  <Route key={AUTH_PATHS.LOGIN} path={AUTH_PATHS.LOGIN} element={<Login />} />,
  <Route
    key={AUTH_PATHS.REGISTER}
    path={AUTH_PATHS.REGISTER}
    element={<Register />}
  />,
];
