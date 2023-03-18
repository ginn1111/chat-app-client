import { Transition } from '@headlessui/react';

import Header from './Header';
import FriendItem from './FriendItem';
import useFriend from '../hooks/useFriend';
import FriendSkeleton from '@components/common/Skeleton/FriendSkeleton';
import Fade from '@components/common/Effect/Fade';

const FriendList = () => {
  // Get friendList, friendResponse, friendRequest of the user and combine with userList to produce the status of the userList (unfriend, addfriend, waiting)

  const { isLoading, searchUserHandler, userList } = useFriend();

  const friendListSkelton = (
    <ul className="mt-20 space-y-20">
      {Array.from({ length: 3 }, (_, i) => i).map((_, idx) => (
        <FriendSkeleton as="li" key={idx} />
      ))}
    </ul>
  );

  const userListRender = (
    <ul className="flex-1 overflow-auto space-y-20 mt-20">
      {userList.map((user) => {
        return <FriendItem {...user} key={user.id} />;
      })}
    </ul>
  );

  return (
    <>
      <Header onSearch={searchUserHandler} isLoading={isLoading} />
      <Fade show={isLoading}>{friendListSkelton}</Fade>
      <Transition
        appear
        show={!isLoading}
        enter="transition-opacity duration-300 delay-300"
        leave="transition-opacity duration-300 delay-300"
        enterFrom="translate-x-[100%] opacity-0"
        enterTo="translate-x-0 opacity-1"
        leaveTo="translate-x-[100%] opacity-0"
        leaveFrom="translate-x-0 opacity-1"
      >
        {userListRender}
      </Transition>
    </>
  );
};

export default FriendList;
