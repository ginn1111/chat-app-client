import io from 'socket.io-client';

const GET_MESSAGE = 'GET_MESSAGE';
const SEND_MESSAGE = 'SEND_MESSAGE';
const ADD_USER = 'ADD_USER';
const GET_USER_ONLINE = 'GET_USER_ONLINE';
const CALL_USER_ONLINE = 'CALL_USER_ONLINE';
const UPDATE_CONVERSATION = 'UPDATE_CONVERSATION';

const getSocketIO = (() => {
  let socket = null;
  return (token) => {
    if (!socket?.connected && token) {
      socket = io(process.env.REACT_APP_SOCKET_URL, {
        query: { token },
      });
    }
    socket?.on('connect', () => {
      console.log('connect successfully');
    });

    socket?.on('connect_error', (error) => {
      console.log(`connect error: ${error}`);
    });

    return socket;
  };
})();

export const connectHandler = (callback, socket) =>
  socket?.on('connect', callback);
export const connectErrorHandler = (callback, socket) =>
  socket?.on('connect_error', callback);
export const getMessage = (callback, socket) => {
  socket?.once(GET_MESSAGE, callback);
};
export const getUserOnline = (callback, socket) =>
  socket?.on(GET_USER_ONLINE, callback);
export const callUserOnline = (socket) => socket?.emit(CALL_USER_ONLINE);

export const addUser = (userId, socket) => socket?.emit(ADD_USER, userId);
export const sendMessage = (payload, socket) => {
  console.log('send message');
  socket?.emit(SEND_MESSAGE, payload);
};

export const removeGetMessage = (socket, callback) => {
  console.log('remove get message', socket);
  socket?.off(GET_MESSAGE, callback);
};
export const removeGetUserOnline = (socket) => socket?.off(GET_USER_ONLINE);
export const removeCallUserOnline = (socket) => socket?.off(CALL_USER_ONLINE);

export const socketDisconnect = (payload, socket) => {
  console.log('disconnect handler', payload);
  socket?.emit(UPDATE_CONVERSATION, payload);
  socket?.disconnect();
};

export default getSocketIO;
