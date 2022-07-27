import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getToken } from '../../store/selectors';
import { useEffect } from 'react';
import getSocketIO from '../../services/socketIO';

const RequireAuth = () => {
  const token = useSelector(getToken);
  const { pathname } = useLocation();

  useEffect(() => {
    if (token) {
      getSocketIO(token);
    }
  }, [token]);

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/login" state={{ from: pathname }} replace />
  );
};

export default RequireAuth;
