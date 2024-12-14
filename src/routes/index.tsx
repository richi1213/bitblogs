import { Layout } from '@/components/layout';
import {
  Home,
  Write,
  About,
  Login,
  Register,
  Profile,
  NotFound,
  Author,
  EditProfile,
} from '@/pages';
import IsAuthorizedGuard from '@/routes/protected/is-authorized-guard';
import IsUnauthorizedGuard from '@/routes/protected/is-unauthorized-guard';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path='/write' element={<Write />} />
        <Route path='/about' element={<About />} />
        <Route path='/author' element={<Author />} />
        <Route element={<IsAuthorizedGuard />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Route>
        <Route element={<IsUnauthorizedGuard />}>
          <Route path='/profile/:username' element={<Profile />} />
          <Route path='/profile/edit' element={<EditProfile />} />
        </Route>
      </Route>

      <Route path='*' element={<NotFound />} />
    </>,
  ),
);
