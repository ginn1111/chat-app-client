import React from 'react';
import Blur from '../../ui/blur/Blur';
import Avatar from '../../../assets/img/avatar2.jpeg';
import MemberList from './MemberList';

const Settings = () => {
  return (
    <>
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
    </>
  );
};

export default Settings;
