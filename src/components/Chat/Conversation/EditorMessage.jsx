import React from 'react';
import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';

import { sendMessage } from '@store/message-slice';
import useInput from '@hooks/useInput';
import { validateEmpty } from '@utils/validate';
import getSocketIO, {
  sendMessage as sendMessageToSocketIO,
} from '@services/socketIO';
import { getUser } from '@store/selectors';
import { setLastMsg } from '@store/conversation-slice';
import { AddIcon, SmileIcon, SendIcon } from '@components/common/icons';

const EditorMessageControl = ({ icon, className, ...props }) => {
  return (
    <button
      className={clsx(
        'hover:brightness-105 text-white bg-gradient-to-br from-[#7CB8F7] to-[#2A8BF2]  shadow-[0_1px_1px_0_#00000008] rounded-cir w-40 h-40',
        className
      )}
      {...props}
    >
      {icon}
    </button>
  );
};

const EditorMessage = ({ conversationId, receiverId }) => {
  const dispatch = useDispatch();
  const { id: userId } = useSelector(getUser);

  const {
    state: { value, isValid },
    actions: { onChange, onBlur, reset },
  } = useInput(validateEmpty);

  function send() {
    dispatch(sendMessage(conversationId, value));
    dispatch(
      setLastMsg({
        conversationId,
        lastMsg: {
          text: value,
          senderId: userId,
          createdAt: new Date().toISOString(),
        },
      })
    );

    sendMessageToSocketIO(
      {
        senderId: userId,
        text: value,
        receiverId,
        conversationId,
      },
      getSocketIO()
    );
    reset();
  }

  function sendMessageHandler() {
    if (!isValid) return;
    send();
  }

  function enterHandler(e) {
    if (e.code !== 'Enter' || !isValid) return;
    send();
  }

  return (
    <div className="bg-white relative flex py-20 px-28 gap-12 items-center rounded-[0_0_6px_6px]">
      <span className="w-4/5 h-[1px] bg-gray-300 absolute top-0 left-0 right-0 mx-auto" />
      <EditorMessageControl
        icon={<AddIcon />}
        className="p-8"
      />
      <input
        onChange={onChange}
        onKeyDown={enterHandler}
        value={value}
        onBlur={onBlur}
        placeholder="Type message here"
        type="text"
        className="flex-1 border-none outline-none text-slate-600"
      />
      <div className="flex text-16 items-center gap-20">
        <button className="text-gray-400">
          <SmileIcon />
        </button>
        <EditorMessageControl
          icon={
            <div className="-rotate-45 translate-x-[2px] -translate-y-[2px] hover:translate-x-4 hover:-translate-y-4 transition-transform p-8">
              <SendIcon size={20} />
            </div>
          }
        />
      </div>
    </div>
  );
};

export default EditorMessage;
