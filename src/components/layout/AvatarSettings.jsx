import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const AvatarSettings = ({ isShowMenu }) => {
  return (
    <AnimatePresence>
      {isShowMenu && (
        <motion.div
          animate={{ opacity: 1, scale: [0.5, 1] }}
          exit={{ opacity: 0, scale: [1, 0.5] }}
          transition={{ duration: 0.2 }}
          className="z-[50] bg-white absolute top-[110%] right-[-50%] w-max p-2 h-ma rounded-md shadow-[0_10px_15px_-5px_#0000004a] arrow-menu"
        >
          <ul>
            <li>
              <Link
                to="/"
                className="hover:bg-blue-400 duration-200 hover:text-white px-2 py-1 rounded-sm font-[500]"
              >
                Information
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="hover:bg-blue-400 hover:text-white px-2 py-1 rounded-sm font-[500]"
              >
                Information
              </Link>
            </li>
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AvatarSettings;
