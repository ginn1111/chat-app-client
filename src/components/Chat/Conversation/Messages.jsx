import { useRef, useEffect, memo, useState } from 'react';
import { useParams } from 'react-router-dom';
import MessageItem from './MessageItem';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUser,
  getMessageList,
  hasMore as hasMoreMsg,
  hasGetMore,
} from '../../../store/selectors';
import getSocketIO, {
  getMessage,
  removeGetMessage,
} from '../../../services/socketIO';
import {
  addMessage,
  getMessages,
  hasMore as setHasMore,
  hasGetMore as setHasGetMore,
} from '../../../store/message-slice';

import {
  setLastMsg,
  updateStateConversation,
} from '../../../store/conversation-slice';

const Messages = ({ isPending, onHasLoadingMore, isLoadingMore }) => {
  // const { id: userId } = useSelector(getUser);
  // const { id: visitedConversationId } = useParams();
  // const messages = useSelector(getMessageList);
  // const isGetMore = useSelector(hasGetMore);
  // const hasMore = useSelector(hasMoreMsg);
  // const dispatch = useDispatch();

  // const scrollRef = useRef();
  // const observer = useRef();

  // useEffect(() => {
  //   if (
  //     isLoadingMore ||
  //     scrollRef.current?.scrollHeight <= scrollRef.current?.clientHeight
  //   )
  //     return;
  //   const intersectionObserver = new IntersectionObserver(
  //     (entries) => {
  //       if (entries[0].isIntersecting) {
  //         onHasLoadingMore(true);
  //         dispatch(setHasGetMore(true));
  //         dispatch(
  //           getMessages(visitedConversationId, null, messages.length, 2)
  //         );
  //       }
  //     },
  //     {
  //       root: document.querySelector('[data-scroll-parent]'),
  //     }
  //   );
  //   if (observer.current && hasMore)
  //     intersectionObserver.observe(observer.current);

  //   return () => intersectionObserver.disconnect();
  // }, [hasMore, isLoadingMore, messages]);

  // useEffect(() => {
  //   if (visitedConversationId) {
  //     dispatch(setHasMore(true));
  //     dispatch(getMessages(visitedConversationId, null, 0, 10));
  //   }
  //   dispatch(setHasGetMore(false));
  // }, [visitedConversationId]);

  // useEffect(() => {
  //   const socket = getSocketIO();
  //   if (socket?.connected) {
  //     const getMessageHandler = ({ senderId, text, conversationId }) => {
  //       const date = new Date();
  //       const isVisited = conversationId === visitedConversationId;
  //       dispatch(
  //         setLastMsg({
  //           conversationId,
  //           lastMsg: { senderId, text, createdAt: date.toISOString() },
  //         })
  //       );
  //       isVisited
  //         ? dispatch(
  //             addMessage({
  //               _id: date.getTime(),
  //               senderId,
  //               text,
  //               conversationId,
  //               createdAt: date.toISOString(),
  //             })
  //           )
  //         : dispatch(
  //             updateStateConversation({ conversationId, isUnSeen: true })
  //           );
  //     };

  //     getMessage(getMessageHandler, socket);
  //     return () => removeGetMessage(getMessageHandler, socket);
  //   }
  // }, [getSocketIO()?.connected, visitedConversationId]);

  // useEffect(() => {
  //   scrollRef.current &&
  //     (scrollRef.current.scrollTop = isGetMore
  //       ? 200
  //       : scrollRef.current?.scrollHeight);
  // }, [messages, isGetMore]);

  const messages = [
    { id: 0, text: 'text', isOwn: false },
    { id: 1, text: 'text text text text text', isOwn: true },
    { id: 2, text: 'text', isOwn: false },
    { id: 3, text: 'text', isOwn: false },
    { id: 4, text: 'text text text text text', isOwn: true },
    { id: 5, text: 'text', isOwn: false },
    { id: 6, text: 'text', isOwn: false },
    { id: 7, text: 'text text text text text', isOwn: true },
    { id: 8, text: 'text', isOwn: false },
    { id: 9, text: 'text', isOwn: false },
    { id: 10, text: 'text text text text text', isOwn: true },
    { id: 11, text: 'text', isOwn: false },
    { id: 12, text: 'text', isOwn: false },
    { id: 13, text: 'text text text text text', isOwn: true },
    { id: 14, text: 'text', isOwn: false },
    { id: 15, text: 'text', isOwn: false },
    { id: 16, text: 'text text text text text', isOwn: true },
    { id: 17, text: 'text', isOwn: false },
    { id: 18, text: 'text', isOwn: false },
    { id: 19, text: 'text text text text text', isOwn: true },
    { id: 20, text: 'text', isOwn: false },
    { id: 21, text: 'text', isOwn: false },
    { id: 22, text: 'text text text text text', isOwn: true },
    { id: 23, text: 'text', isOwn: false },
    { id: 24, text: 'text', isOwn: false },
    { id: 25, text: 'text text text text text', isOwn: true },
    { id: 26, text: 'text', isOwn: false },
    { id: 27, text: 'text', isOwn: false },
    { id: 28, text: 'text text text text text', isOwn: true },
    { id: 29, text: 'text', isOwn: false },
    { id: 30, text: 'text', isOwn: false },
    { id: 31, text: 'text text text text text', isOwn: true },
    { id: 32, text: 'text', isOwn: false },
  ];

  return (
    <ul className="h-full flex flex-col overflow-auto bg-white px-28 py-16 gap-16">
      {messages?.map((message) => (
        <MessageItem
          key={message.id}
          isOwn={message.isOwn}
          senderId={message.senderId}
          message={message.text}
        />
      ))}
    </ul>
  );
};

export default memo(Messages);
