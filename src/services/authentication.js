import { publicRequest } from '../axios';

export const login = ({ email, password }, config) =>
  publicRequest.post('/auth/login', { email, password }, config);

export const register = ({ firstName, lastName, email, password }, config) =>
  publicRequest.post(
    '/auth/register',
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
    `/auth/refresh-token`,
    {
      userId,
    },
    config
  );

export const logout = (userId, config) =>
  publicRequest.post(`/auth/${encodeURIComponent(userId)}/logout`, config);
