import { useSelector } from 'react-redux';
import { useState, useMemo } from 'react';
import axios from 'axios';

import { ErrorCode } from '@constants/error';
import { useAbort, useToggle } from '@hooks/';
import { searchUser } from '@services/user';
import {
  userIdSelector,
  friendRequestSelector,
  friendResponseSelector,
  friendListSelector,
  friendListIdSelector,
} from '@app/selectors';
import UserStatus from '@constants/userStatus';

// HELPER
const checkUserIsExistInList = (userId) => (list) =>
  list.indexOf(userId) !== -1;

const useSearchUser = (
  { onSuccess = () => {}, onError = () => {} },
  apiOptions = {}
) => {
  const [userList, setUserList] = useState();
  const [errorCode, setErrorCode] = useState(ErrorCode.SOME_THING_WENT_WRONG);

  const userId = useSelector(userIdSelector);
  const friendList = useSelector(friendListSelector);
  const friendListId = useSelector(friendListIdSelector);
  const friendRequest = useSelector(friendRequestSelector);
  const friendResponse = useSelector(friendResponseSelector);

  const abortSignal = useAbort();

  const {
    isOpen: isLoading,
    close: closeLoading,
    open: startLoading,
  } = useToggle();

  const combineUserList = useMemo(
    () =>
      // when the component mount friendList will be render
      (userList ?? friendList)
        .filter((user) => user.id !== userId)
        .map((user) => {
          const checkUserIsExist = checkUserIsExistInList(user.id);
          const userStatus = checkUserIsExist(friendListId)
            ? UserStatus.Unfriend
            : checkUserIsExist(friendResponse)
            ? UserStatus.Response
            : checkUserIsExist(friendRequest)
            ? UserStatus.Waitting
            : UserStatus.Strange;
          return {
            ...user,
            userStatus,
          };
        }),
    [friendRequest, friendResponse, userList, friendList, friendListId]
  );

  // name consist of nickname, firstname, lastname
  const searchUserHandler = async (name, config = apiOptions) => {
    startLoading();
    try {
      const { data } = await searchUser(name, {
        signal: abortSignal,
        ...config,
      });
      setUserList(data);
      onSuccess(data);
    } catch (error) {
      if (!axios.isCancel(error)) {
        const errorCode =
          error?.response?.status ?? ErrorCode.SOME_THING_WENT_WRONG;
        setErrorCode(errorCode);
        onError(errorCode);
      }
    } finally {
      closeLoading();
    }
  };

  return {
    isLoading,
    combineUserList,
    searchUserHandler,
    errorCode,
  };
};

export default useSearchUser;
