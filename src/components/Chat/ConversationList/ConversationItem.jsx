import { useState, useMemo, memo, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getUser } from '../../../store/selectors';
import { getOfflineTime } from '../../../utils/helper';
import { useSelector } from 'react-redux';
import NotifyBubble from '../../ui/notification/NotifyBubble';
import GroupAvatar from '../GroupAvatar';

const ConversationItem = ({
  avatar,
  name,
  fromOnline,
  conversationId,
  lastMsg,
  isUnSeen,
  isGroup,
  members,
}) => {
  return (
    <li className="px-20 py-16 bg-white text-gray-500 group hover:conversation-active rounded-[6px] relative">
      <div className="flex">
        <article className="relative online w-56 h-56">
          <img
            className="block w-full h-full rounded-cir"
            src="https://www.figma.com/file/cXZUlJRHi5JhnrgLdZZfvK/image/25daf6b6c9cfce0b73cb0788f056ca80336c3df5?fuid=1056603901594338444"
            alt="Conversation Avatar"
          />
        </article>
        <article className="flex flex-col justify-evenly ml-20 flex-1">
          <p className="font-medium text-16">{name}</p>
          <p className="text-[14px] text-primary group-[.conversation-active]:text-white group-hover:text-white">
            Status
          </p>
        </article>
        <p className="text-[14px]">1 day ago</p>
      </div>
      <div className="flex mt-20 gap-20">
        <p className="text line-clamp-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
          quisquam, repudiandae quibusdam, consequatur qui dolor delectus odit
          soluta quia unde incidunt id dicta officia esse temporibus neque hic
          autem impedit.
        </p>
        <NotifyBubble isNotify />
      </div>
    </li>
  );
};

export default memo(ConversationItem);
