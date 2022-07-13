import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { privateRequest } from '../axios';

const INIT_STATE = {
  notifications: [],
  status: 'idle',
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState: INIT_STATE,
  reducers: {
    resetStatus(state) {
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {},
});

export const notify = createAsyncThunk(
  'notify',
  async (notification, { getState }) => {
    const { data } = await privateRequest.post(
      `/notifications/${getState().authentication.userInformation.id}/create`,
      { ...notification },
    );

    console.log(data);
  },
);

export const getNotifications = createAsyncThunk(
  'get-notifications',
  async (_, { getState }) => {
    const { data } = await privateRequest.get(
      `/notifications/${getState().authentication.userInformation.id}/get`,
    );

    console.log(data);
  },
);

// export const updateNotification = createAsyncThunk(
//   'update-notification',
//   async (_, )
// )

export const deleteNotification = createAsyncThunk(
  'delete-notification',
  async (notificationId, { getState }) => {
    const { data } = await privateRequest.delete(
      `/notifications/${getState().authentication.userInformation.id}/delete`,
      {
        id: notificationId,
      },
    );

    console.log(data);
  },
);

export const { resetStatus } = notificationSlice.actions;
export default notificationSlice.reducer;
