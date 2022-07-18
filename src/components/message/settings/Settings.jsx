import React from 'react';
import { commonStyle } from '../../pages/Message';
import Blur from '../../ui/blur/Blur';
import Avatar from '../../../assets/img/avatar2.jpeg';
import MemberList from './MemberList';

const Settings = () => {
  return (
    <div
      className={`basis-1/4 ${commonStyle} flex flex-col gap-y-2 relative text-primary items-center mt-2`}
    >
      <Blur top="top-[0%]" left="left-[20%]" bgColor="bg-blue-300" />
      <div className="pt-5">
        <img
          className="w-24 h-24 rounded-full object-center shadow-[0_0_0_8px_#ffffffa4]"
          src={Avatar}
          alt="avatar-profile-chat"
        />
      </div>
      <span className="font-[800] tracking-wider text-white text-center text-[20px] drop-shadow-sm">
        IT Team
      </span>
      <MemberList />
    </div>
  );
};

export default Settings;
