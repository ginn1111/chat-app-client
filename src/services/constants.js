export const URL = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  REFRESH_TOKEN: '/auth/refresh-token',
  LOGOUT: (userId) => `/auth/${encodeURIComponent(userId)}/logout`,
  SEARCH_FRIEND: `/users/search`,
  GET_USER: (userId) => `/users/find/${encodeURIComponent(userId)}`,
  GET_FRIEND_LIST_OF_USER: (userId) =>
    `users/${encodeURIComponent(userId)}/friends`,
  UPDATE_USER: (userId) => `/users/${encodeURIComponent(userId)}/edit`,
  UPDATE_AVATER: (userId) => `/users/${encodeURIComponent(userId)}/avatar`,
  UPDATE_COVER_PICTURE: (userId) =>
    `/users/${encodeURIComponent(userId)}/cover-picture`,
  GET_ALL_USER: `/users/`,
  // FRIEND API
  ADD_FRIEND: (userId) => `/users/${userId}/friends/add`,
  UN_FRIEND: (userId) => `/users/${userId}/friends/unfriend`,
  RESPONSE_FRIEND: (userId) => `/users/${userId}/friends/response`,
  GET_FRIEND: (friendId) => `/users/find/${friendId}`,
  // CONVERSATION API
  CREATE_CONVERSATION: (userId) => `conversations/${userId}/create`,
};

export const KEY = {
  JWT: 'jwt',
};
