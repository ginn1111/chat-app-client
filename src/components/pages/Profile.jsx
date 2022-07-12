import React, { useEffect, useRef } from 'react';
import ProcessBar from '../ui/loading/ProcessBar';
import ToastList from '../ui/notification/ToastList';
import ProfileAvatar from '../profile/profile-avatar/ProfileAvatar';
import ProfileInformation from '../profile/profile-information/ProfileInformation';
import { useDispatch, useSelector } from 'react-redux';
import { resetStatus } from '../../store/authen-slice';
import { getStatus } from '../../store/selectors';

const Profile = () => {
  const dispatch = useDispatch();
  const status = useSelector(getStatus);

  const toastRef = useRef();

  useEffect(() => {
    if (status === 'update-user/success') {
      toastRef.current.addToast({
        message: 'Update successfully!',
      });
      dispatch(resetStatus());
    }
    if (status === 'update-user/failed') {
      toastRef.current.addToast({
        message: 'Update failed, try again!',
        type: 'error',
      });
      dispatch(resetStatus());
    }
  }, [status]);

  return (
    <>
      <ToastList ref={toastRef} />
      <ProcessBar
        isShow={
          status === 'update-user/pending' || status === 'get-user/pending'
        }
      />
      <div className="format-page-size flex py-5 gap-x-2">
        <ProfileAvatar />
        <ProfileInformation toastRef={toastRef} />
      </div>
    </>
  );
};

export default Profile;
