import React from 'react';
import Avatar from '../../../assets/img/avatar2.jpeg';
import MessageItem from './MessageItem';

const Messages = () => {
  return (
    <ul className="h-[66vh] w-full flex flex-col gap-y-5 p-2 overflow-auto bg-gradient-b from-transparent to-white z-9 shadow-[0_0_10px_-5px_#0000004a]">
      <MessageItem
        isOwn
        avatar={Avatar}
        message="Hey! I am Gin"
        timeAt="11:13 PM"
      />
      <MessageItem
        isOwn
        avatar={Avatar}
        message="Are you here?"
        timeAt="11:14 PM"
      />
      <MessageItem
        avatar={Avatar}
        message="
      
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate optio id provident! Illo magnam quod itaque ab quibusdam, numquam ratione consequatur repellendus sed sit, autem nisi distinctio consequuntur. Quidem, impedit.
      "
        timeAt="5:10 PM"
      />
      <MessageItem
        avatar={Avatar}
        message="
      
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate optio id provident! Illo magnam quod itaque ab quibusdam, numquam ratione consequatur repellendus sed sit, autem nisi distinctio consequuntur. Quidem, impedit.
      "
        timeAt="5:10 PM"
      />
    </ul>
  );
};

export default Messages;
