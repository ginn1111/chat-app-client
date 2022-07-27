import { createSlice } from '@reduxjs/toolkit';
import * as messageService from '../services/message';

const INIT_STATE = {
  messages: [],
  status: 'idle',
  message: '',
};

const messageSlice = createSlice({
  name: 'message',
  initialState: INIT_STATE,
  reducers: {
    setStatus(state, action) {
      state.status = action.payload;
    },
    resetStatus(state) {
      state.status = 'idle';
    },
    addMessage(state, action) {
      state.messages.push(action.payload);
    },
    setMessages(state, action) {
      state.messages = action.payload;
    },
    setMessage(state, action) {
      state.message = action.payload;
    },
  },
});

export const sendMessage =
  (conversationId, msg) => async (dispatch, getState) => {
    const {
      userInformation: { id: userId },
    } = getState().authentication;
    try {
      dispatch(setStatus('send-message/pending'));
      const { data } = await messageService.sendMessage(
        userId,
        conversationId,
        msg,
      );
      dispatch(addMessage(data));
      dispatch(setStatus('send-message/success'));
    } catch (error) {
      console.dir(error);
      dispatch(setStatus('send-message/failed'));
    }
  };

export const getMessages =
  (conversationId, userId) => async (dispatch, getState) => {
    const { userInformation: userState } = getState().authentication;
    try {
      dispatch(setStatus('get-message/pending'));
      const { data } = await messageService.getMessage(
        conversationId,
        userId ?? userState.id,
      );
      dispatch(setMessages(data));
      dispatch(setStatus('get-message/success'));
    } catch (error) {
      console.dir(error);
      dispatch(setStatus('get-message/failed'));
    }
  };

export const { setStatus, addMessage, setMessage, setMessages, resetStatus } =
  messageSlice.actions;
export default messageSlice.reducer;
