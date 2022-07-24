import React, { useEffect, useMemo, useState } from 'react';
import { commonStyle } from '../../pages/Message';
import Search from '../../ui/search/Search';
import ConversationItem from './ConversationItem';
import Header from './Header';
import { useDispatch, useSelector } from 'react-redux'
import { getConversationList, getLastedMessage, getUser } from '../../../store/selectors'
import { getConversation } from '../../../store/conversation-slice'
import { getUserOnline, removeGetUserOnline } from '../../../services/socketIO';

const ConversationList = ({ conversationId }) => {
  const dispatch = useDispatch();
  const { id: userId } = useSelector(getUser);
  const lastedMsg = useSelector(getLastedMessage);
  const conversationList = useSelector(getConversationList)
  const [userListWithOnline, setUserListWithOnline] = useState([]);
  const conversationListWithOnline = useMemo(() => {
    return conversationList.map(con => {
      return { ...con, isOnline: con.members.some(m => userId !== m.memberId && userListWithOnline.includes(m.memberId)) };
    });
  }, [userListWithOnline, conversationList]);

  useEffect(() => {
    dispatch(getConversation({}))
  }, [])

  useEffect(() => {
    getUserOnline((users) => {
      setUserListWithOnline(users);
    })

    return () => removeGetUserOnline();
  }, [])

  return (
    <>
      <Header />
      <div className="text-[14px] w-full">
        <Search bgColor="bg-slate-200 text-[14px]" placeholder="search chat..." />
      </div>
      <ul className="h-full w-full flex flex-col overflow-auto pr-1">
        {conversationListWithOnline?.length === 0 && <p className="text-center text-[16px] font-[500] text-slate-600">No conversation found!</p>}
        {conversationListWithOnline?.map(conversation => {
          return (
            <ConversationItem
              key={conversation._id}
              name={conversation?.title}
              avatar={conversation?.avatar}
              fromOnline={conversation?.isOnline ? null : conversation?.fromOnline}
              conversationId={conversation._id}
              isChoosing={conversationId === conversation._id}
              lastedMsg={lastedMsg}
            />
          );
        })}
      </ul>
    </>
  );
};

export default ConversationList;
