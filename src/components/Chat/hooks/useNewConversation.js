import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  userInformationSelector,
  friendListFollowFriendListId,
} from '@app/selectors';
import useAPI from '@hooks/useAPI';
import { createConversation } from '@services/conversation';

const useNewConversation = ({ onError, onSuccess }) => {
  const user = useSelector(userInformationSelector);
  const friendList = useSelector(friendListFollowFriendListId);

  const [selectedFriendList, setSelectedFriendList] = useState([]);
  const [query, setQuery] = useState('');

  const { requestFn, isLoading } = useAPI({
    requestFn: () => {
      const members = [
        ...selectedFriendList.map(({ id: memberId, nickname }) => ({
          memberId,
          nickname,
        })),
        { memberId: user.id, nickname: user.nickname },
      ];

      return createConversation({
        userId: user.id,
        members,
        isGroup: true,
      });
    },
    onError,
    onSuccess,
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

  const removeFriendHandler = (friend) => {
    setSelectedFriendList((friends) =>
      friends.filter(({ id }) => id !== friend.id)
    );
  };

  return {
    remainingFriendList: filterQuery,
    isDisabled,
    isLoading,
    setQuery,
    selectedFriendList,
    newConversationHandler: requestFn,
    chooseFriendHandler,
    removeFriendHandler,
  };
};

export default useNewConversation;
