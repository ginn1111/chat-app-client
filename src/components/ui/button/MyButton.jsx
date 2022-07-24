import React from 'react';
import { motion } from 'framer-motion';

const MyButton = ({ title, bgColor, textColor, width, onClick, type }) => {
  return (
    <motion.button
      className={`${bgColor} ${textColor} ${width} rounded-[25px] px-3 py-2 text-[16px] font-[500] tracking-wide`}
      whileHover={{
        scale: 1.1,
        opacity: 0.8,
      }}
      whileTap={{
        scale: 1.1,
      }}
      onClick={onClick}
      type={type ?? 'submit'}
    >
      {title}
    </motion.button>
  );
};

export default MyButton;
