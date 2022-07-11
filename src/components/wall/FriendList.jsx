import React from 'react';
import FriendItem from './FriendItem';
import Avatar from '../../assets/img/avatar2.jpeg';

const FriendList = () => {
  return (
    <ul className="w-full h-max max-h-[50vh] overflow-auto grid gap-2 grid-cols-2 items-start justify-center p-2">
      <FriendItem avatar={Avatar} name="Gin" slogan="You only live one!" />
      <FriendItem avatar={Avatar} name="Gin" slogan="You only live one!" />
      <FriendItem avatar={Avatar} name="Gin" slogan="You only live one!" />
      {/* <FriendItem avatar={Avatar} name="Gin" slogan="You only live one!" />
      <FriendItem avatar={Avatar} name="Gin" slogan="You only live one!" />
      <FriendItem avatar={Avatar} name="Gin" slogan="You only live one!" />
      <FriendItem avatar={Avatar} name="Gin" slogan="You only live one!" />
      <FriendItem avatar={Avatar} name="Gin" slogan="You only live one!" />
      <FriendItem avatar={Avatar} name="Gin" slogan="You only live one!" />
      <FriendItem avatar={Avatar} name="Gin" slogan="You only live one!" />
      <FriendItem avatar={Avatar} name="Gin" slogan="You only live one!" />
      <FriendItem avatar={Avatar} name="Gin" slogan="You only live one!" />
      <FriendItem avatar={Avatar} name="Gin" slogan="You only live one!" />
      <FriendItem avatar={Avatar} name="Gin" slogan="You only live one!" />
      <FriendItem avatar={Avatar} name="Gin" slogan="You only live one!" />
      <FriendItem avatar={Avatar} name="Gin" slogan="You only live one!" />
      <FriendItem avatar={Avatar} name="Gin" slogan="You only live one!" />
      <FriendItem avatar={Avatar} name="Gin" slogan="You only live one!" />
      <FriendItem avatar={Avatar} name="Gin" slogan="You only live one!" />
      <FriendItem avatar={Avatar} name="Gin" slogan="You only live one!" />
      <FriendItem avatar={Avatar} name="Gin" slogan="You only live one!" />
      <FriendItem avatar={Avatar} name="Gin" slogan="You only live one!" />
      <FriendItem avatar={Avatar} name="Gin" slogan="You only live one!" />
      <FriendItem avatar={Avatar} name="Gin" slogan="You only live one!" />
      <FriendItem avatar={Avatar} name="Gin" slogan="You only live one!" />
      <FriendItem avatar={Avatar} name="Gin" slogan="You only live one!" />
      <FriendItem avatar={Avatar} name="Gin" slogan="You only live one!" />
      <FriendItem avatar={Avatar} name="Gin" slogan="You only live one!" />
      <FriendItem avatar={Avatar} name="Gin" slogan="You only live one!" />
      <FriendItem avatar={Avatar} name="Gin" slogan="You only live one!" />
      <FriendItem avatar={Avatar} name="Gin" slogan="You only live one!" />
      <FriendItem avatar={Avatar} name="Gin" slogan="You only live one!" />
      <FriendItem avatar={Avatar} name="Gin" slogan="You only live one!" /> */}
    </ul>
  );
};

export default FriendList;
