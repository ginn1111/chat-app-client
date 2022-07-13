import React from 'react';
import FriendItem from './FriendItem';
import Avatar from '../../assets/img/avatar2.jpeg';

const FriendList = ({ list }) => {
  const isEmpty = !list || list.length === 0;
  return (
    <ul className="w-full h-max max-h-[50vh] overflow-auto grid gap-2 grid-cols-2 items-start justify-center p-2">
      {isEmpty && (
        <span className="text-center w-full block col-span-2 row-span-2">
          You are alone !^^
        </span>
      )}
      {!isEmpty &&
        list.map((friend) => {
          return (
            <FriendItem
              key={friend._id}
              avatar={Avatar}
              name={`${friend.firstName} ${friend.lastName}`}
              slogan={friend.biography}
              id={friend._id}
            />
          );
        })}
    </ul>
  );
};

export default FriendList;
