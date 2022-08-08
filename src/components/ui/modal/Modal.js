import React from 'react';
import {AnimatePresence, motion} from 'framer-motion';

const Modal = ({ children, isShow }) => {
  return (
    <AnimatePresence>
      {isShow && (
        <motion.div
          initial={{ y: '-200vh', x: '-50%' }}
          whileInView={{ y: '-50%', x: '-50%' }}
          animate={{ y: '-40%' }}
          exit={{ y: '-150vh' }}
          transition={{ stiffness: 200, damping: 15, type: 'spring' }}
          className="fixed top-[50%] left-[50%] w-[50%] lg:w-[30%] xl:w-[30%] z-[100]"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
