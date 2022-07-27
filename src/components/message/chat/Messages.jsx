import React, { useRef, useEffect } from 'react';
import MessageItem from './MessageItem';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, getMessageList } from '../../../store/selectors';
import { formatTime } from '../../../utils/helper';
import getSocketIO, {
  getMessage,
  removeGetMessage,
} from '../../../services/socketIO';
import { addMessage } from '../../../store/message-slice';

const Messages = ({ conversationAvatar }) => {
  const { id: userId, avatar: userAvatar } = useSelector(getUser);
  const messages = useSelector(getMessageList);
  const dispatch = useDispatch();

  const scrollRef = useRef();

  useEffect(() => {
    const socket = getSocketIO();
    if (socket?.connected) {
      const getMessageHandler = ({ senderId, text, conversationId }) => {
        dispatch(
          addMessage({
            _id: new Date().getTime(),
            senderId,
            text,
            conversationId,
            createdAt: new Date().toISOString(),
          }),
        );
      };
      getMessage(getMessageHandler, socket);
      return () => removeGetMessage(socket, getMessageHandler);
    }
  }, [getSocketIO()]);

  useEffect(() => {
    scrollRef.current.scrollTop = scrollRef.current?.scrollHeight;
  }, [messages]);

  return (
    <ul
      ref={scrollRef}
      className="h-[66vh] w-full flex flex-col gap-y-5 p-2 overflow-auto bg-gradient-b from-transparent to-white z-9 shadow-[0_0_10px_-5px_#0000004a]"
    >
      {messages?.map((message) => {
        return (
          <MessageItem
            key={message._id}
            isOwn={message.senderId === userId}
            avatar={
              message.senderId === userId ? userAvatar : conversationAvatar
            }
            message={message.text}
            timeAt={formatTime(message.createdAt)}
          />
        );
      })}
    </ul>
  );
};

export default Messages;
