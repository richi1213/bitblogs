import { Profile, EditProfile } from '@/pages';
import { PROFILE_PATHS } from '@/routes/protected/is-unauthorized/profile/enums';
import { Route } from 'react-router-dom';

export const PROFILE_ROUTES = [
  <Route
    key={PROFILE_PATHS.PROFILE}
    path={`${PROFILE_PATHS.PROFILE}/:username`}
    element={<Profile />}
  />,
  <Route
    key={PROFILE_PATHS.EDIT}
    path={PROFILE_PATHS.EDIT}
    element={<EditProfile />}
  />,
];
