import axios from 'axios';

import { refreshToken } from '@services/authentication';
import jwtDecode from 'jwt-decode';
import { setAccessToken } from '@features/authentication/userSlice';
import { getLocal, setLocal } from '@services/localServices';
import { KEY, URL } from '@services/constants';
import API_URL from '@constants/domains';

export const publicRequest = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const privateRequest = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

privateRequest.interceptors.response.use((response) => {
  switch (response.config.url) {
    case URL.GET_USER(response.data._id):
      const { _id, __v, createAt, updateAt, ...rest } = response.data;
      return { ...response, data: { ...rest, id: _id } };
    default:
      return response;
  }
});

publicRequest.interceptors.response.use((response) => {
  console.log(response.config.url, URL.GET_USER(response.data._id));
  switch (response.config.url) {
    case URL.LOGIN:
      const { _id, __v, createAt, updateAt, ...rest } = response.data;
      return { ...response, data: { ...rest, id: _id } };
    default:
      return response;
  }
});

export const setUpInterceptor = ({ dispatch, getState }) =>
  privateRequest.interceptors.request.use(
    async (config) => {
      const { accessToken } = getState().user;
      try {
        if (accessToken) {
          const decodedToken = jwtDecode(accessToken);
          const currentTimeStamp = Date.now();
          const expTime = decodedToken.exp * 1000;
          const userId = decodedToken.id;
          if (expTime <= currentTimeStamp) {
            const { data } = await refreshToken(userId);
            dispatch(setAccessToken(data.accessToken));
            if (getLocal(KEY.JWT)) {
              setLocal(KEY.JWT, data.accessToken);
            }
          }
          config.headers['x-authorization'] = `Bearer ${accessToken}`;
        }
      } catch (error) {
        console.log('refreshToken error', error);
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
