import React, { useRef, useEffect, useMemo, memo } from 'react';
import { useParams } from 'react-router-dom';
import MessageItem from './MessageItem';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUser,
  getMessageList,
  getStatusMessage,
} from '../../../store/selectors';
import { formatTime } from '../../../utils/helper';
import getSocketIO, {
  getMessage,
  removeGetMessage,
} from '../../../services/socketIO';
import { addMessage, getMessages } from '../../../store/message-slice';
import {
  setLastMsg,
  updateStateConversation,
} from '../../../store/conversation-slice';
import CircleLoading from '../../ui/loading/CircleLoading';
import { AnimatePresence } from 'framer-motion';

const Messages = ({ conversationAvatar }) => {
  const { id: userId, avatar: userAvatar } = useSelector(getUser);
  const { id: visitedConversationId } = useParams();
  const messages = useSelector(getMessageList);
  const dispatch = useDispatch();
  const status = useSelector(getStatusMessage);
  const isPending = useMemo(() => status === 'get-message/pending', [status]);

  const scrollRef = useRef();

  useEffect(() => {
    visitedConversationId && dispatch(getMessages(visitedConversationId));
  }, [visitedConversationId]);

  useEffect(() => {
    const socket = getSocketIO();
    if (socket?.connected) {
      const getMessageHandler = ({ senderId, text, conversationId }) => {
        console.log('new msg');
        const date = new Date();
        const isVisited = conversationId === visitedConversationId;
        dispatch(
          setLastMsg({
            conversationId,
            lastMsg: { senderId, text, createdAt: date.toISOString() },
          }),
        );
        isVisited
          ? dispatch(
              addMessage({
                _id: date.getTime(),
                senderId,
                text,
                conversationId,
                createdAt: date.toISOString(),
              }),
            )
          : dispatch(
              updateStateConversation({ conversationId, isUnSeen: true }),
            );
      };

      getMessage(getMessageHandler, socket);
      return () => removeGetMessage(getMessageHandler, socket);
    }
  }, [getSocketIO()?.connected, visitedConversationId]);

  useEffect(() => {
    scrollRef.current &&
      (scrollRef.current.scrollTop = scrollRef.current?.scrollHeight);
  }, [messages]);

  return (
    <AnimatePresence>
      {isPending ? (
        <CircleLoading height="h-[79.5%]" />
      ) : (
        <ul
          ref={scrollRef}
          className="h-[65vh] w-full flex flex-col gap-y-5 p-2 overflow-auto bg-gradient-b from-transparent to-white z-9 shadow-[0_0_10px_-5px_#0000004a]"
        >
          {messages?.length === 0 && (
            <p className="text-center text-[16px] font-[500] text-slate-600">
              Let's chat here!
            </p>
          )}
          {messages?.map((message) => {
            return (
              <MessageItem
                key={message._id}
                isOwn={message.senderId === userId}
                senderId={message.senderId}
                message={message.text}
                timeAt={formatTime(message.createdAt)}
              />
            );
          })}
        </ul>
      )}
    </AnimatePresence>
  );
};

export default memo(Messages);
