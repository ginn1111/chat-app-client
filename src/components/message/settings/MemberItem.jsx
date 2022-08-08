import React from 'react';
import { Link } from 'react-router-dom';
import { UilInfoCircle } from '@iconscout/react-unicons';

const MemberItem = ({ avatar, name, linkProfile }) => {
  return (
    <li className="flex justify-between items-center w-full px-2 py-1 bg-white rounded-md item-hovered">
      <div className="flex items-center gap-x-2">
        <img
          className="w-6 object-cover object-center h-6 rounded-full"
          src={avatar}
          alt="avatar-information-member"
        />
        <span>{name}</span>
      </div>
      <Link to={linkProfile}>
        <UilInfoCircle />
      </Link>
    </li>
  );
};

export default MemberItem;
