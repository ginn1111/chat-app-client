import { configureStore } from '@reduxjs/toolkit';
import UiReducer from './ui-slice';
import AuthenticationReducer from './authen-slice';

const store = configureStore({
  reducer: { ui: UiReducer, authentication: AuthenticationReducer },
});

export default store;
