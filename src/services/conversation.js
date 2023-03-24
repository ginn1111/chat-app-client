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

export const getConversation = ({ userId, isGroup }, config) =>
  privateRequest.get(`conversations/${userId}/get`, {
    params: {
      isGroup,
    },
    ...config,
  });

export const addNewMember = (conversationId, newMembers) =>
  privateRequest.put(`conversations/${conversationId}/add-member`, {
    newMembers,
  });

export const deleteConversation = (conversationId) =>
  privateRequest.delete(`conversations/${conversationId}/delete`);
