import { useState, Fragment } from 'react';
import { Dialog, Combobox, Transition } from '@headlessui/react';
import { TickIcon, ChevronDownIcon } from '@components/common/icons';
import Button from '@components/common/Button';
import { useSelector } from 'react-redux';
import {
  userInformationSelector,
  friendListFollowFriendListId,
} from '@app/selectors';
import useAPI from '@hooks/useAPI';
import { createConversation } from '@services/conversation';
import commonErrorHandler from 'src/axios/errorHandler';
import { ToastType } from '@components/ui/notification/Toast';
import ResponseMessage from '@constants/messages';
import withToast from '@hoc/withToast';

const NewConversationModal = ({ onClose, toast }) => {
  const user = useSelector(userInformationSelector);
  const friendList = useSelector(friendListFollowFriendListId);

  const [selectedFriendList, setSelectedFriendList] = useState([]);
  const [query, setQuery] = useState('');

  const { requestFn, isLoading } = useAPI({
    requestFn: () =>
      createConversation({
        userId: user.id,
        members: [
          ...selectedFriendList.map(({ id: memberId, nickname }) => ({
            memberId,
            nickname,
          })),
          { memberId: user.id, nickname: user.nickname },
        ],
      }),
    onError: (errorCode) => {
      const message = commonErrorHandler(errorCode);
      if (message) {
        toast({ message, type: ToastType.ERROR });
      }
    },
    onSuccess: () => {
      toast({ message: ResponseMessage.CREATE_CONVERSATION_SUCCESSFULL });
    },
  });

  const selectedFriendListId = selectedFriendList.map(({ id }) => id);
  const isDisabled = selectedFriendListId.length === 0;

  const filteredFriend = friendList.filter(({ id }) => {
    return !selectedFriendListId.includes(id);
  });

  const filterQuery =
    query === ''
      ? filteredFriend
      : filteredFriend.filter(({ nickname }) =>
          nickname.toLowerCase().includes(query.toLowerCase())
        );

  const chooseFriendHandler = (friend) => {
    setSelectedFriendList((friends) => [...friends, { ...friend }]);
  };

  const removeHandler = (friend) => {
    setSelectedFriendList((friends) =>
      friends.filter(({ id }) => id !== friend.id)
    );
  };

  return (
    <div className="min-h-[300px] flex flex-col">
      <Dialog.Title
        as="h3"
        className="text-primary text-24 text-center font-medium"
      >
        Create new Conversation
      </Dialog.Title>
      <Dialog.Description as="div" className="flex-1 flex flex-col mt-28">
        <p className="mb-12 text-16">Choose friends</p>
        <Combobox
          mutiple="true"
          value={selectedFriendList}
          onChange={chooseFriendHandler}
          as="div"
          className="relative flex items-center text-[18px] ring-4 ring-primary/50 px-16 py-8 rounded-[6px] transition"
        >
          <div className="flex items-center gap-8 mr-8 flex-wrap flex-1">
            {selectedFriendList.map((friend) => (
              <button
                key={friend.id}
                onClick={removeHandler.bind(null, friend)}
                className="p-8 bg-primary/70 rounded-sm text-white"
              >
                {friend.nickname}
              </button>
            ))}
            <Combobox.Input
              placeholder={selectedFriendList.length > 0 ? '' : 'friend...'}
              onChange={(event) => setQuery(event.target.value)}
              className="block flex-1 basis-40 w-40"
            />
          </div>
          <Combobox.Button>
            <ChevronDownIcon />
          </Combobox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute left-0 top-full mt-4 max-h-[140px] w-full overflow-auto rounded-sm bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-[1001]">
              {filterQuery.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none px-16 py-8">
                  Nothing found.
                </div>
              ) : (
                filterQuery.map((friend) => (
                  <Combobox.Option
                    as="div"
                    key={friend.id}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-8 pl-20 pr-4 flex items-center gap-20 ${
                        active ? 'bg-primary/70 text-white' : ''
                      }`
                    }
                    value={friend}
                  >
                    <div className="w-40 h-40 rounded-cir overflow-hidden">
                      <img
                        src={friend.avatar}
                        alt="friendAvatar"
                        className="block w-full h-full object-fit object-cover"
                      />
                    </div>
                    <p>{friend.nickname}</p>
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </Combobox>
        <div className="mt-auto flex px-20 gap-40">
          <Button
            className="flex-1 px-20 py-16"
            disabled={isDisabled}
            isLoading={isLoading}
            onClick={requestFn}
          >
            Create
          </Button>
          <Button
            className="flex-1 px-20 py-16"
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </Dialog.Description>
    </div>
  );
};

export default withToast(NewConversationModal);
