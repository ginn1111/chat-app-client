import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { privateRequest } from '../axios';
import { notify } from './notification-slice';

const convertData = (data) => ({
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
  friendList: data.friendList,
});
const INIT_STATE = {
  friendInformation: {
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
    friendList: null,
  },
  status: 'idle',
};

const friendSlice = createSlice({
  name: 'friend',
  initialState: INIT_STATE,
  reducers: {
    resetStatus(state) {
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFriend.pending, (state) => {
        state.status = 'get-friend/pending';
      })
      .addCase(getFriend.rejected, (state) => {
        state.status = 'get-friend/failed';
      })
      .addCase(getFriend.fulfilled, (state, { payload }) => {
        delete payload.friendList;
        state.friendInformation = {
          friendList: state.friendInformation.friendList,
          ...payload,
        };
        state.status = 'get-friend/success';
      })
      .addCase(getListFriend.fulfilled, (state, { payload }) => {
        state.friendInformation.friendList = payload;
        state.status = 'get-list-friend/success';
      })
      .addCase(getListFriend.rejected, (state) => {
        state.status = 'get-list-friend/failed';
      })
      .addCase(sendAddFriend.pending, (state) => {
        state.status = 'send-add-friend/pending';
      })
      .addCase(sendAddFriend.fulfilled, (state) => {
        state.status = 'send-add-friend/success';
      })
      .addCase(sendAddFriend.rejected, (state) => {
        state.status = 'send-add-friend/failed';
      });
  },
});

const getListFriend = createAsyncThunk('get-friend-list', async (userId) => {
  const { data } = await privateRequest.get(`/users/${userId}/friends`);
  return data;
});

export const getFriend = createAsyncThunk(
  'get-friend',
  async (userId, { dispatch }) => {
    const { data } = await privateRequest.get(`/users/find/${userId}`);
    await dispatch(getListFriend(userId));
    return convertData(data);
  },
);

export const sendAddFriend = createAsyncThunk(
  'send-add-friend',
  async (id, { getState, dispatch }) => {
    const userState = getState().authentication.userInformation;
    const { data } = await privateRequest.put(
      `/users/${userState.id}/friends/add`,
      null,
      {
        params: {
          receiverId: id,
        },
      },
    );

    await dispatch(
      notify({
        senderId: userState.id,
        senderName: `${userState.firstName} ${userState.lastName}`,
        senderAvatar: userState.avatar,
        receiverId: id,
        notify: 'Make friend, happy together!',
        isResponse: false,
      }),
    );

    console.log(data);
  },
);

export const { resetStatus } = friendSlice.actions;
export default friendSlice.reducer;
