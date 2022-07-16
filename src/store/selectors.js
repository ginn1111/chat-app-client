// const getAuthenticationState = state => type => state.authentication[type]
export const getStatus = (state) => state.authentication.status;
// export const getStatus = getAuthenticationState(state)('status')
export const getToken = (state) => state.authentication.accessToken;
// export const getToken = getAuthenticationState(state)('s')
export const getUser = (state) => state.authentication.userInformation;
export const hasLogged = (state) => state.authentication.isLogged;

export const getFriendStatus = (state) => state.friend.status;
export const getFriendInformation = (state) => state.friend.friendInformation;

export const getNotifications = (state) => state.notifications.notifications;
export const getStatusNotification = (state) => state.notifications.status;

export const hasLoading = (state) => state.ui.isLoading;

export const getSearchStatus = (state) => state.search.status;
export const getSearchUsers = (state) => state.search.users;
