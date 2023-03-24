import withModal from '@hoc/withModal';
import Search from '@components/ui/search/Search';
import { AddIcon, ChevronDownIcon } from '@components/common/icons';
import NewConversationModal from './NewConversationModal';

const Header = ({ onSearch, modal }) => {
  return (
    <>
      <header className="flex justify-between items-start">
        <div>
          <h1 className="font-medium text-24 text-black mb-4 mt-0">Chats</h1>
          <div className="flex text-16 items-center gap-8">
            <p>Recent chat</p>
            <ChevronDownIcon size={20} />
          </div>
        </div>
        <button className="create-new-chat-btn" onClick={modal.open}>
          <AddIcon size={24} />
          <p className="capitalize">Create new chat</p>
        </button>
      </header>
      <div className="text-[14px] mt-28 rounded-[6px]">
        <Search onSearch={onSearch} placeholder="Search" />
      </div>
    </>
  );
};

export default withModal(Header, NewConversationModal);
