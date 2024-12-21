import { Layout } from '@/components/layout';
import { Home, NotFound } from '@/pages';
import { AUTH_ROUTES } from '@/routes/protected/is-authorized/auth/auth-routes';
import IsAuthorizedGuard from '@/routes/protected/is-authorized/is-authorized-guard';
import IsUnauthorizedGuard from '@/routes/protected/is-unauthorized/is-unauthorized-guard';
import { PROFILE_ROUTES } from '@/routes/protected/is-unauthorized/profile/profile-routes';
import { DEFAULT_ROUTES } from '@/routes/unprotected/default-routes';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

export const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        {DEFAULT_ROUTES}
        <Route element={<IsAuthorizedGuard />}>{AUTH_ROUTES}</Route>
        <Route element={<IsUnauthorizedGuard />}>{PROFILE_ROUTES}</Route>
      </Route>

      <Route path='*' element={<NotFound />} />
    </>,
  ),
);
