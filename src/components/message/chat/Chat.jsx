import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom'
import { getConversationList, getStatusMessage } from '../../../store/selectors'
import { getMessages } from '../../../store/message-slice'
import { useSelector, useDispatch } from 'react-redux'
import { commonStyle } from '../../pages/Message';
import Send from './Send';
import Header from './Header';
import Settings from '../settings/Settings'
import Messages from './Messages';
import CircleLoading from '../../ui/loading/CircleLoading'
import { AnimatePresence, motion } from 'framer-motion'
import { getUser } from '../../../store/selectors';

const Chat = () => {
  const { id: conversationId } = useParams();
  const { id: userId } = useSelector(getUser);
  const dispatch = useDispatch();
  const conversationList = useSelector(getConversationList)
  const status = useSelector(getStatusMessage)

  useEffect(() => {
    dispatch(getMessages(conversationId));
  }, [conversationId])

  const isPending = useMemo(() => status === 'get-message/pending', [status])
  const conversationInfor = useMemo(() => conversationList.find(con => con._id === conversationId), [conversationId, conversationList])
  const receiverId = useMemo(() => !conversationInfor?.isGroup && conversationInfor?.members.filter(m => m.memberId !== userId)[0].memberId, [conversationInfor]);

  const [isShowInfor, setIsShowInfor] = useState(false);
  function toggleInfor() {
    setIsShowInfor(prev => !prev)
  }

  return (
    <>
      <div className={`w-full duration-500 ${commonStyle} bg-transparent relative mt-[-6px]`} >

        <AnimatePresence>
          {isPending && <CircleLoading />}
        </AnimatePresence>
        {!isPending &&
          <>
            <Header avatar={conversationInfor?.avatar} name={conversationInfor?.title} isShowInfor={isShowInfor} onShowInfor={toggleInfor} />
            <Messages conversationAvatar={conversationInfor?.avatar} />
            <Send conversationId={conversationId} receiverId={receiverId} />
          </>
        }
      </div>
      {isShowInfor && <div
        className={`${commonStyle} flex flex-col w-[300px] gap-y-2 relative text-primary items-center mt-2 flex-none`}
      >
        <Settings friendId={receiverId} avatar={conversationInfor?.avatar} name={conversationInfor?.title} />
      </div>}
    </>
  );
};

export default Chat;
