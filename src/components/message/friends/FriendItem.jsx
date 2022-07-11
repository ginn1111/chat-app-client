import React from 'react';
import { Link } from 'react-router-dom';

const FriendItem = ({ avatar, name, isOnline, fromOnline, url }) => {
  return (
    <li className="h-max w-full bg-white px-3 py-2 rounded-md item-hovered text-slate-600">
      <Link to="/message/id">
        <div className="flex gap-x-2 w-full relative">
          <div className={`relative  online ${isOnline ? '' : 'off'}`}>
            <img
              className="h-8 w-8 object-center rounded-full"
              src={avatar}
              alt="avatar-chat"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-[16px] font-[500]">{name}</span>
            <span>Some thing here</span>
          </div>
          <span
            className={`ml-auto inline-block ${
              isOnline ? 'text-green-400' : ''
            }`}
          >
            {isOnline ? 'online' : fromOnline}
          </span>
        </div>
      </Link>
    </li>
  );
};

export default FriendItem;
