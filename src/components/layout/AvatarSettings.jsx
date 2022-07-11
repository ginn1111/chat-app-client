import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UilUserCircle,
  UilUserExclamation,
  UilComment,
  UilSignout,
} from '@iconscout/react-unicons';
import AvatarSettingItem from './AvatarSettingItem';

const AvatarSettings = ({ isShowMenu }) => {
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
            <AvatarSettingItem
              icon={<UilSignout />}
              title="Sign out"
              url="/sign-out"
            />
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AvatarSettings;
