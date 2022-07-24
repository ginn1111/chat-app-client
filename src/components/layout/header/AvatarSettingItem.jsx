import React from 'react';
import { Link } from 'react-router-dom';

export const Item = ({ icon, title }) => {
  return (
    <div className="hover:bg-slate-100 duration-200 px-2 py-1 rounded-sm font-[500] flex items-center gap-x-2 min-w-[200px] text-[14px]">
      <span className="bg-slate-200 flex items-center justify-center rounded-full p-1">{icon}</span>
      <span>{title}</span>
    </div>
  )
}

const AvatarSettingItem = ({ icon, title, url }) => {
  return (
    <li>
      <Link
        to={url}
      >
        <Item title={title} icon={icon} />
      </Link>
    </li>
  );
};

export default AvatarSettingItem;
