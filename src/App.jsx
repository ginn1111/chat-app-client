import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import BoxesLoading from '@components/ui/loading/BoxesLoading';
import Layout from '@components/layout/Layout';
import Authentication from '@pages/Authentication';
import { PATHS } from '@constants/routers';
import RequireAuthentication from '@components/Authentication/RequireAuthentication';
import Persistent from '@components/Authentication/Persistent';

const Login = lazy(() => import('@components/Authentication/Login'));
const Register = lazy(() => import('@components/Authentication/Register'));
const Profile = lazy(() => import('./pages/Profile'));
const Chat = lazy(() => import('./pages/Chat'));

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          <BoxesLoading />
        </div>
      }
    >
      <Routes>
        <Route element={<Persistent />}>
          <Route index element={<Navigate to={PATHS.CHAT} replace />} />
          <Route path={PATHS.AUTHENTICATION} element={<Authentication />}>
            <Route index element={<Navigate to={PATHS.LOGIN} replace />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route element={<RequireAuthentication />}>
            <Route path={PATHS.ROOT} element={<Layout />}>
              <Route path={PATHS.PROFILE} element={<Profile />} />
              <Route path={PATHS.CHAT} element={<Chat />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to={PATHS.AUTHENTICATION} />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
