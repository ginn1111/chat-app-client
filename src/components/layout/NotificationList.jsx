import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import NotificationItem from './NotificationItem';
import Avatar from '../../assets/img/avatar2.jpeg';

const NotificationList = ({ isShow }) => {
  return (
    <AnimatePresence>
      {isShow && (
        <motion.div
          className="z-50 absolute top-[150%] right-[-180%] bg-white shadow-lg w-auto h-max px-2 py-1 rounded-md"
          initial={{ opacity: 0, scale: 0, originX: 'center', originY: '0' }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          exit={{ opacity: 0, scale: 0 }}
        >
          <ul className="max-w-[200px] w-max h-max">
            <NotificationItem
              avatar={Avatar}
              name="Gin"
              message="Hey! I am Gin!"
            />
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationList;
