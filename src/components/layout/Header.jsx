import React from 'react';
import NavBar from './NavBar';

const Header = () => {
  return (
    <header className="w-[90%] mx-auto h-[70px] flex gap-x-5 items-center justify-between border-b border-solid border-slate-400 text-sm text-gray-600">
      <div className="flex justify-between gap-x-2 relative w-1/3 after:absolute after:w-[2px] after:h-[100%] after:bg-slate-200 after:top-[-50%] after:right-[-10px]  after:translate-y-[50%]">
        <div>Logo</div>
        <span>Enjoy your moment</span>
      </div>
      <NavBar />
      <div className="w-1/6 flex text-[14px] items-center justify-between">
        <div>Search</div>
        <div>Notification</div>
        <div>Avatar</div>
      </div>
    </header>
  );
};

export default Header;
