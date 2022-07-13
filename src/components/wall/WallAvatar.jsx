import React, { memo, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import {
  UilUserExclamation,
  UilUserCheck,
  UilUserPlus,
} from '@iconscout/react-unicons';
import Avatar from '../../assets/img/avatar2.jpeg';
import ControlCameraOutlinedIcon from '@mui/icons-material/ControlCameraOutlined';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import ToastList from '../ui/notification/ToastList';
import { getFriendStatus } from '../../store/selectors';
import { sendAddFriend } from '../../store/friend-slice';

const WallAvatar = ({ fullName, avatar, isOwn, isFriend, isPending }) => {
  const dispatch = useDispatch();
  const param = useParams();
  const status = useSelector(getFriendStatus);

  const toastRef = useRef();

  useEffect(() => {
    if (status === 'send-add-friend/success') {
      toastRef.current.addToast({ message: 'Send request successfully!' });
    }
    if (status === 'send-add-friend/failed') {
      toastRef.current.addToast({
        message: 'Send request failed, try again',
        type: 'error',
      });
    }
  }, [status]);

  function sendAddFriendHandler() {
    dispatch(sendAddFriend(param.id));
  }

  return (
    <>
      <ToastList ref={toastRef} />
      <section
        className={`w-5/6 relative rounded-b-lg bg-[url('../assets/img/background.jpg')] bg-top-center pt-[25%]`}
      >
        {/*  will change --> user.coverPicture */}
        <div className="bottom-0 absolute-x-center translate-y-[50%] w-[120px] h-max">
          <div className=" rounded-full border-2 border-blue-600 relative overflow-hidden">
            <img
              src={Avatar} // will change --> user.avatar
              alt="avatar"
              className="w-full h-full rounded-full object-cover object-center border-2 border-white border-solid"
            />
            <motion.div
              whileHover={{
                backgroundColor: '#0000004a',
                color: '#fff',
                transition: { duration: 0.5 },
              }}
              className="cursor-pointer absolute-x-center bottom-0 text-transparent flex py-1 justify-center bg-transparent w-full h-1/2"
            >
              <motion.div
                initial={{ y: 10 }}
                whileHover={{
                  y: 0,
                  transition: { duration: 0.5 },
                }}
              >
                <label htmlFor="change-bg" className="cursor-pointer">
                  <ControlCameraOutlinedIcon
                    style={{ color: 'currentColor' }}
                  />
                </label>
              </motion.div>
            </motion.div>
          </div>
        </div>
        <div className="absolute right-2 bottom-2 flex items-center gap-x-2">
          <div className="bg-white flex cursor-pointer items-center w-max overflow-hidden px-2  rounded-md  py-1.5">
            <motion.label
              whileHover={{
                transition: { duration: 0.4 },
                color: '#bfdbce',
              }}
              htmlFor="change-bg"
              className="text-slate-600 flex items-center cursor-pointer text-[14px] font-bold  gap-x-1.5"
            >
              <CameraAltOutlinedIcon sx={{ fontSize: 23 }} />
            </motion.label>
            <input
              type="file"
              id="change-bg"
              className="hidden outline-none border-none"
            />
          </div>
          {!isOwn && !isFriend && !isPending && (
            <motion.div
              onClick={sendAddFriendHandler}
              whileHover={{
                transition: { duration: 0.4 },
                color: '#bfdbce',
              }}
              className="bg-white rounded-md px-2 py-[8px] cursor-pointer text-slate-600"
            >
              <UilUserPlus sx={{ fontSize: 23 }} />
            </motion.div>
          )}
          {isPending && !isFriend && (
            <motion.div
              whileHover={{
                transition: { duration: 0.4 },
                color: '#bfdbce',
              }}
              className="bg-white rounded-md px-2 py-[8px] cursor-pointer text-slate-600"
            >
              <UilUserExclamation sx={{ fontSize: 23 }} />
            </motion.div>
          )}
          {isFriend && (
            <motion.div
              whileHover={{
                transition: { duration: 0.4 },
                color: '#bfdbce',
              }}
              className="bg-white rounded-md px-2 py-[8px] cursor-pointer text-slate-600"
            >
              <UilUserCheck sx={{ fontSize: 23 }} />
            </motion.div>
          )}
        </div>
        <span className="text-[20px] w-full block text-slate-600 absolute-x-center bottom-[-100px] font-[500] text-center">
          {fullName}
        </span>
      </section>
    </>
  );
};

export default memo(WallAvatar);
