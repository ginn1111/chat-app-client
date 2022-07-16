import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';

import Avatar from '../../../assets/img/avatar2.jpeg';
import AvatarSettings from './AvatarSettings';
import NotificationList from './NotificationList';
import Animation from '../../../animation/Animation';
import { fallAnimate } from '../../../animation/models';
import Search from '../../ui/search/Search';
import { getNotifications } from '../../../store/selectors';
import { useSelector } from 'react-redux';
import useSearch from '../../../hooks/useSearch';

const Header = () => {
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [isShowNotification, setIsShowNotification] = useState(false);
  const notifications = useSelector(getNotifications);
  const searchHandler = useSearch();

  const isNotify = useMemo(
    () => notifications?.some((notification) => !notification.isResponse),
    [notifications],
  );

  useEffect(() => {
    function handlerEvent(event) {
      const avatarMenuContainer = document.getElementById('avatar-container');
      const notificationPanel = document.getElementById('notification-panel');
      const notificationContainer = document.getElementById(
        'notification-container',
      );

      avatarMenuContainer.contains(event.target)
        ? setIsShowMenu((prev) => !prev)
        : setIsShowMenu(false);

      notificationContainer.contains(event.target)
        ? notificationPanel?.contains(event.target)
          ? setIsShowNotification(true)
          : setIsShowNotification((prev) => !prev)
        : setIsShowNotification(false);
    }
    document.addEventListener('mouseup', handlerEvent);
    return () => document.removeEventListener('mouseup', handlerEvent);
  }, []);

  const hoverAnimation = {
    whileHover: {
      color: '#bfdbce',
      scale: 1.5,
      cursor: 'pointer',
      transition: { duration: 0.2 },
    },
    whileTap: {
      color: '#bfdbce',
      scale: 3,
      cursor: 'pointer',
      transition: { duration: 0.2 },
    },
  };
  return (
    <header className="bg-white  z-[10] w-[90%] px-auto mx-auto h-[70px] flex gap-x-5 items-center justify-between border-b border-solid border-slate-400 text-sm text-gray-600 fixed top-0 left-0 right-0">
      <div className="ml-auto flex  gap-x-2 relative w-5/12 ">
        <Animation animationCreator={fallAnimate}>
          <div>Logo</div>
        </Animation>
        <span className="mx-auto">Enjoy your moment</span>
      </div>
      <div className="w-1/3 text-gray-200">
        <Search
          onSearch={searchHandler}
          bgColor="bg-gray-200"
          placeholder="Search friend..."
        />
      </div>
      <div className="w-1/4 mr-auto flex text-[14px] items-center gap-x-5 relative justify-end">
        {/* Notify section */}
        <div
          className={`relative ${isNotify && 'is-notify'}`}
          id="notification-container"
        >
          <motion.div {...hoverAnimation}>
            <NotificationsOutlinedIcon sx={{ fontSize: 22 }} />
          </motion.div>
          <NotificationList
            isShow={isShowNotification}
            notifications={notifications}
          />
        </div>

        {/* Avatar section */}
        <Animation animationCreator={fallAnimate}>
          <div
            id="avatar-container"
            className="relative cursor-pointer w-7 h-7 rounded-full"
          >
            <img
              className="w-full h-full object-cover object-center rounded-full"
              src={Avatar}
              alt="avatar"
            />
            <AvatarSettings isShowMenu={isShowMenu} />
          </div>
        </Animation>
      </div>
    </header>
  );
};

export default Header;
