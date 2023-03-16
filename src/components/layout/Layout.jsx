import { Outlet } from 'react-router-dom';
import Navbar from '@components/common/Navbar';

const Layout = () => {
  return (
    <main>
      <Navbar />
      <div className="w-[calc(100%_-_300px)] ml-[300px]">
        <Outlet />
      </div>
    </main>
  );
};

export default Layout;
