import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { axiosInstance } from '../axios';
import { getToken, getUser } from '../store/selectors';

const useAxios = () => {
  const token = useSelector(getToken);
  const user = useSelector(getUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const interceptorRequest = axiosInstance.interceptors.request.use(
      async (config) => {
        try {
          let accessToken = token;
          const decodedToken = jwt_decode(token);
          const currentTimeStamp = new Date().getTime();
          const expTime = decodedToken.exp * 1000;
          if (expTime <= currentTimeStamp) {
            const response = await dispatch(refreshToken());
            if (response?.status === 200) {
              accessToken = response.data?.accessToken;
            } else {
              dispatch(logout());
            }
          }
          config.headers['x-authorization'] = `Bearer ${accessToken}`;
        } catch (error) {
          console.log('refreshToken error', error);
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    return () => {
      axiosInstance.interceptors.request.eject(interceptorRequest);
    };
  }, [token]);

  return axiosInstance;
};

export default useAxios;
