import React, { useEffect } from 'react';
import { commonStyle } from '../../pages/Message';
import Search from '../../ui/search/Search';
import Blur from '../../ui/blur/Blur';
import ConversationItem from './ConversationItem';
import Header from './Header';
import { useDispatch, useSelector } from 'react-redux'
import { getConversationList } from '../../../store/selectors'
import { getConversation } from '../../../store/conversation-slice'

const ConversationList = ({conversationId}) => {
  const dispatch = useDispatch();
  const conversationList = useSelector(getConversationList)

  useEffect(() => {
    dispatch(getConversation({}))
  }, [])

  return (
    <div
      className={`width-1/4  ${commonStyle} flex flex-col items-center gap-y-2 text-[14px] bg-transparent pr-2`}
    >
      <Blur top="top-[0%]" left="left-[20%]" bgColor="bg-blue-300" />
      <Header />
      <div className="text-[14px] w-full">
        <Search bgColor="bg-white" placeholder="search chat..." />
      </div>
      <ul className="h-full w-full flex flex-col gap-y-0.5 overflow-auto pr-1">
        {conversationList?.map(conversation => {
          return <ConversationItem key={conversation._id} name={conversation?.title} avatar={conversation?.avatar} isOnline conversationId={conversation._id} isChoosing={conversationId === conversation._id}/>
        })}
      </ul>
    </div>
  );
};

export default ConversationList;
