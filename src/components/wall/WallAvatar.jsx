import React, { memo, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import {
  UilUserExclamation,
  UilUserCheck,
  UilUserPlus,
  UilUserMinus,
  UilUserTimes,
} from '@iconscout/react-unicons';
import Avatar from '../../assets/img/avatar2.jpeg';
import ControlCameraOutlinedIcon from '@mui/icons-material/ControlCameraOutlined';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import FriendState from './FriendState';
import { getFriendStatus } from '../../store/selectors';
import {
  sendAddFriend,
  responseAddFriend,
  resetStatus,
  unfriend,
} from '../../store/friend-slice';
import withToast from '../../hoc/withToast';

const WallAvatar = withToast(
  ({ fullName, avatar, isOwned, isFriend, isPending, isResponse, toast }) => {
    const dispatch = useDispatch();
    const param = useParams();
    const status = useSelector(getFriendStatus);

    const errorType = { color: 'salmon' };
    const warningType = { color: '#ffb100cf' };
    const safeType = { color: '#50f350' };

    useEffect(() => {
      if (status === 'send-add-friend/success') {
        toast.addToast({ message: 'Send request successfully!' });
        dispatch(resetStatus());
      }
      if (status === 'send-add-friend/failed') {
        toast.addToast({
          message: 'Send request failed, try again!',
          type: 'error',
        });
        dispatch(resetStatus());
      }
      if (status === 'unfriend/success') {
        toast.addToast({
          message: 'Unfriend successfully!',
        });
        dispatch(resetStatus());
      }
      if (status === 'unfriend/failed') {
        toast.addToast({
          message: 'Unfriend failed, something went wrong!',
          type: 'error',
        });
        dispatch(resetStatus());
      }
    }, [status]);

    function sendAddFriendHandler() {
      dispatch(sendAddFriend(param.id));
    }

    function responseAddFriendHandler(isAccepted) {
      dispatch(
        responseAddFriend({ receiverId: param.id, accepted: isAccepted }),
      );
    }

    function unfriendHandler() {
      dispatch(unfriend(param.id));
    }

    return (
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
            {isOwned && (
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
            )}
          </div>
        </div>
        <div className="absolute right-2 bottom-2 flex items-center gap-x-2">
          {isOwned && (
            <div className=" hover:opacity-80 duration-300 bg-white flex cursor-pointer items-center w-max overflow-hidden px-2  rounded-md  py-1.5">
              <label
                htmlFor="change-bg"
                className="text-slate-600 flex items-center cursor-pointer text-[14px] font-bold  gap-x-1.5"
              >
                <CameraAltOutlinedIcon sx={{ fontSize: 23 }} />
                Thay đổi ảnh bìa
              </label>
              <input
                type="file"
                id="change-bg"
                className="hidden outline-none border-none"
              />
            </div>
          )}
          {!isOwned && !isFriend && !isPending && !isResponse && (
            <div onClick={sendAddFriendHandler}>
              <FriendState
                icon={<UilUserPlus style={{ color: '#6fdeff' }} />}
                title="Kết bạn"
              />
            </div>
          )}
          {isPending && !isFriend && (
            <FriendState
              icon={<UilUserExclamation style={warningType} />}
              title="Đang quyết định"
            />
          )}
          {isFriend && !isResponse && (
            <div onClick={unfriendHandler}>
              <FriendState
                icon={<UilUserMinus style={errorType} />}
                title="Huỷ kết bạn"
              />
            </div>
          )}
          {isResponse && (
            <>
              <div onClick={() => responseAddFriendHandler(true)}>
                <FriendState
                  icon={<UilUserCheck style={safeType} />}
                  title="Chấp nhận"
                />
              </div>
              <div onClick={() => responseAddFriendHandler(false)}>
                <FriendState
                  icon={<UilUserTimes style={errorType} />}
                  title="Từ chối"
                />
              </div>
            </>
          )}
        </div>
        <span className="text-[20px] w-full block text-slate-600 absolute-x-center bottom-[-100px] font-[500] text-center">
          {fullName}
        </span>
      </section>
    );
  },
);

export default memo(WallAvatar);
