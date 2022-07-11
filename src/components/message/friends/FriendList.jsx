import React from 'react';
import { commonStyle } from '../../pages/Message';
import Search from '../../ui/search/Search';
import Avatar from '../../../assets/img/avatar2.jpeg';
import Blur from '../../ui/blur/Blur';
import FriendItem from './FriendItem';
import Header from './Header';

const FriendList = () => {
  return (
    <div
      className={`basis-1/4 ${commonStyle} flex flex-col items-center gap-y-2 text-[14px] bg-transparent  pr-2`}
    >
      <Blur top="top-[0%]" left="left-[20%]" bgColor="bg-blue-300" />
      <Header />
      <div className="text-[14px] w-full">
        <Search bgColor="bg-white" placeholder="search chat..." />
      </div>
      <ul className="h-full w-full flex flex-col gap-y-0.5 overflow-auto pr-1">
        <FriendItem name="Shin" avatar={Avatar} fromOnline="5m" />
        <FriendItem name="Shin" avatar={Avatar} fromOnline="5m" />
        <FriendItem name="Ned" avatar={Avatar} formOnline="" isOnline />
        <FriendItem name="Gin" avatar={Avatar} fromOnline="" isOnline />
        <FriendItem name="Gin" avatar={Avatar} fromOnline="" isOnline />
        <FriendItem name="Gin" avatar={Avatar} fromOnline="" isOnline />
        <FriendItem name="Shin" avatar={Avatar} fromOnline="5m" />
      </ul>
    </div>
  );
};

export default FriendList;
