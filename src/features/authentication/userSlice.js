import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';

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
import { getLocal, removeLocal } from '@services/localServices';
import { getUser } from '@services/user';

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

export const persistentThunk = createAsyncThunk(
  actionNameCreator('persistent'),
  async (_, thunkAPI) => {
    try {
      const jwt = JSON.parse(getLocal('jwt'));
      if (!jwt) {
        throw new Error({ code: 'NOT_PERSISTENT' });
      }
      const decodeJWT = jwtDecode(jwt);
      if (decodeJWT) {
        const userId = decodeJWT.id;
        thunkAPI.dispatch(setAccessToken(jwt));
        const { data } = await getUser(userId, { signal: thunkAPI.signal });
        return data;
      }
    } catch (error) {
      // The error is not abort request or do not persistent
      if (
        error?.code !== ErrorCode.CANCEL_REQUEST &&
        error?.code !== 'NOT_PERSISTENT'
      ) {
        thunkAPI.dispatch(setAccessToken(null));
        removeLocal('jwt');
      }
      return thunkAPI.rejectWithValue();
    }
  }
);

// REDUCER
const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    resetAction(state) {
      Object.assign(state.loadingStatus, {
        status: LoadingStatus.IDLE,
        responseMessage: '',
      });
    },
    setAccessToken(state, action) {
      state.accessToken = action.payload;
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
    builder.addCase(persistentThunk.fulfilled, (state, action) => {
      Object.assign(state, {
        loadingStatus: {
          status: LoadingStatus.FULFILLED,
          responseMEssage: '',
        },
        information: action.payload,
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

export const { resetAction, setAccessToken } = userSlice.actions;
export default userSlice.reducer;
