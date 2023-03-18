import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useAbort, useToggle } from '@hooks';
import { searchUser } from '@services/user';
import { userIdSelector } from '@app/selectors';

import {
  friendResponseSelector,
  friendListSelector,
  friendRequestSelector,
} from '@app/selectors';
import axios from 'axios';

// CONSTANT
export const UserStatus = {
  Strange: 'strange', // -> default case
  Waitting: 'waitting', // -> the user send request but not response anymore
  Response: 'response', // -> response to the request add friend from other user (accept or deny)
  Unfriend: 'unfriend', // -> when the both is friend
};

// HELPER
const getUserIdList = (userList) => userList?.map((user) => user.id) ?? [];
const checkUserIsExistInList = (userId) => (list) =>
  list.findIndex((user) => userId === user.id) !== -1;

const useFriend = () => {
  const userId = useSelector(userIdSelector);
  const friendList = getUserIdList(useSelector(friendListSelector));
  const friendRequest = getUserIdList(useSelector(friendRequestSelector));
  const friendResponse = getUserIdList(useSelector(friendResponseSelector));
  const checkUserIsExist = checkUserIsExistInList(userId);

  const {
    isOpen: isLoading,
    close: closeLoading,
    open: startLoading,
  } = useToggle();
  const abortSignal = useAbort();

  const [response, setResponse] = useState(friendList);
  const [errorCode, setErrorCode] = useState(0);

  const userList = useMemo(
    () =>
      !Array.isArray(response)
        ? []
        : response
            .filter((user) => user.id !== userId)
            .map((user) => {
              const userStatus = checkUserIsExist(friendList)
                ? UserStatus.Unfriend
                : checkUserIsExist(friendRequest)
                ? UserStatus.Waitting
                : checkUserIsExist(friendResponse)
                ? UserStatus.Response
                : UserStatus.Strange;
              return {
                ...user,
                userStatus,
              };
            }),
    [friendList, friendRequest, friendResponse, response]
  );

  // name consist of nickname, firstname, lastname
  const searchUserHandler = async (name) => {
    startLoading();
    try {
      const { data } = await searchUser(name, { signal: abortSignal });
      setResponse(data);
    } catch (error) {
      if (!axios.isCancel(error)) {
        setErrorCode(error.response.status);
      }
    } finally {
      closeLoading();
    }
  };

  return {
    errorCode,
    isLoading,
    userList,
    searchUserHandler,
  };
};
export default useFriend;
