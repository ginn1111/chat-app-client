import { KEY } from '@services/constants';
import { loginThunk } from 'src/features/authentication/userSlice';

export const localStorageMiddleware = () => (next) => (action) => {
  if (
    action.type === loginThunk.typePrefix + '/fulfilled' &&
    action.meta.arg.rememberMe
  ) {
    localStorage.setItem(KEY.JWT, JSON.stringify(action.payload.accessToken));
  }

  return next(action);
};
