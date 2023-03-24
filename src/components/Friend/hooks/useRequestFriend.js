import axios from 'axios';
import { useSelector } from 'react-redux';

import { userIdSelector } from '@app/selectors';
import { sendAddFriend, responseAddFriend, unfriend } from '@services/friend';
import { useToggle, useAbort } from '@hooks';
import UserStatus from '@constants/userStatus';

const RequestFriend = {
  [UserStatus.Strange]: sendAddFriend,
  [UserStatus.Unfriend]: unfriend,
};

const useRequestFriend = ({ userStatus }) => {
  const userId = useSelector(userIdSelector);
  const {
    isOpen: isLoading,
    open: openLoading,
    close: closeLoading,
  } = useToggle();
  const abortSignal = useAbort();

  const requestDecorator = (fn) => {
    return async ({ onError, onSuccess, ...arg }, config) => {
      openLoading();
      try {
        const data = await fn(
          { senderId: userId, ...arg },
          { signal: abortSignal, ...config }
        );
        onSuccess(data);
      } catch (error) {
        if (!axios.isCancel(error)) {
          onError(error?.response?.status);
        }
      } finally {
        closeLoading();
      }
    };
  };

  let request;

  if (userStatus === UserStatus.Response) {
    request = {
      accept: (data, config) =>
        responseAddFriend({ ...data, accepted: true }, config),
      deny: (data, config) =>
        responseAddFriend({ ...data, accepted: false }, config),
    };

    request.accept = requestDecorator(request.accept);
    request.deny = requestDecorator(request.deny);
  } else if (userStatus !== UserStatus.Waitting) {
    request = requestDecorator(RequestFriend[userStatus]);
  }

  return {
    isLoading,
    request,
  };
};
export default useRequestFriend;
