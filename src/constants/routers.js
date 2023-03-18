import { lazy } from 'react';
import { Route } from 'react-router-dom';

import PATHS from './paths';
import Layout from '@components/layout/Layout';
// import Chat from '@pages/Chat';
// import Profile from '@pages/Profile';
// import Friend from '@pages/Friend';

const Profile = lazy(() => import('@pages/Profile'));
const Chat = lazy(() => import('@pages/Chat'));
const Friend = lazy(() => import('@pages/Friend'));

const Conversation = lazy(() => import('@components/Chat/Conversation'));
const FriendInformation = lazy(() =>
  import('@components/Friend/FriendInformation')
);

const PRIVATE_ROUTES = [
  {
    path: PATHS.CHAT,
    element: <Chat />,
    layout: Layout.SubLayout,
    nested: <Route path=":id" element={<Conversation />} />,
  },
  {
    path: PATHS.PROFILE,
    element: <Profile />,
    layout: Layout.SubLayout,
    nested: null,
  },
  {
    path: PATHS.FRIEND,
    element: <Friend />,
    layout: Layout.SubLayout,
    nested: <Route path=":id" element={<FriendInformation />} />,
  },
];

export { PRIVATE_ROUTES };
