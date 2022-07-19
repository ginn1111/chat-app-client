import { createSlice } from '@reduxjs/toolkit';
import * as notificationService from '../services/notification';

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
    setNotifications(state, action) {
      state.notifications = action.payload;
    },
    setUpdateNotification(state, action) {
      const index = state.notifications.findIndex(
        (notification) => notification._id === action.payload,
      );
      index >= 0 && (state.notifications[index].isResponse = true);
    },
    setRemoveNotification(state, action) {
      const index = state.notifications.findIndex(
        (notification) => notification._id === action.payload,
      );
      index >= 0 && state.notifications.splice(index, 1);
    },
  },
});

export const notify = (notification) => async (_, getState) => {
  const {
    userInformation: { id: userId },
  } = getState().authentication;
  await notificationService.sendNotify(userId, notification);
};

export const getNotifications = (userId) => async (dispatch) => {
  try {
    const { data } = await notificationService.getNotifications(userId);
    dispatch(setNotifications(data));
  } catch (error) {
    console.log(`get notifications error\n`, error);
  }
};

export const updateNotification =
  (notificationId) => async (dispatch, getState) => {
    try {
      const {
        userInformation: { id: userId },
      } = getState().authentication;

      !getState().notifications.notifications.find(
        (notification) => notification._id === notificationId,
      ).isResponse &&
        (await notificationService.updateNotification(userId, notificationId));
      dispatch(setUpdateNotification(notificationId));
    } catch (error) {
      console.log(`update notification error: ${error}`);
    }
  };

export const removeNotification =
  (notificationId) => async (dispatch, getState) => {
    const {
      userInformation: { id: userId },
    } = getState().authentication;
    try {
      await notificationService.removeNotification(userId, notificationId);
      dispatch(setRemoveNotification(notificationId));
    } catch (error) {
      console.log(`remove notification error ${error}`);
    }
  };

export const {
  resetStatus,
  showLoading,
  hideLoading,
  setNotifications,
  setUpdateNotification,
  setRemoveNotification,
} = notificationSlice.actions;
export default notificationSlice.reducer;
