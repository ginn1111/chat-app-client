import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

import { localStorageMiddleware } from './middlewares';

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
  devTools: !IS_PRODUCTION,
});

export default store;
