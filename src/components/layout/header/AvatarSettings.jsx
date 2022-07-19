import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';

import { getUser } from '../../../store/selectors';
import AvatarSettingItem from './AvatarSettingItem';
import { logout } from '../../../store/authen-slice';
import {
  UilUserCircle,
  UilUserExclamation,
  UilComment,
  UilSignout,
} from '@iconscout/react-unicons';

const AvatarSettings = ({ isShowMenu }) => {
  const user = useSelector(getUser);
  const dispatch = useDispatch();

  function logoutHandler() {
    dispatch(logout(user?.id));
  }

  return (
    <AnimatePresence>
      {isShowMenu && (
        <motion.div
          initial={{ originX: 'center', originY: '0' }}
          animate={{ opacity: 1, scale: [0.5, 1] }}
          exit={{ opacity: 0, scale: [1, 0.5] }}
          transition={{ duration: 0.2 }}
          className="z-[50] bg-white absolute top-[110%] right-[-50%] w-max p-2 h-ma rounded-md shadow-[0_10px_15px_-5px_#0000004a] arrow-menu"
        >
          <ul>
            <AvatarSettingItem
              icon={<UilUserCircle />}
              title="Profile"
              url="/profile"
            />
            <AvatarSettingItem
              icon={<UilUserExclamation />}
              title="Wall"
              url="/wall/me"
            />
            <AvatarSettingItem
              icon={<UilComment />}
              title="Message"
              url="/message"
            />
            <hr />
            <div
              className=" hover:bg-blue-400 duration-200 hover:text-white px-2 py-1 rounded-sm font-[500] flex items-center  gap-x-2 "
              onClick={logoutHandler}
            >
              <UilSignout />
              <span>Logout</span>
            </div>
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AvatarSettings;
