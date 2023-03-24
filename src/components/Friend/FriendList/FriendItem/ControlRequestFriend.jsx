import { Transition } from '@headlessui/react';
import { useDispatch } from 'react-redux';

import useRequestFriend from '../../hooks/useRequestFriend';
import UserStatus from '@constants/userStatus';
import RequestButton from './RequestButton';
import withToast from '@hoc/withToast';
import commonErrorHandler from 'src/axios/errorHandler';
import { ToastType } from '@components/ui/notification/Toast';
import { ErrorCode } from '@constants/error';
import ResponseMessage from '@constants/messages';
import {
  addFriend,
  responseFriend,
  unFriend,
} from '@features/authentication/userSlice';

const ControlRequestFriend = ({ toast, id, userStatus }) => {
  const { request, isLoading } = useRequestFriend({ userStatus, id });
  const dispatch = useDispatch();

  const errorHandler = (errorCode) => {
    const message = commonErrorHandler(errorCode);
    if (message) {
      toast({ message, type: ToastType.ERROR });
      return;
    }
    switch (errorCode) {
      case ErrorCode.UN_AUTHORIZED:
        toast({
          message: ResponseMessage.UN_AUTHORIZED,
          type: ToastType.ERROR,
        });
        break;
      default:
        toast({
          message: ResponseMessage.SOME_THING_WENT_WRONG,
          type: ToastType.ERROR,
        });
        break;
    }
  };

  const requestFriendHandler = {
    [UserStatus.Strange]: {
      onSuccess: (response) => {
        dispatch(addFriend(response.data));
        toast({ message: ResponseMessage.ADD_FRIEND_SUCCESS });
      },
      onError: errorHandler,
    },
    [UserStatus.Unfriend]: {
      onSuccess: (response) => {
        dispatch(unFriend(response.data));
        toast({ message: ResponseMessage.UN_FRIEND_SUCCESS });
      },
      onError: errorHandler,
    },
    [UserStatus.Accept]: {
      onSuccess: (response) => {
        dispatch(
          responseFriend({ isAccept: true, friendId: response.data.receiverId })
        );
        toast({ message: ResponseMessage.ACCEPT_SUCCESS });
      },
      onError: errorHandler,
    },
    [UserStatus.Deny]: {
      onSuccess: (response) => {
        dispatch(responseFriend({ isAccept: false, friendId: response.data }));
        toast({ message: ResponseMessage.DENY_SUCCESS });
      },
      onError: errorHandler,
    },
  };

  let controls = (
    <RequestButton
      type={userStatus}
      onClick={
        userStatus !== UserStatus.Waitting
          ? () =>
              request({ receiverId: id, ...requestFriendHandler[userStatus] })
          : () => {}
      }
    />
  );
  if (userStatus === UserStatus.Response) {
    controls = (
      <>
        <RequestButton
          type={UserStatus.Strange}
          onClick={() =>
            request.accept({
              receiverId: id,
              ...requestFriendHandler[UserStatus.Accept],
            })
          }
        />
        <RequestButton
          className="ml-12"
          type={UserStatus.Unfriend}
          onClick={() =>
            request.deny({
              receiverId: id,
              ...requestFriendHandler[UserStatus.Deny],
            })
          }
        />
      </>
    );
  }

  return (
    <div className="flex items-center overflow-hidden">
      <Transition
        appear
        show={!isLoading}
        enter="transition-all duration-300"
        leave="transition-all duration-300"
        enterFrom="translate-x-100 opacity-0"
        enterTo="translate-x-0 opacity-100"
        leaveTo="translate-x-100 opacity-0"
        leaveFrom="translate-x-0 opacity-100"
      >
        {controls}
      </Transition>
      <Transition
        show={isLoading}
        enter="transition-all duration-300 delay-100"
        leave="transition-all duration-300 delay-100"
        enterFrom="translate-x-100 opacity-0"
        enterTo="translate-x-0 opacity-100"
        leaveTo="translate-x-100 opacity-0"
        leaveFrom="translate-x-0 opacity-100"
      >
        <div className="animate-spin h-20 w-20 border-4 border-t-primary/50 rounded-cir" />
      </Transition>
    </div>
  );
};

export default withToast(ControlRequestFriend);
