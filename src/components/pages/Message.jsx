import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import FriendList from '../message/friends/FriendList';
import Chat from '../message/chat/Chat';
import Settings from '../message/settings/Settings';
import PseudoChat from '../message/chat/PseudoChat';

export const commonStyle =
  ' rounded-xl px-2 py-1 h-full after:bg-[#ffffffa] after:rounded-lg after:blur-[2px] after:z-[-1] after:w-full after:h-full after:absolute relative';

const Message = () => {
  const param = useParams();
  return (
    <div className="format-page-size flex mt-[20px] pb-[20px] h-[calc(100vh_-_90px)] relative rounded-md">
      <FriendList />
      {param.id ? <Outlet /> : <PseudoChat />}
      <Settings />
    </div>
  );
};

export default Message;
