import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { accessTokenSelector } from '@app/selectors';

const RequireAuthentication = () => {
  const accessToken = useSelector(accessTokenSelector);
  const { pathname } = useLocation();
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   if (token) {
  //     getSocketIO(token);
  //   }
  // }, [token]);

  // useEffect(() => {
  //   const socket = getSocketIO();
  //   if (socket?.connected) {
  //     const getAddFriendHandler = (payload) => {
  //       console.log({ payload });
  //       dispatch(addNotification(payload));
  //       dispatch(addFriendResponse(payload.senderId));
  //     };
  //     getAddFriend(getAddFriendHandler, socket);
  //     return () => removeGetAddFriend(getAddFriendHandler, socket);
  //   }
  // }, [getSocketIO()?.connected]);

  return accessToken ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/login" state={{ from: pathname }} replace />
  );
};

export default RequireAuthentication;
