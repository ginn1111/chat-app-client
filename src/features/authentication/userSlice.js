import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login } from '@services/authentication';
import {
  PREFIX,
  actionNameGenerator,
  pendingStatusAction,
  rejectedStatusAction,
} from '@features/constants';

import commonErrorHandler from 'src/axios/errorHandler';
import { ErrorCode, ResponseMessage } from 'src/constants';
import { LoadingStatus } from '../constants';

export const INITIAL_STATE = {
  accessToken: null,
  information: {},
  loadingStatus: {
    responseMessage: '',
    status: LoadingStatus.IDLE,
  },
};

// ACTIONS TYPE
const actionNameCreator = actionNameGenerator(PREFIX.AUTHENTICATION);

// THUNK ACTIONS
export const loginThunk = createAsyncThunk(
  actionNameCreator('login'),
  async (credentials, thunkAPI) => {
    try {
      const response = await login(
        { ...credentials },
        { signal: thunkAPI.signal }
      );
      return response.data;
    } catch (error) {
      if (error?.code === ErrorCode.CANCEL_REQUEST) {
        thunkAPI.dispatch(resetAction());
      } else {
        return thunkAPI.rejectWithValue(error.response.status);
      }
    }
  }
);

// REDUCER
const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    resetAction(state) {
      console.log(state.loadingStatus);
      Object.assign(state.loadingStatus, {
        status: LoadingStatus.IDLE,
        responseMessage: '',
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      const { accessToken, ...rest } = action.payload;
      Object.assign(state, {
        loadingStatus: { status: LoadingStatus.FULFILLED, responseMessage: '' },
        accessToken,
        information: rest,
      });
    });
    builder.addMatcher(pendingStatusAction(PREFIX.AUTHENTICATION), (state) => {
      state.loadingStatus.status = LoadingStatus.PENDING;
    });
    builder.addMatcher(
      rejectedStatusAction(PREFIX.AUTHENTICATION),
      (state, action) => {
        const { loadingStatus } = state;
        loadingStatus.status = LoadingStatus.REJECTED;
        const responseMessage = commonErrorHandler(action.payload);
        if (responseMessage) {
          loadingStatus.responseMessage = responseMessage;
          return;
        }
        switch (action.payload) {
          //[401]
          case ErrorCode.WRONG_CREDENTIALS:
            loadingStatus.responseMessage = ResponseMessage.WRONG_CREDENTIALS;
            break;
        }
      }
    );
  },
});

export const { resetAction } = userSlice.actions;
export default userSlice.reducer;
