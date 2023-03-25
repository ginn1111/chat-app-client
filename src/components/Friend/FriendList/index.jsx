import { Transition } from '@headlessui/react';

import Header from './Header';
import FriendItem from './FriendItem';
import useFriend from '../hooks/useFriend';
import FriendSkeleton from '@components/common/Skeleton/FriendSkeleton';
import Fade from '@components/common/Effect/Fade';
import withToast from '@hoc/withToast';
import commonErrorHandler from 'src/axios/errorHandler';
import { ToastType } from '@components/ui/notification/Toast';
import useSearchUser from '../hooks/useSearchUser';
import ErrorMessage from '@components/common/ErrorMessage';

const FriendList = ({ toast }) => {
  const { isLoading: isFetching, responseMessage } = useFriend();
  const {
    isLoading: isSearchLoading,
    searchUserHandler,
    combineUserList: userList,
  } = useSearchUser({
    onError(errorCode) {
      const message = commonErrorHandler(errorCode);
      toast({ message, type: ToastType.ERROR });
    },
  });

  const isLoading = isSearchLoading || isFetching;

  const friendListSkelton = (
    <Transition
      as="ul"
      className="space-y-20 mt-20 bt-black"
      show={isLoading && !responseMessage}
      enter="transition-opacity duration-300"
      leave="transition-all duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-1"
      leaveTo="h-0 p-0 m-0 overflow-hidden opacity-0"
      leaveFrom="opacity-1 h-full"
    >
      {Array.from({ length: 3 }, (_, i) => i).map((_, idx) => (
        <FriendSkeleton as="li" key={idx} />
      ))}
    </Transition>
  );

  const userListRender = (
    <ul className="flex-1 overflow-auto space-y-20 mt-20">
      {userList.map((user) => (
        <FriendItem {...user} key={user.id} />
      ))}
    </ul>
  );

  return (
    <>
      <Header onSearch={searchUserHandler} isLoading={isSearchLoading} />
      {friendListSkelton}
      <Transition
        appear
        show={!isLoading && !responseMessage}
        enter="transition-all duration-300"
        leave="transition-all duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-1"
        leaveTo="opacity-0"
        leaveFrom="opacity-1"
      >
        {userListRender}
      </Transition>
      <Fade show={!isLoading && !!responseMessage}>
        <ErrorMessage
          errorMsg={responseMessage}
          className="p-x-16 mt-20 text-[16px]"
        />
      </Fade>
    </>
  );
};

export default withToast(FriendList);
