import React, { useRef, useEffect } from 'react';
import MessageItem from './MessageItem';
import { useSelector } from 'react-redux'
import { getUser } from '../../../store/selectors'
import { formatTime } from '../../../utils/helper'

const Messages = ({ messages, conversationAvatar }) => {
  const { id: userId, avatar: userAvatar } = useSelector(getUser)

  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView(false);
  }, [messages])

  return (
    <ul className="h-[66vh] w-full flex flex-col gap-y-5 p-2 overflow-auto bg-gradient-b from-transparent to-white z-9 shadow-[0_0_10px_-5px_#0000004a]">
      {messages?.map(message => {
        return <MessageItem
          ref={scrollRef}
          key={message._id}
          isOwn={message.senderId === userId}
          avatar={message.senderId === userId ? userAvatar : conversationAvatar}
          message={message.text}
          timeAt={formatTime(message.createdAt)}
        />
      })}
    </ul>
  );
};

export default Messages;
