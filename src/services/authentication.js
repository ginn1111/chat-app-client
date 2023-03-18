import { publicRequest } from '../axios';
import { URL } from '@services/constants';

export const login = ({ email, password }, config) =>
  publicRequest.post(URL.LOGIN, { email, password }, config);

export const register = ({ nickname, email, password }, config) =>
  publicRequest.post(
    URL.REGISTER,
    {
      nickname,
      email,
      password,
    },
    config
  );

export const refreshToken = (userId, config) =>
  publicRequest.post(
    URL.REFRESH_TOKEN,
    {
      userId,
    },
    config
  );

export const logout = (userId, config) =>
  publicRequest.post(URL.LOGOUT(userId), config);
