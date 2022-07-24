import React from 'react';
import { useSelector } from 'react-redux';
import { commonStyle } from '../../pages/Message';
import { getConversationList } from '../../../store/selectors';
import { Navigate } from 'react-router-dom';

const PseudoChat = () => {
  const conversationList = useSelector(getConversationList);

  return (
    <>
      {conversationList?.length > 0 ? <Navigate to={`/message/${conversationList[0]._id}`} replace />
        :
        <div
          className={`basis-3/4 ${commonStyle} bg-transparent relative mt-[-6px] items-center flex justify-center`}
        >
          <span className="font-[800] text-white drop-shadow-md text-3xl">
            Connect to every one!
          </span>
        </div>
      }
    </>
  );
};

export default PseudoChat;
