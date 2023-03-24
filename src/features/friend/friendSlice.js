import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  PREFIX,
  actionNameGenerator,
  pendingStatusAction,
  rejectedStatusAction,
} from '@features/constants';
import axios from 'axios';
import { getFriend } from '@services/friend';
import { ErrorCode, ResponseMessage } from 'src/constants';
import { LoadingStatus } from '../constants';
import commonErrorHandler from '@axios/errorHandler';

const INITIAL_STATE = {
  friendList: [],
  loadingStatus: {
    status: LoadingStatus.IDLE,
    responseMessage: '',
  },
};

const actionNameCreator = actionNameGenerator(PREFIX.FRIEND);

export const getFriendThunk = createAsyncThunk(
  actionNameCreator('getFriend'),
  async ({ apiOptions, onSuccess, onError }, thunkAPI) => {
    try {
      const friendList = thunkAPI.getState().user.information.friendList;

      const results = await Promise.all(
        friendList.map((friendId) =>
          getFriend(friendId, { signal: thunkAPI.signal, ...apiOptions })
        )
      );

      const friendDataList = results.map(({ data: friend }) => ({
        id: friend.id,
        avatar: friend.avatar,
        biography: friend.biography,
        nickname: friend.nickname,
      }));
      onSuccess(friendDataList);

      return friendDataList;
    } catch (error) {
      if (!axios.isCancel(error)) {
        const errorCode =
          error?.response?.code ?? ErrorCode.SOME_THING_WENT_WRONG;
        onError(errorCode);
        return thunkAPI.rejectWithValue(errorCode);
      }
    }
  }
);

const friendSlice = createSlice({
  name: 'friend',
  initialState: INITIAL_STATE,
  reducers: {
    resetAction(state) {
      Object.assign(state.loadingStatus, {
        status: LoadingStatus.IDLE,
        responseMessage: '',
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFriendThunk.fulfilled, (state, action) => {
      Object.assign(state, {
        friendList: action.payload,
        loadingStatus: {
          status: LoadingStatus.FULFILLED,
          responseMessage: '',
        },
      });
    });
    builder.addMatcher(pendingStatusAction(PREFIX.FRIEND), (state) => {
      state.loadingStatus.status = LoadingStatus.PENDING;
    });
    builder.addMatcher(rejectedStatusAction(PREFIX.FRIEND), (state, action) => {
      const { loadingStatus } = state;
      loadingStatus.status = LoadingStatus.REJECTED;
      const responseMessage = commonErrorHandler(action.payload);
      if (responseMessage) {
        loadingStatus.responseMessage = responseMessage;
        return;
      }
      switch (action.payload) {
        default:
          loadingStatus.responseMessage = ResponseMessage.SOME_THING_WENT_WRONG;
      }
    });
  },
});

export const { resetAction } = friendSlice.actions;
export default friendSlice.reducer;
