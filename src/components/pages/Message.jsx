import { useEffect, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Outlet, useParams } from 'react-router-dom';
import ConversationList from '../message/friends/ConversationList';
import PseudoChat from '../message/chat/PseudoChat';
import { resetStatus } from '../../store/conversation-slice';
import { getConversationsStatus } from '../../store/selectors';
import withToast from '../../hoc/withToast';
import { useDispatch, useSelector } from 'react-redux';

export const commonStyle = 'rounded-xl px-2 py-1 h-full relative';

const Message = ({ toast }) => {
  const { id: conversationId } = useParams();

  const status = useSelector(getConversationsStatus);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'create-conversation/success') {
      toast.addToast({ message: 'Add new group successfully!' });
    } else if (status === 'create-conversation/failed') {
      toast.addToast({ type: 'error', message: 'Add new group failed!' });
    } else if (status === 'delete-conversation/success') {
      toast.addToast({ message: 'Delete convesation successfully!' });
      navigate('/message', { replace: true });
    } else if (status === 'delete-conversation/failed') {
      toast.addToast({
        type: 'error',
        message: 'Delete convesation failed, something went wrong!',
      });
    } else if (status === 'add-member/success') {
      toast.addToast({ message: 'Add new members successfully!' });
    } else if (status === 'add-member/failed') {
      toast.addToast({
        type: 'error',
        message: 'Add new members failed, something went wrong!',
      });
    }
    if (status.split('/')[1] !== 'pending') {
      dispatch(resetStatus());
    }
  }, [status]);
  return (
    <>
      <div className="format-page-size flex h-[calc(100vh_-_90px)] relative rounded-md">
        <div
          className={`w-[350px] flex-none ${commonStyle} flex flex-col items-center gap-y-2 text-[14px] bg-transparent pr-2 `}
        >
          <ConversationList />
        </div>
        {conversationId ? <Outlet /> : <PseudoChat />}
      </div>
    </>
  );
};

export default withToast(memo(Message));
