import { Transition } from '@headlessui/react';
import React, { useRef, useEffect, useMemo, useState, memo } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

import ConversationSkeleton from '@components/common/Skeleton/ConversationSkeleton';
import ConversationItem from './ConversationItem';
import Header from './Header';
import {
  getConversationList,
  getConversationsStatus,
  getUser,
  isGroup,
} from '@store/selectors';
import {
  updateStateConversation,
  setIsGroup,
  getConversation,
} from '@store/conversation-slice';
import getSocketIO, {
  initConversations,
  removeGetUserOnline,
  getUserOnline,
  getStateConversations,
  removeGetStateConversations,
  updateStateConversation as updateStateConversationToSocket,
  joinRoom,
  emitGetStateConversations,
} from '@services/socketIO';
import useSearch from '@hooks/useSearch';
import useConversationList from '../hooks/useConversationList';

const ConversationList = () => {
  const { conversationList, isLoading, error } = useConversationList();

  // useEffect(() => {
  //   const id = conversationList?.[0]?._id;
  //   status === 'conversation-get/success' &&
  //     navigate(`/message/${id ?? ''}`, { replace: true });
  // }, [status]);

  // useEffect(() => {
  //   const socket = getSocketIO();
  //   if (socket?.connected && isGroupTab && conversationList?.length > 0) {
  //     const rooms = conversationList.map((con) => con._id);
  //     joinRoom(rooms, socket);
  //   }
  // }, [conversationList, getSocketIO()?.connected, isGroupTab]);

  // useEffect(() => {
  //   dispatch(getConversation({ userId, isGroup: isGroupTab }));
  // }, [isGroupTab]);

  // useEffect(() => {
  //   const socket = getSocketIO();
  //   if (socket?.connected) {
  //     emitGetStateConversations(userId, socket);

  //     getStateConversations(setStateConversations, socket);

  //     return () => removeGetStateConversations(setStateConversations, socket);
  //   }
  // }, [getSocketIO()?.connected, isGroupTab, userId]);

  // useEffect(() => {
  //   let parent = null;
  //   isGroupTab ? (parent = groupRef.current) : (parent = personRef.current);

  //   divRef.current.style.left = parent?.offsetLeft + 'px';
  //   divRef.current.style.width = parent?.offsetWidth + 'px';

  //   console.log(parent?.offsetLeft);
  // }, [isGroupTab]);

  // //[Update conversation isSeen when user visited]
  // useEffect(() => {
  //   const socket = getSocketIO();
  //   if (socket?.connected && conversationId) {
  //     updateStateConversationToSocket({ conversationId, isSeen: true }, socket);
  //     dispatch(updateStateConversation({ conversationId, isUnSeen: false }));
  //   }
  // }, [getSocketIO()?.connected, conversationId]);

  // //[INIT User online of conversationList]
  // useEffect(() => {
  //   const socket = getSocketIO();
  //   if (socket?.connected) {
  //     initConversations(userId, socket);
  //     getUserOnline(setUsersOnline, socket);
  //     return () => removeGetUserOnline(setUsersOnline, socket);
  //   }
  // }, [getSocketIO()?.connected, userId]);

  // const conversationListWithOnline = useMemo(() => {
  //   const usersIdOnline = Object.keys(usersOnline);
  //   const stateConversationsId = Object.keys(stateConversations);
  //   return conversationList.map((con) => {
  //     const memberId = con.members.find(
  //       ({ memberId }) =>
  //         memberId !== userId && usersIdOnline.includes(memberId)
  //     )?.memberId;
  //     return {
  //       ...con,
  //       fromOnline: memberId ? usersOnline[memberId] : con.fromOnline,
  //       isUnSeen:
  //         con?.isUnSeen ??
  //         (stateConversationsId.includes(con._id)
  //           ? !stateConversations[con._id]
  //           : false),
  //     };
  //   });
  // }, [usersOnline, conversationList, stateConversations]);

  // const filterList = useMemo(() => {
  //   if (filterConversation === '') return conversationListWithOnline;
  //   return conversationListWithOnline.filter((con) =>
  //     con.title.toLowerCase().includes(filterConversation.trim().toLowerCase())
  //   );
  // }, [conversationListWithOnline, filterConversation]);

  const conversationListSkeleton = (
    <Transition
      as="ul"
      className="mt-20 space-y-20"
      show={isLoading && !error}
      enter="transition-opacity duration-300"
      leave="transition-all duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-1"
      leaveTo="h-0 p-0 m-0 overflow-hidden opacity-0"
      leaveFrom="opacity-1 h-full"
    >
      {Array.from({ length: 3 }, (_, i) => i).map((_, idx) => (
        <ConversationSkeleton as="li" key={idx} />
      ))}
    </Transition>
  );

  const filterList = conversationList;
  let conversationListRender = (
    <ul className="overflow-auto flex-1 mt-20 space-y-20">
      {!filterList ||
        (filterList?.length === 0 && (
          <p className="text-center text-[16px] font-medium">
            No conversation found!
          </p>
        ))}
      {filterList?.map((conversation) => {
        return <ConversationItem key={conversation.id} {...conversation} />;
      })}
    </ul>
  );

  return (
    <>
      <Header />
      {conversationListSkeleton}
      {conversationListRender}
    </>
  );
};

export default memo(ConversationList);
