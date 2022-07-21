import React from 'react';
import Avatar from '../../../assets/img/avatar2.jpeg';

const Header = ({ avatar, name }) => {
  return (
    <header className="w-full h-max flex items-center shadow-[0_10px_20px_-5px_#0000003f] py-2 px-5 rounded-[20px_20px_0_0] gap-x-4">
      <div>
        <img src={avatar} alt="avatar-chat" className="w-7 h-7 object-cover object-center rounded-full" />
      </div>
      <div className="flex flex-col">
        <span className="text-[18px] font-[500] tracking-wider text-slate-600">
          {name}
        </span>
      </div>
    </header>
  );
};

//<span className="text-[14px] text-slate-500">Ned</span>
export default Header;
