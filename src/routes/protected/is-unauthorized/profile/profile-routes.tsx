import { Profile, EditProfile } from '@/pages';
import { PROFILE_PATHS } from '@/routes/protected/is-unauthorized/profile/enums';
import { Route } from 'react-router-dom';

export const PROFILE_ROUTES = [
  <Route path={PROFILE_PATHS.PROFILE + '/:username'} element={<Profile />} />,
  <Route path={PROFILE_PATHS.EDIT} element={<EditProfile />} />,
];
