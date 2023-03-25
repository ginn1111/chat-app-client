import { useState, useMemo, memo, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getUser } from '../../../store/selectors';
import { formatRelativeTime } from '@utils/helper';
import { useSelector } from 'react-redux';
import NotifyBubble from '../../ui/notification/NotifyBubble';
import GroupAvatar from '../GroupAvatar';
import { PrimaryHover } from '@components/common/Effect/Hover';
import PATHS from '@constants/paths';

const ConversationItem = ({
  avatar,
  title,
  fromOnline,
  id,
  lastMsg,
  isGroup,
  members,
}) => {
  return (
    <PrimaryHover
      as="li"
      className="bg-white group text-gray-500 rounded-[6px] relative"
    >
      <Link to={PATHS.CHAT + id} className="block px-20 py-16">
        <div className="flex">
          <div className="relative online w-56 h-56">
            <img
              className="block w-full h-full ring-2 ring-white rounded-cir"
              src={avatar}
              alt="Conversation Avatar"
            />
          </div>
          <article className="flex flex-col justify-evenly ml-20 flex-1 overflow-hidden">
            <p className="font-medium truncate">{title}</p>
            <p className="text-primary group-[.primary-hover]:text-white group-hover:text-white">
              Status
            </p>
          </article>
          <p>{formatRelativeTime(fromOnline)}</p>
        </div>
        <div className="flex mt-20 gap-20">
          <p className="text line-clamp-3">{lastMsg.text}</p>
          <NotifyBubble isNotify />
        </div>
      </Link>
    </PrimaryHover>
  );
};

export default memo(ConversationItem);
