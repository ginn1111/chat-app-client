import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';

import { getConversationList, getUser } from '../../../store/selectors';
import AvatarSettingItem, { Item } from './AvatarSettingItem';
import { logout } from '../../../store/authen-slice';
import {
  UilUserCircle,
  UilUserExclamation,
  UilComment,
  UilSignout,
} from '@iconscout/react-unicons';
import getSocketIO, { socketDisconnect } from '../../../services/socketIO';

const AvatarSettings = ({ isShowMenu }) => {
  const { id: userId } = useSelector(getUser);
  const dispatch = useDispatch();
  const conversationList = useSelector(getConversationList);
  const conversationIdList = useMemo(
    () => conversationList?.map((con) => con._id),
    [conversationList],
  );

  function logoutHandler() {
    socketDisconnect({ conversationIdList, userId }, getSocketIO());
    dispatch(logout(userId));
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
            <div onClick={logoutHandler}>
              <Item title="Logout" icon={<UilSignout />} />
            </div>
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AvatarSettings;
