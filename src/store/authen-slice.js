import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import { publicRequest, privateRequest } from '../axios';

const convertData = (data) => ({
  accessToken: data.accessToken,
  userInformation: {
    slogan: data.biography,
    dob: data.birthday,
    email: data.email,
    gender: data.gender,
    firstName: data.firstName,
    lastName: data.lastName,
    phone: data.phone,
    id: data._id,
    join: data.createdAt,
    address: data.address,
    friendRequest: data.friendRequest,
  },
});

const INIT_STATE = {
  accessToken: localStorage.getItem('accessToken'),
  userInformation: {
    avatar: '',
    coverPicture: '',
    id: '',
    firstName: '',
    lastName: '',
    phone: '',
    gender: '',
    email: '',
    dob: '',
    slogan: '',
    address: '',
    join: '',
  },
  status: 'idle',
  isLogged: false,
};

const AuthenticationSlice = createSlice({
  name: 'authentication',
  initialState: INIT_STATE,
  reducers: {
    resetStatus(state) {
      state.status = 'idle';
    },
    setAccessToken(state, { payload }) {
      state.accessToken = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.status = 'login/pending';
      })
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        Object.assign(state, {
          ...payload,
          status: 'login/success',
          isLogged: true,
        });
      })
      .addCase(loginThunk.rejected, (state) => {
        state.status = 'login/failed';
      })
      .addCase(registerThunk.pending, (state) => {
        state.status = 'register/pending';
      })
      .addCase(registerThunk.fulfilled, (state) => {
        state.status = 'register/success';
      })
      .addCase(registerThunk.rejected, (state) => {
        state.status = 'register/failed';
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.accessToken = null;
      })
      .addCase(logoutThunk.rejected, (state) => {
        state.accessToken = null;
      })
      .addCase(getUserInformation.pending, (state) => {
        state.status = 'get-user/pending';
      })
      .addCase(getUserInformation.fulfilled, (state, { payload }) => {
        state.userInformation = {
          ...state.userInformation,
          ...payload.userInformation,
        };
        state.status = 'get-user/success';
      })
      .addCase(getUserInformation.rejected, (state) => {
        state.accessToken = null;
        // will migrate redux persist
        localStorage.removeItem('accessToken');
        state.status = 'get-user/failed';
      })
      .addCase(refreshToken.fulfilled, (state, { payload }) => {
        state.accessToken = payload;
      })
      .addCase(refreshToken.rejected, (state) => {
        state.accessToken = null;
      })
      .addCase(updateUser.pending, (state) => {
        state.status = 'update-user/pending';
      })
      .addCase(updateUser.rejected, (state) => {
        state.status = 'update-user/failed';
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.userInformation = { ...payload.userInformation };
        state.status = 'update-user/success';
      })
      .addCase(getFriendListOfUser.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.userInformation.friendList = payload;
        state.status = 'get-friend-list-of-user/success';
      })
      .addCase(getFriendListOfUser.rejected, (state) => {
        state.status = 'get-friend-list-of-user/failed';
      });
  },
});

export const loginThunk = createAsyncThunk(
  'authentication/login',
  async ({ email, password }) => {
    const { data } = await publicRequest.post('/auth/login', {
      email,
      password,
    });

    const userData = convertData(data);
    localStorage.setItem('accessToken', userData.accessToken);
    return userData;
  },
);

export const registerThunk = createAsyncThunk(
  'authentication/register',
  async ({ firstName, lastName, email, password }) => {
    const { data } = await publicRequest.post('/auth/register', {
      firstName,
      lastName,
      email,
      password,
      gender: 'female',
      birthday: new Date().toISOString(),
      phone: new Date().getTime(),
    });
    return data;
  },
);

export const refreshToken = createAsyncThunk(
  'authentication/refresh-token',
  async (userId) => {
    const { data } = await privateRequest.post('/auth/refresh-token', {
      userId,
    });

    localStorage.setItem('accessToken', data.accessToken);
    return data.accessToken;
  },
);

export const logoutThunk = createAsyncThunk(
  'authentication/logout',
  async (_, { getState }) => {
    await publicRequest.post(
      `/auth/${getState().authentication.userInformation.id}/logout`,
    );
    localStorage.removeItem('accessToken');
  },
);

const getFriendListOfUser = createAsyncThunk(
  'authentication/get-list-friend-of-user',
  async (_, { getState }) => {
    const jwtData = jwtDecode(getState().authentication.accessToken);
    const { data } = await privateRequest.get(`users/${jwtData.id}/friends`);
    return data;
  },
);

export const getUserInformation = createAsyncThunk(
  'authentication/get-user',
  async (_, { getState, dispatch }) => {
    const jwtData = jwtDecode(getState().authentication.accessToken);

    const userId = jwtData.id;
    const { data } = await privateRequest.get(`/users/find/${userId}`);
    await dispatch(getFriendListOfUser());

    console.log(data);

    return convertData(data);
  },
);

export const updateUser = createAsyncThunk(
  'authentication/update-user',
  async (user, { getState }) => {
    const userId = getState().authentication.userInformation.id;

    const { data } = await privateRequest.put(`/users/${userId}/edit`, {
      ...user,
    });

    return convertData(data);
  },
);

export const { resetStatus, setAccessToken } = AuthenticationSlice.actions;
export default AuthenticationSlice.reducer;
