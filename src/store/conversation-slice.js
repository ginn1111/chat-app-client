import { createSlice } from '@reduxjs/toolkit';
import * as conversationService from '../services/conversation';
import { showLoading, hideLoading } from './ui-slice';

const INIT_STATE = {
  conversations: [
    // {
    //   _id: '',
    //   theme: '',
    //   members: [{ memberId: '', avatar: '', nickName: '' }],
    // },
  ],
  status: 'idle',
  message: null,
  isGroup: false,
};

const conversationSlice = createSlice({
  name: 'conversation',
  initialState: INIT_STATE,
  reducers: {
    resetStatus(state) {
      state.status = 'idle';
    },
    setError(state, action) {
      state.message = action.payload;
    },
    addConversation(state, action) {
      state.conversations.push(action.payload);
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setConversation(state, action) {
      state.conversations = action.payload;
    },
    setAddMember(state, action) {
      const oldConversation = state.conversations.find(
        (conversation) => conversation._id === action.payload._id,
      );
      oldConversation.members = action.payload.members;
    },
    setDeleteConversation(state, action) {
      state.conversations = state.conversations.filter(
        (con) => action.payload._id !== con._id,
      );
    },
    setLastMsg(state, action) {
      state.conversations.find(
        (con) => con._id === action.payload.conversationId,
      ).lastMsg = action.payload.lastMsg;
    },
    updateStateConversation(state, action) {
      const updatedConversation = state.conversations.find(
        (con) => con._id === action.payload.conversationId,
      );
      updatedConversation && (updatedConversation.isUnSeen = action.payload.isUnSeen);
    },
    setStateConversations(state, action) {
      const stateConversations = action.payload;
      const stateConversationsId = Object.keys(stateConversations);
      let conversationList = state.conversations;
      conversationList = conversationList.map((con) => ({
        ...con,
        isUnSeen: stateConversationsId.includes(con._id)
          ? !stateConversations[con._id]
          : false,
      }));
    },
    setIsGroup(state, action) {
      state.isGroup = action.payload;
    },
  },
});

export const createConversation =
  ({ members, isGroup, title }) =>
    async (dispatch, getState) => {
      dispatch(showLoading());
      const {
        userInformation: { id: userId },
      } = getState().authentication;
      try {
        const { data } = await conversationService.createConversation(
          userId,
          members,
          isGroup,
          title,
        );
        getState().conversation.isGroup === isGroup &&
          dispatch(addConversation(data));
        dispatch(setStatus('create-conversation/success'));
      } catch (error) {
        console.dir('createConversation error', error);
        dispatch(setStatus('create-conversation/failed'));
      } finally {
        dispatch(hideLoading());
      }
    };

export const getConversation =
  ({ userId, isGroup = false }) =>
    async (dispatch, getState) => {
      const { userInformation: userState } = getState().authentication;
      dispatch(showLoading());
      dispatch(setStatus('conversation-get/pending'));
      try {
        const { data } = await conversationService.getConversation(
          userState.id ?? userId,
          isGroup,
        );
        dispatch(setConversation(data));
        dispatch(setStatus('conversation-get/success'));
      } catch (error) {
        dispatch(setStatus('conversation-get/failed'));
        console.log('getConversation error', error);
      } finally {
        dispatch(hideLoading());
      }
    };

export const addMember =
  ({ member, conversationId }) =>
    async (dispatch) => {
      dispatch(showLoading());
      try {
        const { data } = conversationService.addNewMember(conversationId, member);
        console.log(data);
        dispatch(setStatus('add-member/success'));
      } catch (error) {
        console.log('addMember error', error);
        dispatch(setStatus('add-member/failed'));
      } finally {
        dispatch(hideLoading());
      }
    };

export const deleteConversation = (conversationId) => async (dispatch) => {
  dispatch(showLoading());
  try {
    const { data } = await conversationService.deleteConversation(
      conversationId,
    );
    console.log(data);
    dispatch(setStatus('delete-conversation/success'));
  } catch (error) {
    console.log('deleteConversation error', error);
    dispatch(setStatus('delete-conversation/failed'));
  } finally {
    dispatch(hideLoading());
  }
};

export const {
  setAddMember,
  setDeleteConversation,
  addConversation,
  setStatus,
  setConversation,
  setLastMsg,
  updateStateConversation,
  setStateConversations,
  setIsGroup,
} = conversationSlice.actions;
export default conversationSlice.reducer;
