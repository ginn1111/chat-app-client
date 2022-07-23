import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getToken, getUser } from '../../store/selectors';
import { addUser } from '../../services/socketIO';
import { useEffect } from 'react';

const RequireAuth = () => {
  const token = useSelector(getToken);
  const { pathname } = useLocation();
  const { id: userId } = useSelector(getUser);

  useEffect(() => {
    token && addUser(userId);
  }, [token, userId]);

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/login" state={{ from: pathname }} replace />
  );
};

export default RequireAuth;
