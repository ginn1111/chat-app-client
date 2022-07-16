import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { getLocal } from '../../services/localServices';
import { persist, setToken } from '../../store/authen-slice';
import { hasLoading, getToken } from '../../store/selectors';
import * as authenticationService from '../../services/authentication';

const Persist = () => {
  console.log('persist call');
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const isLoading = useSelector(hasLoading);

  useEffect(() => {
    const userId = getLocal('userId');
    !token &&
      (async () => {
        try {
          const response = await authenticationService.refreshToken(userId);
          console.log(response.data.accessToken);
          dispatch(setToken(response.data.accessToken));
        } catch (error) {
          console.log(error);
        }
      })();
  }, []);

  return <Outlet />;
};

export default Persist;
