import React, {  useMemo, memo  } from 'react';
import useUI from '../../../hooks/useUI';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getConversationList, getUser } from '../../../store/selectors';
import { commonStyle } from '../../pages/Message';
import Send from './Send';
import Header from './Header';
import Settings from '../settings/Settings';
import Messages from './Messages';

const Chat = () => {
  const { id: conversationId } = useParams();
  const { id: userId } = useSelector(getUser);
  const conversationList = useSelector(getConversationList);

  const {isShowInfor, onToggleConverInfor, sizeWindow } = useUI();


  const conversationInfor = useMemo(() => {
    const conversation = conversationList.find(
      (con) => con._id === conversationId,
    );
    return conversation?.isGroup
      ? {
        ...conversation,
        avatar: conversation?.members?.slice(0, 2).map((m) => m.avatar),
      }
      : conversation;
  }, [conversationId, conversationList]);

  const receiverId = useMemo(() =>
    !conversationInfor?.isGroup
    && conversationInfor?.members.find((m) => m.memberId !== userId)?.memberId
    , [conversationInfor]);

  return (
    <>
      <div
        className={`w-full duration-500 ${commonStyle} bg-transparent relative mt-[-6px] w-screen sm:absolute`}
      >
        <Header
          avatar={conversationInfor?.avatar}
          name={conversationInfor?.title}
          isShowInfor={isShowInfor}
          onShowInfor={onToggleConverInfor}
        />
        <Messages
          conversationAvatar={conversationInfor?.avatar}
          visitedConversationId={conversationId}
        />
        <Send conversationId={conversationId} receiverId={receiverId} />
      </div>
      {(isShowInfor || sizeWindow === 'sm') && (
        <div
          className={`${commonStyle} flex flex-col w-[250px] gap-y-2 text-primary items-center mt-2 flex-none ${sizeWindow === 'sm' ? 'absolute left-[0]' : 'relative'} duration-400 top-0 bg-white`}
        >
          <Settings
            friendId={receiverId}
            avatar={conversationInfor?.avatar}
            name={conversationInfor?.title}
          />
        </div>
      )}
    </>
  );
};

export default memo(Chat);
