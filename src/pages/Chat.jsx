import withToast from '../hoc/withToast';
import Conversation from '@components/Chat/Conversation';
import ConversationList from '@components/Chat/ConversationList';

export const commonStyle =
  'rounded-md rounded-tl-none rounded-bl-none px-2 py-1 h-full';

const Chat = ({ toast }) => {
  // const { id: conversationId } = useParams();

  // const status = useSelector(getConversationsStatus);
  // const navigate = useNavigate();
  // const dispatch = useDispatch();

  // const { showConversationList, sizeWindow, onToggleConversationList } =
  //   useUI();

  // useEffect(() => {
  //   if (status === 'create-conversation/success') {
  //     toast.addToast({ message: 'Add new group successfully!' });
  //   } else if (status === 'create-conversation/failed') {
  //     toast.addToast({ type: 'error', message: 'Add new group failed!' });
  //   } else if (status === 'delete-conversation/success') {
  //     toast.addToast({ message: 'Delete convesation successfully!' });
  //     navigate('/message', { replace: true });
  //   } else if (status === 'delete-conversation/failed') {
  //     toast.addToast({
  //       type: 'error',
  //       message: 'Delete convesation failed, something went wrong!',
  //     });
  //   } else if (status === 'add-member/success') {
  //     toast.addToast({ message: 'Add new members successfully!' });
  //   } else if (status === 'add-member/failed') {
  //     toast.addToast({
  //       type: 'error',
  //       message: 'Add new members failed, something went wrong!',
  //     });
  //   }
  //   if (status.split('/')[1] !== 'pending') {
  //     dispatch(resetStatus());
  //   }
  // }, [status]);

  return (
    <section className="grid grid-cols-12 py-20 h-screen px-56 bg-gradient-to-r from-[#F3F3FB] to-[#FDFBFD] gap-20">
      <div className="col-span-4 h-full flex flex-col overflow-hidden">
        <ConversationList />
      </div>
      <div className="col-span-8 h-full flex flex-col overflow-hidden">
        <Conversation />
      </div>
    </section>
  );
};

export default withToast(Chat);
