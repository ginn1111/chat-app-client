import { lazy } from 'react';

import PATHS from './paths';
import Layout from '@components/layout/Layout';
// import Chat from '@pages/Chat';
// import Profile from '@pages/Profile';
// import Friend from '@pages/Friend';

const Profile = lazy(() => import('@pages/Profile'));
const Chat = lazy(() => import('@pages/Chat'));
const Friend = lazy(() => import('@pages/Friend'));

const PRIVATE_ROUTES = [
  { path: PATHS.CHAT, element: <Chat />, layout: Layout.SubLayout },
  { path: PATHS.PROFILE, element: <Profile />, layout: Layout.SubLayout },
  { path: PATHS.FRIEND, element: <Friend />, layout: Layout.SubLayout },
];

export { PRIVATE_ROUTES };
