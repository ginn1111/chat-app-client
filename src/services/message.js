import { privateRequest } from '../axios';

export const sendMessage = async (userId, conversationId, msg) =>
  await privateRequest.post(`messages/${userId}/create`, {
    conversationId,
    text: msg,
  });

export const getMessage = async (conversationId, userId) =>
  await privateRequest.get(`messages/${userId}/get/${conversationId}`);

export const deleteMessage = async (userId, messageId) =>
  await privateRequest.delete(`messages/${userId}/delete/${messageId}`);
