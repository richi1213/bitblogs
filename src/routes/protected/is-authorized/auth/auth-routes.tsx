import { Login, Register } from '@/pages';
import { AUTH_PATHS } from '@/routes/protected/is-authorized/auth/enums';
import { Route } from 'react-router-dom';

export const AUTH_ROUTES = [
  <Route path={AUTH_PATHS.LOGIN} element={<Login />} />,
  <Route path={AUTH_PATHS.REGISTER} element={<Register />} />,
];
