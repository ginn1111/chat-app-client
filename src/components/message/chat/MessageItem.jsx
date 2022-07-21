import React, { forwardRef, useRef, useEffect } from 'react';

const MessageItem = forwardRef(({ isOwn, avatar, message, timeAt }, ref) => {
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [])

  return (
    <li className={`chat-item ${isOwn ? 'own' : 'not-own'}`} ref={ref}>
      <img
        className="w-6 h-6 rounded-full object-center object-cover"
        src={avatar}
        alt="own-avatar"
      />
      <div className="w-full" >
        <span className="inline-block mb-1 h-max break-all px-2 py-1 ">
          {message}
        </span>
        <p className="text-[14px] text-slate-600">{timeAt}</p>
      </div>
    </li>
  );
});

export default MessageItem;
