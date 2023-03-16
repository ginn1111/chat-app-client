import React, { useRef, useEffect, useMemo, useState, memo } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

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

const ConversationList = () => {
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

  const filterList = [
    { id: 0, title: 'conversation 1' },
    { id: 1, title: 'conversation 2' },
    { id: 2, title: 'conversation 3' },
    { id: 3, title: 'conversation 4' },
    { id: 4, title: 'conversation 4' },
    { id: 5, title: 'conversation 4' },
    { id: 6, title: 'conversation 4' },
    { id: 7, title: 'conversation 4' },
  ];

  let conversationListRender = (
    <ul className="overflow-auto flex-1 mt-20 space-y-20">
      {filterList?.length === 0 && (
        <p className="text-center text-[16px] font-[500] text-slate-600">
          No conversation found!
        </p>
      )}
      {filterList?.map((conversation) => {
        return (
          <ConversationItem
            key={conversation.id}
            name={conversation?.title}
            // avatar={conversation?.avatar}
            // fromOnline={
            //   conversation?.isOnline ? null : conversation?.fromOnline
            // }
            conversationId={conversation.id}
            // lastMsg={conversation?.lastMsg}
            // isUnSeen={conversation?.isUnSeen}
            // isGroup={conversation?.isGroup}
            // members={conversation?.members}
          />
        );
      })}
    </ul>
  );

  return (
    <>
      <Header />
      {conversationListRender}
    </>
  );
};

export default memo(ConversationList);
