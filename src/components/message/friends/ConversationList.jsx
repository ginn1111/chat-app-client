import React, { useEffect, useMemo, useState } from 'react';
import Search from '../../ui/search/Search';
import ConversationItem from './ConversationItem';
import Header from './Header';
import { useDispatch, useSelector } from 'react-redux';
import { getConversationList, getUser } from '../../../store/selectors';
import {
  getConversation,
  updateStateConversation,
} from '../../../store/conversation-slice';
import getSocketIO, {
  initConversations,
  removeGetUserOnline,
  getUserOnline,
  getStateConversations,
  removeGetStateConversations,
  updateStateConversation as updateStateConversationToSocket
} from '../../../services/socketIO';

const ConversationList = ({ conversationId }) => {
  const dispatch = useDispatch();
  const conversationList = useSelector(getConversationList);
  const { id: userId } = useSelector(getUser);

  const [usersOnline, setUsersOnline] = useState({});
  const [stateConversations, setStateConversations] = useState({});

  const conversationListWithOnline = useMemo(() => {
    const usersIdOnline = Object.keys(usersOnline);
    const stateConversationsId = Object.keys(stateConversations);
    return conversationList.map((con) => {
      const memberId = con.members.find(
        ({ memberId }) =>
          memberId !== userId && usersIdOnline.includes(memberId),
      )?.memberId;
      return {
        ...con,
        fromOnline: memberId ? usersOnline[memberId] : con.fromOnline,
        isUnSeen: con?.isUnSeen ?? (stateConversationsId.includes(con._id)
          ? !stateConversations[con._id]
          : false),
      };
    });
  }, [usersOnline, conversationList, stateConversations]);

  useEffect(() => {
    dispatch(getConversation({}));
  }, []);

  useEffect(() => {
    dispatch(updateStateConversation({ conversationId, isUnSeen: false }));
  }, [conversationId]);

  useEffect(() => {
    const socket = getSocketIO();
    socket &&
      updateStateConversationToSocket({ conversationId, isSeen: true }, socket)
  }, [getSocketIO(), conversationId])

  useEffect(() => {
    const socket = getSocketIO();

    initConversations(userId, socket);
    getStateConversations(setStateConversations, socket);
    getUserOnline(setUsersOnline, socket);

    return () => {
      removeGetStateConversations(setStateConversations, socket);
      removeGetUserOnline(setUsersOnline, socket);
    };
  }, [getSocketIO()]);

  console.log({ conversationList })
  console.log({ conversationListWithOnline })

  return (
    <>
      <Header />
      <div className="text-[14px] w-full">
        <Search
          bgColor="bg-slate-200 text-[14px]"
          placeholder="search chat..."
        />
      </div>
      <ul className="h-full w-full flex flex-col overflow-auto pr-1">
        {conversationListWithOnline?.length === 0 && (
          <p className="text-center text-[16px] font-[500] text-slate-600">
            No conversation found!
          </p>
        )}
        {conversationListWithOnline?.map((conversation) => {
          return (
            <ConversationItem
              key={conversation._id}
              name={conversation?.title}
              avatar={conversation?.avatar}
              fromOnline={
                conversation?.isOnline ? null : conversation?.fromOnline
              }
              conversationId={conversation._id}
              lastMsg={conversation?.lastMsg}
              isUnSeen={conversation?.isUnSeen}
            />
          );
        })}
      </ul>
    </>
  );
};

export default ConversationList;
