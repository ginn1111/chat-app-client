import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const Backdrop = ({ onClose, isShow }) => {
  return <AnimatePresence>
    {isShow && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2, backgroundColor: '#000000' }}
        transition={{ duration: 0.5 }}
        className="fixed w-screen h-[calc(100vh_+_70px)] z-[99] mt-[-70px]"
        exit={{ opacity: 0 }}
        onClick={onClose}
      ></motion.div>
    )}
  </AnimatePresence>;
};

export default Backdrop;
