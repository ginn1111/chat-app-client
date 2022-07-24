import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  UilTimesSquare,
  UilCheckCircle,
  UilExclamationTriangle,
} from '@iconscout/react-unicons';

const Toast = ({ type, message, onRemove, top }) => {
  useEffect(() => {
    const idTimer = setTimeout(() => {
      onRemove();
    }, 3500);
    return () => clearTimeout(idTimer);
  }, []);

  const typeToast =
    type === 'error'
      ? {
        bg: 'bg-red-500',
        icon: <UilExclamationTriangle color="white" size="22" />,
      }
      : {
        bg: 'bg-green-500',
        icon: <UilCheckCircle color="white" size="22" />,
      };
  return (
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
      className={`toast ${typeToast.bg}`}
    >
      {typeToast.icon}
      <span className="text-[15px] text-white">{message}</span>
      <div className="cursor-pointer px-1 " onClick={onRemove}>
        <UilTimesSquare color="white" />
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
        className="bg-sky-500"
      ></motion.div>
    </motion.div>
  );
};

export default Toast;
