import React from 'react';
import { Link } from 'react-router-dom';

const FriendItem = ({ avatar, slogan, name, id }) => {
  return (
    <li className="h-full">
      <Link
        className="text-[16px] flex items-center gap-x-2 w-full h-full bg-white shadow-lg p-2 rounded-md item-hovered"
        to={`/wall/${id}`}
      >
        <img
          src={avatar}
          alt="avatar-friend"
          className="w-10 h-10 rounded-full border-2 border-solid border-white object-center object-cover"
        />
        <div className="w-full overflow-hidden h-full">
          <h3 className="w-full font-bold text-[18px]">{name}</h3>
          <span className="w-full inline-block overflow-hidden whitespace-nowrap text-ellipsis">
            {slogan}
          </span>
        </div>
      </Link>
    </li>
  );
};

export default FriendItem;
