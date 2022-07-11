import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { publicRequest } from '../axios';

const INIT_STATE = {
  accessToken: null,
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
  },
  status: 'idle',
};

const AuthenticationSlice = createSlice({
  name: 'authentication',
  initialState: INIT_STATE,
  reducers: {
    resetStatus(state) {
      state.status = 'idle';
    },
    setUser(state, { payload: { accessToken, userInformation } }) {
      console.log(accessToken, userInformation);
      Object.assign(state, {
        accessToken: accessToken,
        userInformation: { ...userInformation },
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        Object.assign(state, {
          ...payload,
          status: 'success',
        });
      })
      .addCase(loginThunk.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(registerThunk.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(registerThunk.fulfilled, (state) => {
        // to do something here
        state.status = 'idle';
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.status = 'failed';
        console.log(action);
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

    const payload = {
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
      },
    };

    localStorage.setItem('user', JSON.stringify(payload));
    return payload;
  },
);

export const registerThunk = createAsyncThunk(
  'authentication/register',
  async ({ firstName, lastName, email, password }) => {
    const response = await publicRequest.post('/auth/register', {
      firstName,
      lastName,
      email,
      password,
      gender: 'female',
      birthday: '2001-09-12T17:00:00.000+00:00',
      phone: '123123123user1',
    });
    console.log(response);
  },
);

export const { resetStatus, setUser } = AuthenticationSlice.actions;
export default AuthenticationSlice.reducer;
