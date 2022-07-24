import React from 'react';
import InfoIcon from '@mui/icons-material/Info';

const Header = ({ avatar, name, isShowInfor, onShowInfor }) => {
  return (
    <header className="w-full h-max flex items-center shadow-[0_10px_20px_-5px_#0000003f] py-2 px-5 rounded-[20px_20px_0_0] gap-x-4">
      <div className="flex-none">
        <img src={avatar} alt="avatar-chat" className="w-7 h-7 object-cover object-center rounded-full" />
      </div>
      <div className="flex flex-col overflow-hidden">
        <span className="text-[18px] font-[500] tracking-wider text-slate-600 truncate">
          {name}
        </span>
      </div>
      <div className="ml-auto">
        <div className={`ml-auto ${isShowInfor ? 'shadow-[0_0_0_4px_#00000012]' : ''} duration-300 cursor-pointer rounded-full w-auto h-auto  flex items-center`} onClick={onShowInfor}>
          <InfoIcon sx={{ fontSize: 25, color: '#bfdbce' }} />
        </div>
      </div>
    </header>
  );
};

//<span className="text-[14px] text-slate-500">Ned</span>
export default Header;
