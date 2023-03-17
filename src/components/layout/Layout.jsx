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

Layout.SubLayout = ({ children }) => (
  <section className="grid grid-cols-12 py-20 h-screen px-56 bg-gradient-to-r from-[#F3F3FB] to-[#FDFBFD] gap-20">
    {children}
  </section>
);

export default Layout;
