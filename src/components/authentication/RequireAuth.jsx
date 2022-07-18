import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getToken } from '../../store/selectors';

const RequireAuth = () => {
  const token = useSelector(getToken);
  const { pathname } = useLocation();

  console.log(token);

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/auth" state={{ from: pathname }} replace />
  );
};

export default RequireAuth;
