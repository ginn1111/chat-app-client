import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as conversationService from '../services/conversation';
import { showLoading, hideLoading } from './ui-slice';

const INIT_STATE = {
  conversations: [
    {
      _id: '',
      theme: '',
      members: [{ memberId: '', avatar: '', nickName: '' }],
    },
  ],
  status: 'idle',
  message: null,
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
      state.conversations.push(action.payload)
    }
  },
  extraReducers: (builder) =>
    builder
      .addCase(createConversation.fulfilled, (state, action) => {
        state.conversations.push(action.payload);
        state.status = 'create-conversation/success';
      })
      .addCase(createConversation.rejected, (state, action) => {
        state.status = 'create-conversation/failed';
        state.message = action.payload;
      })
      .addCase(getConversation.fulfilled, (state, action) => {
        state.conversations = action.payload;
      })
      .addCase(getConversation.rejected, (state, action) => {
        state.status = 'get-conversation/failed';
        state.message = action.payload;
      })
      .addCase(addMember.fulfilled, (state, action) => {
        const oldConversation = state.conversations.find(
          (conversation) => conversation._id === action.payload._id,
        );
        oldConversation.members = action.payload.members;
        state.status = 'add-member/success';
      })
      .addCase(addMember.rejected, (state, action) => {
        state.status = 'add-member/failed';
        state.message = action.payload;
      })
      .addCase(deleteConversation.fulfilled, (state, action) => {
        state.status = 'delete-conversation/success';
        state.conversations = state.conversations.filter(con => action.payload._id !== con._id)
      })
      .addCase(deleteConversation.rejected, (state, action) => {
        state.status = 'delete-conversation/failed';
        state.message = action.payload;
      }),
});

export const createConversation = createAsyncThunk(
  'conversation/create',
  async ({ members, isGroup }, { dispatch, getState }) => {
    dispatch(showLoading());
    const {
      userInformation: { id: userId },
    } = getState().authentication;
    try {
      const { data } = await conversationService.createConversation(
        userId,
        members,
        isGroup,
      );
      console.log(data);
    } catch (error) {
      console.dir('createConversation error', error);
      return error;
    } finally {
      dispatch(hideLoading());
    }
  },
);

export const getConversation = createAsyncThunk(
  'conversation/get',
  async ({ userId, isGroup = false }, { dispatch, getState }) => {
    const {
      userInformation: userState,
    } = getState().authentication;
    dispatch(showLoading());
    try {
      const { data } = await conversationService.getConversation(
        userState.id ?? userId,
        isGroup,
      );
      return data;
    } catch (error) {
      console.log('getConversation error', error);
      return error.message;
    } finally {
      dispatch(hideLoading());
    }
  },
);

export const addMember = createAsyncThunk(
  'conversation/add-member',
  async ({ member, conversationId }, { dispatch }) => {
    dispatch(showLoading());
    try {
      const { data } = conversationService.addNewMember(conversationId, member);
      console.log(data);
    } catch (error) {
      console.log('addMember error', error);
      return error;
    } finally {
      dispatch(hideLoading());
    }
  },
);

export const deleteConversation = createAsyncThunk(
  'conversation/delete',
  async (conversationId, { dispatch }) => {
    dispatch(showLoading());
    try {
      const { data } = await conversationService.deleteConversation(
        conversationId,
      );
      return data;
    } catch (error) {
      console.log('deleteConversation error', error);
      return error.message;
    } finally {
      dispatch(hideLoading());
    }
  },
);

export const { addConversation, } = conversationSlice.actions;
export default conversationSlice.reducer;
