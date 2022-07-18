import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import NotificationItem from './NotificationItem';
import Avatar from '../../../assets/img/avatar2.jpeg';

const NotificationList = ({ isShow, notifications }) => {
  return (
    <AnimatePresence>
      {isShow && (
        <motion.div
          id="notification-panel"
          className="z-50 absolute top-[150%] right-[-180%] bg-white shadow-lg w-auto h-max px-2 py-1 rounded-md"
          initial={{ opacity: 0, scale: 0, originX: 'center', originY: '0' }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          exit={{ opacity: 0, scale: 0 }}
        >
          <ul className="max-w-[300px] w-max h-max  gap-y-1 flex flex-col pb-1">
            {notifications?.length === 0 && (
              <span className="inline-block">You don't have any notify</span>
            )}
            {notifications?.map((notification) => {
              return (
                <NotificationItem
                  key={notification._id}
                  avatar={notification.senderAvatar}
                  name={notification.senderName}
                  message={notification.notify}
                  isRead={notification.isResponse}
                  friendId={notification.senderId}
                  notificationId={notification._id}
                />
              );
            })}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationList;
