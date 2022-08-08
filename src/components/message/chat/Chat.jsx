import React, { useState, useMemo, memo } from 'react';
import { useParams } from 'react-router-dom';
import { getConversationList, getUser } from '../../../store/selectors';
import { useSelector } from 'react-redux';
import { commonStyle } from '../../pages/Message';
import Send from './Send';
import Header from './Header';
import Settings from '../settings/Settings';
import Messages from './Messages';

const Chat = () => {
  const { id: conversationId } = useParams();
  const { id: userId } = useSelector(getUser);
  const conversationList = useSelector(getConversationList);

  const [isShowInfor, setIsShowInfor] = useState(false);

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

  const receiverId = useMemo(
    () =>
      !conversationInfor?.isGroup &&
      conversationInfor?.members.find((m) => m.memberId !== userId)?.memberId,
    [conversationInfor],
  );

  function toggleInfor() {
    setIsShowInfor((prev) => !prev);
  }

  return (
    <>
      <div
        className={`w-full duration-500 ${commonStyle} bg-transparent relative mt-[-6px]`}
      >
        <Header
          avatar={conversationInfor?.avatar}
          name={conversationInfor?.title}
          isShowInfor={isShowInfor}
          onShowInfor={toggleInfor}
        />
        <Messages
          conversationAvatar={conversationInfor?.avatar}
          visitedConversationId={conversationId}
        />
        <Send conversationId={conversationId} receiverId={receiverId} />
      </div>
      {isShowInfor && (
        <div
          className={`${commonStyle} flex flex-col w-[300px] gap-y-2 relative text-primary items-center mt-2 flex-none`}
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
