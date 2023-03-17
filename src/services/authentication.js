import { publicRequest } from '../axios';
import { URL } from '@services/constants';

export const login = ({ email, password }, config) =>
  publicRequest.post(URL.LOGIN, { email, password }, config);

export const register = ({ firstName, lastName, email, password }, config) =>
  publicRequest.post(
    URL.REGISTER,
    {
      firstName,
      lastName,
      email,
      password,
      gender: 'female',
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
