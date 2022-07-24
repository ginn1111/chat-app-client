import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../../../store/selectors';
import { getOfflineTime } from '../../../utils/helper';
import { useSelector } from 'react-redux';

const ConversationItem = ({ avatar, name, fromOnline, conversationId, isChoosing, lastedMsg }) => {
  const { id: userId } = useSelector(getUser);
  return (
    <li className={`h-max w-full bg-white px-3 py-2 rounded-md item-hovered text-slate-600 ${isChoosing ? 'bg-slate-100' : ''} `}>
      <Link to={`/message/${conversationId}`}>
        <div className="flex gap-x-2 w-full relative">
          <div className={`relative  online ${!fromOnline ? '' : 'off'} flex-none`}>
            <img
              className="h-8 w-8 object-center object-cover rounded-full border-2 border-white border-solid"
              src={avatar}
              alt="avatar-chat"
            />
          </div>
          <div className="flex flex-col overflow-hidden justify-center">
            <span className="text-[15px] font-[500]">{name}</span>
            <p className="truncate inline-block">
              {lastedMsg?.senderId === userId ? `You: ${lastedMsg?.text}` : lastedMsg?.text}
            </p>
          </div>
          <div
            className={`ml-auto flex flex-col justify-center items-end`}
          >
            <span className={`${!fromOnline ? 'text-green-500 font-[500]' : ''}`}>
              {getOfflineTime(fromOnline) ?? 'online'}
            </span>
            <span>
              {getOfflineTime(new Date(lastedMsg?.createdAt).getTime())}
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default ConversationItem;
