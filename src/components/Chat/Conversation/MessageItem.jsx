import { forwardRef, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getConversationList } from '../../../store/selectors';

const MessageItem = ({ isOwn, senderId, message, timeAt }, ref) => {
  const { id: conversationId } = useParams();
  const conversationList = useSelector(getConversationList);

  const avatar = useMemo(() => {
    return conversationList
      .find((con) => con._id === conversationId)
      ?.members?.find((m) => m.memberId === senderId)?.avatar;
  }, [conversationList, senderId, conversationId]);

  return (
    <li
      ref={ref}
      data-scroll
      className={`chat-item ${isOwn ? 'own' : 'not-own'}`}
    >
      <div className="w-36 h-36">
        <img
          className="w-full h-full rounded-cir object-center object-cover"
          src="https://www.figma.com/file/cXZUlJRHi5JhnrgLdZZfvK/image/25daf6b6c9cfce0b73cb0788f056ca80336c3df5?fuid=1056603901594338444"
          alt="Own user avatar"
        />
      </div>
      <p className="break-all py-8 px-8">{message}</p>
    </li>
  );
};

export default forwardRef(MessageItem);
