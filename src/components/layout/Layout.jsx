import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';

const Layout = ({ children }) => {
  const { pathname } = useLocation();
  console.log(pathname);
  return (
    <div>
      {pathname !== '/auth' && <Header />}
      <main>{children}</main>
    </div>
  );
};

export default Layout;
