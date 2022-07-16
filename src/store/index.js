import { configureStore } from '@reduxjs/toolkit';
import UiReducer from './ui-slice';
import AuthenticationReducer from './authen-slice';
import FriendReducer from './friend-slice';
import NotificationsReducer from './notification-slice';
import SearchReducer from './search-slice';

const store = configureStore({
  reducer: {
    ui: UiReducer,
    authentication: AuthenticationReducer,
    friend: FriendReducer,
    notifications: NotificationsReducer,
    search: SearchReducer,
  },
});

export default store;
