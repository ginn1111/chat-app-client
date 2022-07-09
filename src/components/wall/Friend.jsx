import React from 'react';
import FriendList from './FriendList';

const Friend = () => {
  return (
    <div className="w-full h-max">
      <h6 className="w-full block border-b text-sm font-bold border-solid border-b-slate-900">
        Friends
      </h6>
      <FriendList list="" />
    </div>
  );
};

export default Friend;
