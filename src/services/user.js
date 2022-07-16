import { privateRequest } from '../axios';

export const getFriendListOfUser = async (userId) =>
  await privateRequest.get(`users/${userId}/friends`);

export const getUser = async (userId) =>
  await privateRequest.get(`/users/find/${userId}`);

export const updateUser = async (userId, userInfor) =>
  await privateRequest.put(`/users/${userId}/edit`, {
    ...userInfor,
  });
