import React from 'react';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div>
      {/* <div className="overflow-hidden"> */}
      <Header />
      <main>{children}</main>
      {/* </div> */}
    </div>
  );
};

export default Layout;
