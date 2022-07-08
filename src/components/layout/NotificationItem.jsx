import React from 'react';

const NotificationItem = ({ avatar, name, message }) => {
  return (
    <li className="hover:bg-blue-400 hover:text-white duration-300 cursor-pointer w-full h-max rounded-md p-1 object-cover object-center flex items-start gap-x-2">
      <img
        src={avatar}
        alt="avatar-notify"
        className="w-6 h-6 rounded-full border-solid border-2 border-white"
      />
      <div className="flex flex-col w-full leading-tight">
        <span className="text-[14px] font-bold">{name}</span>
        <span className="text-[12px]">{message}</span>
      </div>
    </li>
  );
};

export default NotificationItem;
