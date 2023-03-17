import { privateRequest } from '@axios';
import { URL } from '@services/constants';

export const getFriendListOfUser = (userId, config) =>
  privateRequest.get(URL.GET_FRIEND_LIST_OF_USER(userId), config);

export const getUser = (userId, config) =>
  privateRequest.get(URL.GET_USER(userId), config);

export const updateUser = ({ userId, userInfor }, config) =>
  privateRequest.put(
    URL.UPDATE_USER(userId),
    {
      ...userInfor,
    },
    config
  );

export const updateAvatar = (userId, config) =>
  privateRequest.put(URL.UPDATE_AVATER(userId), config);

export const updateCoverPicture = (userId, config) =>
  privateRequest.put(URL.UPDATE_COVER_PICTURE(userId), config);
