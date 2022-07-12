import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';

const Layout = ({ children }) => {
  const { pathname } = useLocation();
  const isAuthPage = pathname === '/auth';
  return (
    <div>
      {!isAuthPage && <Header />}
      <main className={`${isAuthPage ? '' : 'mt-[70px]'}`}>{children}</main>
    </div>
  );
};

export default Layout;
