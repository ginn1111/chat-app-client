import { Outlet } from 'react-router-dom';
import Navbar from '@components/common/Navbar';
import { Suspense } from 'react';
import BoxesLoading from '@components/ui/loading/BoxesLoading';

const Layout = () => {
  return (
    <main className="flex">
      <Navbar />
      <div className="w-[calc(100%_-_200px)]">
        <Suspense
          fallback={
            <div className="flex h-screen items-center justify-center">
              <BoxesLoading />
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </div>
    </main>
  );
};

export default Layout;
