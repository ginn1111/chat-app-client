export const URL = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  REFRESH_TOKEN: '/auth/refresh-token',
  LOGOUT: (userId) => `/auth/${encodeURIComponent(userId)}/logout`,
  GET_USER: (userId) => `/users/find/${encodeURIComponent(userId)}`,
  GET_FRIEND_LIST_OF_USER: (userId) =>
    `users/${encodeURIComponent(userId)}/friends`,
  UPDATE_USER: (userId) => `/users/${encodeURIComponent(userId)}/edit`,
  UPDATE_AVATER: (userId) => `/users/${encodeURIComponent(userId)}/avatar`,
  UPDATE_COVER_PICTURE: (userId) =>
    `/users/${encodeURIComponent(userId)}/cover-picture`,
};

export const KEY = {
  JWT: 'jwt'
}
