import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getFriendThunk } from '@features/friend/friendSlice';
import {
  friendListSelector,
  loadingStatusGeneratorSelector,
  SliceName,
} from '@app/selectors';
import { LoadingStatus } from '@features/constants';
import { resetAction } from '@features/authentication/userSlice';

const useFriend = (
  { onError = () => {}, onSuccess = () => {} } = {},
  apiOptions = {}
) => {
  const dispatch = useDispatch();
  const friendList = useSelector(friendListSelector);

  const loadingStatus = useSelector(
    loadingStatusGeneratorSelector(SliceName.FRIEND)
  );

  useEffect(() => {
    dispatch(getFriendThunk({ onError, onSuccess, apiOptions }));
  }, []);

  useEffect(() => {
    dispatch(resetAction());
  }, []);

  return {
    responseMessage: loadingStatus.responseMessage,
    isLoading: loadingStatus.status === LoadingStatus.PENDING,
    friendList,
  };
};
export default useFriend;
