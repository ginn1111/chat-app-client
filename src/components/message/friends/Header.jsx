import React from 'react';
import { UilSetting } from '@iconscout/react-unicons';

const Header = () => {
  return (
    <header className="flex justify-between items-center w-full py-1 text-slate-600">
      <div className="w-full flex items-center gap-x-2 ">
        <span className="font-bold">Inbox</span>
        <span className="px-2 py-0.5 rounded-md bg-green-100 text-green-400 font-bold">
          2 New
        </span>
      </div>
      <UilSetting className="cursor-pointer" />
    </header>
  );
};

export default Header;
