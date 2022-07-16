import React from 'react';
import { Link } from 'react-router-dom';

const AvatarSettingItem = ({ icon, title, url }) => {
  return (
    <li>
      <Link
        to={url}
        className="hover:bg-blue-400 duration-200 hover:text-white px-2 py-1 rounded-sm font-[500] flex items-center gap-x-1"
      >
        {icon}
        <span>{title}</span>
      </Link>
    </li>
  );
};

export default AvatarSettingItem;
