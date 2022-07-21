import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom'
import { getConversationList, getMessageList, getStatusMessage } from '../../../store/selectors'
import { getMessages } from '../../../store/message-slice'
import { useSelector, useDispatch } from 'react-redux'
import { commonStyle } from '../../pages/Message';
import Send from './Send';
import Header from './Header';
import Settings from '../settings/Settings'
import Messages from './Messages';
import CircleLoading from '../../ui/loading/CircleLoading'
import { AnimatePresence, motion } from 'framer-motion'

const Chat = () => {
  const { id: conversationId } = useParams();
  const dispatch = useDispatch();
  const messageList = useSelector(getMessageList)
  const conversationList = useSelector(getConversationList)
  const status = useSelector(getStatusMessage)
  const isPending = useMemo(() => status === 'get-message/pending', [status])

  useEffect(() => {
    dispatch(getMessages(conversationId));
  }, [conversationId])

  const conversatonInfor = useMemo(() => conversationList.find(con => con._id === conversationId), [conversationId, conversationList])

  const [isShowInfor, setIsShowInfor] = useState(false);
  function toggleInfor() {
    setIsShowInfor(prev => !prev)
  }

  return (
    <>
      <div className={` ${isShowInfor ? 'w-1/2' : 'w-3/4'}  ${commonStyle} bg-transparent relative mt-[-6px]`} >

        <AnimatePresence>
          {isPending && <CircleLoading />}
        </AnimatePresence>
        {!isPending &&
          <>
            <Header avatar={conversatonInfor?.avatar} name={conversatonInfor?.title} isShowInfor={isShowInfor} onShowInfor={toggleInfor} />
            <Messages messages={messageList} conversationAvatar={conversatonInfor?.avatar} />
            <Send conversationId={conversationId} />
          </>
        }
      </div>
      {isShowInfor && <motion.div
        className={`${commonStyle} flex flex-col basis-1/4 gap-y-2 relative text-primary items-center mt-2`}
      >
        <Settings />
      </motion.div>}
    </>
  );
};

export default Chat;
