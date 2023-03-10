import withModal from '../../../hoc/withModal';
import Search from '../../ui/search/Search';
import NewConversation from './NewConversation';
import { AddIcon, ChevronDownIcon } from '@/components/common/icons';

const Header = ({ onSearch }) => {
  return (
    <>
      <header className="flex justify-between items-center w-full py-1 text-slate-600">
        <div>
          <span className="font-medium mb-16">Chats</span>
          <div className="text-gray-500 flex text-[18px] items-center gap-8">
            <p>Recent chat</p>
            <ChevronDownIcon size={20} />
          </div>
        </div>
        <button className="create-new-chat-btn">
          <AddIcon size={24} />
          <p className="text-20 capitalize">Create new chat</p>
        </button>
      </header>
      <div className="text-[14px] mt-28 rounded-[6px]">
        <Search
          onSearch={onSearch}
          placeholder="Search"
        />
      </div>
    </>
  );
};

export default withModal(Header, NewConversation);
