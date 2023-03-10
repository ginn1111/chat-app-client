import React from 'react';
import ProcessBar from '../ui/loading/ProcessBar';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { hasLoading } from '@store/selectors';
import Navbar from '@components/common/Navbar';

const Layout = () => {
  const isLoading = useSelector(hasLoading);
  return (
    <>
      <ProcessBar isShow={isLoading} />
      <main>
        <Navbar />
        <div className="w-[calc(100%_-_300px)] ml-[300px]">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default Layout;
