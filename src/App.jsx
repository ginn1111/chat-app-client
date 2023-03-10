import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import CircleLoading from '@components/ui/loading/CircleLoading';
import Login from '@components/Authentication/Login';
import Register from '@components/Authentication/Register';
import Search from '@pages/Search';
import { PATHS } from '@constants/routers';

const Layout = lazy(() => import('./components/layout/Layout'));
const Authentication = lazy(() => import('./pages/Authentication'));
const Wall = lazy(() => import('./pages/Wall'));
const Profile = lazy(() => import('./pages/Profile'));
// const Chat = lazy(() => import('./components/message/chat/Chat'));
const Chat = lazy(() => import('./pages/Chat'));
const RequireAuth = lazy(() =>
  import('./components/Authentication/RequireAuth')
);
const Persist = lazy(() => import('./components/Authentication/Persist'));

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
        {/* <Route element={<Persist />}> */}
        <Route
          path="/"
          element={<Layout />}
        >
          <Route
            path="/"
            element={<Navigate to="/wall/me" />}
          />
          <Route
            path={PATHS.PROFILE}
            element={<Profile />}
          />
          <Route
            path="wall/:id"
            element={<Wall />}
          />
          <Route
            path={PATHS.CHAT}
            element={<Chat />}
          >
            {/* <Route */}
            {/*   path="search" */}
            {/*   element={<Search />} */}
            {/* /> */}
            {/* </Route> */}
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
