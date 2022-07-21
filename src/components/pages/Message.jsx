import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import ConversationList from '../message/friends/ConversationList';
import PseudoChat from '../message/chat/PseudoChat';

export const commonStyle =
  ' rounded-xl px-2 py-1 h-full after:bg-[#ffffffa] after:rounded-lg after:blur-[2px] after:z-[-1] after:w-full after:h-full after:absolute relative';

const Message = () => {
  const { id: conversationId } = useParams();
  return (
    <div className="format-page-size flex h-[calc(100vh_-_90px)] relative rounded-md">
      <ConversationList conversationId={conversationId} />
      {conversationId ? <Outlet /> : <PseudoChat />}
    </div>
  );
};

export default Message;
