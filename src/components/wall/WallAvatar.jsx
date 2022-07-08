import React from 'react';
import { motion } from 'framer-motion';
import Avatar from '../../assets/img/avatar2.jpeg';
import ControlCameraOutlinedIcon from '@mui/icons-material/ControlCameraOutlined';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';

const WallAvatar = () => {
  return (
    <section className="w-5/6 relative rounded-b-lg bg-[url('../assets/img/background.jpg')] bg-top-center pt-[25%]">
      <div className="w-[120px] h-max rounded-full border-2 border-blue-600 bottom-0 absolute-x-center translate-y-[50%] overflow-hidden">
        <img
          src={Avatar}
          alt="avatar"
          className="w-full h-full rounded-full object-cover object-center border-2 border-white border-solid"
        />
        <motion.div
          whileHover={{
            backgroundColor: '#0000004a',
            color: '#fff',
            transition: { duration: 0.5 },
          }}
          className="cursor-pointer absolute-x-center bottom-0 text-transparent flex py-1 justify-center bg-transparent w-full h-1/2"
        >
          <motion.div
            whileHover={{
              transformOrigin: 'center',
              rotate: [0, 180],
              transition: { duration: 0.5 },
            }}
          >
            <label htmlFor="change-bg" className="cursor-pointer">
              <ControlCameraOutlinedIcon style={{ color: 'currentColor' }} />
            </label>
          </motion.div>
        </motion.div>
      </div>
      <motion.div
        className="flex cursor-pointer items-center absolute w-max overflow-hidden px-2 right-2 bottom-2 bg-white rounded-md "
        whileHover={{
          transition: { duration: 0.4 },
          backgroundColo: 'lightblue',
        }}
      >
        <label
          htmlFor="change-bg"
          className=" text-slate-500 flex items-center cursor-pointer py-1.5 text-[14px] font-bold  gap-x-1.5"
        >
          <CameraAltOutlinedIcon sx={{ fontSize: 23 }} />
        </label>
        <input
          type="file"
          id="change-bg"
          className="hidden outline-none border-none"
        />
      </motion.div>
    </section>
  );
};

export default WallAvatar;
