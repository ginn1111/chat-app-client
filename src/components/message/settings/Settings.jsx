import React from 'react';
import { UilInfoCircle } from '@iconscout/react-unicons';
import { Link } from 'react-router-dom';

const Settings = ({ friendId, avatar, name }) => {
  return (
    <>
      <div className="pt-5 flex-none">
        <img
          className="w-20 h-20 rounded-full object-center shadow-[0_0_0_8px_#bae6fd] object-cover"
          src={avatar}
          alt="avatar-profile-chat"
        />
      </div>
      <span className="font-[600] tracking-wider text-center text-[20px] mt-[10px]">
        {name}
      </span>
      <Link to={`/wall/${friendId}`} className="cursor-pointer px-2 py-1 flex justify-between items-center w-full rounded-[5px] duration-300 hover:bg-slate-100">
        <p>Information</p>
        <UilInfoCircle />
      </Link>
      <hr className="w-full" />
    </>
  );
};


//<MemberList />
export default Settings;
