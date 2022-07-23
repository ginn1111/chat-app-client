import io from 'socket.io-client';

const socket = io('http://localhost:8900');

const GET_MESSAGE = 'GET_MESSAGE';
const SEND_MESSAGE = 'SEND_MESSAGE';
const ADD_USER = 'ADD_USER';
const GET_USER_ONLINE = 'GET_USER_ONLINE';
const UPDATE_CONVERSATION = 'UPDATE_CONVERSATION';

export const getMessage = callback => socket.on(GET_MESSAGE, callback);
export const getUserOnline = callback => socket.on(GET_USER_ONLINE, callback);

export const addUser = userId => socket.emit(ADD_USER, userId);
export const sendMessage = payload => socket.emit(SEND_MESSAGE, payload);

export const removeGetMessage = () => socket.removeListener(GET_MESSAGE);
export const removeGetUserOnline = () => socket.removeListener(GET_USER_ONLINE);

export const socketDisconnect = (conversationIdList) => {
  socket.emit(UPDATE_CONVERSATION, conversationIdList);
  socket.disconnect()
};
