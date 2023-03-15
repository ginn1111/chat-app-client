import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import CircleLoading from '@components/ui/loading/CircleLoading';
import Login from '@components/Authentication/Login';
import Register from '@components/Authentication/Register';
import { PATHS } from '@constants/routers';
import Layout from '@components/layout/Layout';

const Authentication = lazy(() => import('./pages/Authentication'));
const Profile = lazy(() => import('./pages/Profile'));
const Chat = lazy(() => import('./pages/Chat'));

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          <CircleLoading />
        </div>
      }
    >
      <Routes>
        <Route
          path="/auth/"
          element={<Authentication />}
        >
          <Route
            path="login"
            element={<Login />}
          />
          <Route
            path="register"
            element={<Register />}
          />
        </Route>
        <Route
          path="/"
          element={<Layout />}
        >
          <Route
            path={PATHS.PROFILE}
            element={<Profile />}
          />
          <Route
            path={PATHS.CHAT}
            element={<Chat />}
          >
          </Route>
          <Route
            path="*"
            element={<Navigate to="/auth" />}
          />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
