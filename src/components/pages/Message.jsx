import { memo } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import ConversationList from '../message/friends/ConversationList';
import PseudoChat from '../message/chat/PseudoChat';

export const commonStyle = 'rounded-xl px-2 py-1 h-full relative';

const Message = () => {
  const { id: conversationId } = useParams();

  return (
    <>
      <div className="format-page-size flex h-[calc(100vh_-_90px)] relative rounded-md">
        <div
          className={`w-[350px] flex-none ${commonStyle} flex flex-col items-center gap-y-2 text-[14px] bg-transparent pr-2 `}
        >
          <ConversationList />
        </div>
        {conversationId ? <Outlet /> : <PseudoChat />}
      </div>
    </>
  );
};

export default memo(Message);
