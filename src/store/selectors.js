export const getStatus = (state) => state.authentication.status;
export const getToken = (state) => state.authentication.accessToken;
export const getUser = (state) => state.authentication.userInformation;
export const hasLogged = (state) => state.authentication.isLogged;
export const getFriendStatus = (state) => state.friend.status;
export const getFriendInformation = (state) => state.friend.friendInformation;
