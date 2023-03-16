import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import rootReducer from './rootReducer';

import { localStorageMiddleware } from './middlewares';

const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const middlewares = IS_PRODUCTION
  ? [logger, localStorageMiddleware]
  : [localStorageMiddleware];

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middlewares),
  devTools: !IS_PRODUCTION,
});

export default store;
