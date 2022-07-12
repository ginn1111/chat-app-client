export const getStatus = (state) => state.authentication.status;
export const getToken = (state) => state.authentication.accessToken;
export const getUser = (state) => state.authentication.userInformation;
export const hasLogged = (state) => state.authentication.isLogged;
