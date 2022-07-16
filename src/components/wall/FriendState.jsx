import React from 'react';
import { motion } from 'framer-motion';

const FriendState = ({ icon, title }) => {
  return (
    <motion.div className="bg-white hover:opacity-90 duration-300 rounded-md px-2 py-[8px] cursor-pointer text-slate-600 flex items-center text-[14px] font-[500] gap-x-2">
      {icon}
      {title}
    </motion.div>
  );
};

export default FriendState;
