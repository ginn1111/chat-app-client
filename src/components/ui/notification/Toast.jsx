import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UilTimesSquare } from '@iconscout/react-unicons';

const Toast = ({ type, message, onRemove, top }) => {
  useEffect(() => {
    const idTimer = setTimeout(() => {
      onRemove();
    }, 3500);

    return () => clearTimeout(idTimer);
  }, []);

  const color = type === 'error' ? 'bg-rose-600' : 'bg-green-400';
  return (
    <AnimatePresence>
      <motion.div
        initial={{
          position: 'fixed',
          top: `${top ?? '50px'}`,
          x: 1000,
          right: 0,
        }}
        transition={{ stiffness: 50, type: 'spring' }}
        animate={{ x: -50 }}
        exit={{ x: 1000 }}
        className={`toast ${color}`}
      >
        <span className="text-[14px] text-white">{message}</span>
        <div className="cursor-pointer px-1" onClick={onRemove}>
          <UilTimesSquare color="white" size="20" />
        </div>
        <motion.div
          initial={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '3px',
          }}
          animate={{ width: '0%' }}
          transition={{ duration: 3, delay: 0.5 }}
          className=" bg-blue-400"
        ></motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Toast;
