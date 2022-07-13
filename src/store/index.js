import { configureStore } from '@reduxjs/toolkit';
import UiReducer from './ui-slice';
import AuthenticationReducer from './authen-slice';
import FriendReducer from './friend-slice';

const store = configureStore({
  reducer: {
    ui: UiReducer,
    authentication: AuthenticationReducer,
    friend: FriendReducer,
  },
});

export default store;
