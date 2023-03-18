import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import BoxesLoading from '@components/ui/loading/BoxesLoading';
import Layout from '@components/layout/Layout';
import Authentication from '@pages/Authentication';
import PATHS from '@constants/paths';
import RequireAuthentication from '@components/Authentication/RequireAuthentication';
import Persistent from '@components/Authentication/Persistent';
import { PRIVATE_ROUTES } from '@constants/routers';

const Login = lazy(() => import('@components/Authentication/Login'));
const Register = lazy(() => import('@components/Authentication/Register'));

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
              {PRIVATE_ROUTES.map((privateRoute) => {
                const LayoutComponent =
                  privateRoute.layout ?? (({ children }) => <>{children}</>);
                return (
                  <Route
                    key={privateRoute.path}
                    path={privateRoute.path}
                    element={
                      <LayoutComponent>{privateRoute.element}</LayoutComponent>
                    }
                  >
                    {privateRoute.nested}
                  </Route>
                );
              })}
            </Route>
          </Route>
          <Route path="*" element={<Navigate to={PATHS.AUTHENTICATION} />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
