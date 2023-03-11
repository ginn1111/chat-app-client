import { useEffect, useMemo, memo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';

import Backdrop from '@components/ui/modal/Backdrop';
import useUI from '@hooks/useUI';
import { resetStatus } from '@store/message-slice';
import {
  getStatusMessage,
  getConversationList,
  getUser,
} from '@store/selectors';
import EditorMessage from './EditorMessage';
import Header from './Header';
import Messages from './Messages';

const Conversation = () => {
  // const { id: conversationId } = useParams();
  // const { id: userId } = useSelector(getUser);
  // const conversationList = useSelector(getConversationList);
  // const { onHideConversationList, onHideConverInfor } = useUI();
  // const dispatch = useDispatch();
  // const status = useSelector(getStatusMessage);
  // const isPending = useMemo(() => status === 'get-message/pending', [status]);
  // const [isLoadingMore, setIsLoadingMore] = useState(true);

  // const { isShowInfor, sizeWindow } = useUI();

  // useEffect(() => {
  //   if (status === 'get-message/success') {
  //     setIsLoadingMore(false);
  //     dispatch(resetStatus());
  //     onHideConversationList();
  //   }
  // }, [status]);

  // const conversationInfor = useMemo(() => {
  //   const conversation = conversationList.find(
  //     (con) => con._id === conversationId
  //   );
  //   return conversation?.isGroup
  //     ? {
  //         ...conversation,
  //         avatar: conversation?.members?.slice(0, 2).map((m) => m.avatar),
  //       }
  //     : conversation;
  // }, [conversationId, conversationList]);

  // const receiverId = useMemo(
  //   () =>
  //     !conversationInfor?.isGroup &&
  //     conversationInfor?.members.find((m) => m.memberId !== userId)?.memberId,
  //   [conversationInfor]
  // );

  return (
    <section className="flex flex-col h-full">
      <div>
        <Header />
      </div>
      <div className="flex-1 overflow-hidden">
        <Messages />
      </div>
      <div>
        <EditorMessage />
      </div>
    </section>
  );
};

export default memo(Conversation);
