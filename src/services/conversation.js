import { privateRequest } from '../axios';
import { URL } from '@services/constants';

export const createConversation = (
  { userId, members, isGroup, title },
  config
) =>
  privateRequest.post(
    URL.CREATE_CONVERSATION(userId),
    { theme: 'default', members, title },
    { params: { group: isGroup }, ...config }
  );

// TODO: prevent error for old code
export const getConversation = ({ userId, isGroup }, config) => {};

export const getConversationList = ({ userId }, config) =>
  privateRequest.get(URL.GET_CONVERSATION_LIST(userId), config);

export const addNewMember = (conversationId, newMembers) =>
  privateRequest.put(`conversations/${conversationId}/add-member`, {
    newMembers,
  });

export const deleteConversation = (conversationId) =>
  privateRequest.delete(`conversations/${conversationId}/delete`);
