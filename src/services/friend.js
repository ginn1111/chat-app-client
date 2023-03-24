import { privateRequest } from '../axios';
import { URL } from '@services/constants';

export const getFriendList = async (userId) =>
  await privateRequest.get(`/users/${userId}/friends`);

export const unfriend = ({ senderId, receiverId }, config) =>
  privateRequest.put(URL.UN_FRIEND(senderId), null, {
    params: { receiverId },
    ...config,
  });

export const getFriend = (friendId, config) =>
  privateRequest.get(URL.GET_FRIEND(friendId), config);

export const responseAddFriend = ({ senderId, receiverId, accepted }, config) =>
  privateRequest.put(URL.RESPONSE_FRIEND(senderId), null, {
    params: {
      receiverId,
      accepted,
    },
    ...config,
  });

export const sendAddFriend = async ({ senderId, receiverId }, config) =>
  await privateRequest.put(URL.ADD_FRIEND(senderId), null, {
    params: {
      receiverId,
    },
    ...config,
  });
