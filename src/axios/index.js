import axios from 'axios';

export const publicRequest = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
});

export const privateRequest = (token) =>
  axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
      'x-authorization': `Bearer ${token}`,
    },
    withCredentials: true,
  });

// interceptor check expiration of access token
export const setUpInterceptor = (setup) =>
  privateRequest.interceptors.request.use(setup(), (error) =>
    Promise.reject(error),
  );
