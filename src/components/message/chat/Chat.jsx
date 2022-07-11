import React from 'react';
import { commonStyle } from '../../pages/Message';
import Send from './Send';
import Header from './Header';
import Messages from './Messages';

const Chat = () => {
  return (
    <div
      className={`basis-1/2 ${commonStyle} bg-transparent relative mt-[-6px]`}
    >
      <Header />
      <Messages />
      <Send />
    </div>
  );
};

export default Chat;
