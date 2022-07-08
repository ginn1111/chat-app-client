import React, { useState, useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import NavBar from './NavBar';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import Avatar from '../../assets/img/avatar2.jpeg';
import AvatarSettings from './AvatarSettings';
import SearchHeader from './SearchHeader';
import NotificationList from './NotificationList';
import Animation from '../../animation/Animation';
import { fallAnimate } from '../../animation/models';

const Header = () => {
  const [isSearch, setIsSearch] = useState(false);
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [isShowNotification, setIsShowNotification] = useState(false);

  useEffect(() => {
    function handlerEvent(event) {
      const avatarMenuContainer = document.getElementById('avatar-container');
      const searchContainer = document.getElementById('search-container');
      const notificationContainer = document.getElementById(
        'notification-container',
      );

      if (avatarMenuContainer.contains(event.target)) {
        setIsShowMenu((prev) => !prev);
      } else {
        setIsShowMenu(false);
      }

      if (notificationContainer.contains(event.target)) {
        setIsShowNotification((prev) => !prev);
      } else {
        setIsShowNotification(false);
      }

      if (!searchContainer.contains(event.target)) {
        setIsSearch(false);
      }
    }
    return (function outSideClickDetect() {
      document.addEventListener('mouseup', handlerEvent);

      return () => document.removeEventListener('mouseup', handlerEvent);
    })();
  }, []);

  const hoverAnimation = {
    whileHover: {
      color: 'lightblue',
      scale: 1.5,
      cursor: 'pointer',
      transition: { duration: 0.2 },
    },
    whileTap: {
      color: 'lightblue',
      scale: 3,
      cursor: 'pointer',
      transition: { duration: 0.2 },
    },
  };
  return (
    <header className="bg-white z-[10] w-[90%] mx-auto h-[70px] flex gap-x-5 items-center justify-between border-b border-solid border-slate-400 text-sm text-gray-600">
      <div className="flex justify-between gap-x-2 relative w-1/3 after:absolute after:w-[2px] after:h-[100%] after:bg-slate-200 after:top-[-50%] after:right-[-10px]  after:translate-y-[50%]">
        <Animation animationCreator={fallAnimate}>
          <div>Logo</div>
        </Animation>
        <span>Enjoy your moment</span>
      </div>
      <NavBar />
      <div className="w-1/6 flex text-[14px] items-center justify-between relative">
        {/* Search section */}
        <div id="search-container">
          <motion.div
            {...hoverAnimation}
            onClick={() => setIsSearch((prev) => !prev)}
          >
            <SearchOutlinedIcon sx={{ fontSize: 22 }} />
          </motion.div>
          <SearchHeader isSearch={isSearch} />
        </div>

        {/* Notify section */}
        <div className="relative" id="notification-container">
          <motion.div {...hoverAnimation}>
            <NotificationsOutlinedIcon sx={{ fontSize: 22 }} />
          </motion.div>
          <NotificationList isShow={isShowNotification} />
        </div>

        {/* Avatar section */}
        <Animation animationCreator={fallAnimate}>
          <div
            id="avatar-container"
            className="relative cursor-pointer w-8 h-8 rounded-full border-2 border-slate-900"
          >
            <img
              className="w-full h-full object-cover object-center rounded-full border-solid border-2 border-white"
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
