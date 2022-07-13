import axios from 'axios';
import { refreshToken } from '../store/authen-slice';
import jwt_decode from 'jwt-decode';

export const publicRequest = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
});

export const privateRequest = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'x-authorization': `Bearer ${localStorage.getItem('accessToken')}`,
  },
  withCredentials: true,
});

export const setUpInterceptor = (store) =>
  privateRequest.interceptors.request.use(
    async (config) => {
      const decodedToken = jwt_decode(localStorage.getItem('accessToken'));
      const currentTimeStamp = new Date().getTime();
      const expTime = decodedToken.exp * 1000;
      if (expTime <= currentTimeStamp) {
        const {
          data: { newAccessToken },
        } = await store.dispatch(refreshToken());
        config.headers['x-authorization'] = `Bearer ${newAccessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );
