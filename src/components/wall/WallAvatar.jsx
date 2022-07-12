import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { getUser } from '../../store/selectors';
import Avatar from '../../assets/img/avatar2.jpeg';
import ControlCameraOutlinedIcon from '@mui/icons-material/ControlCameraOutlined';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';

const WallAvatar = () => {
  const user = useSelector(getUser);
  return (
    <section
      className={`w-5/6 relative rounded-b-lg bg-[url('../assets/img/background.jpg')] bg-top-center pt-[25%]`}
    >
      {/*  will change --> user.coverPicture */}
      <div className="bottom-0 absolute-x-center translate-y-[50%] w-[120px] h-max">
        <div className=" rounded-full border-2 border-blue-600 relative overflow-hidden">
          <img
            src={Avatar} // will change --> user.avatar
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
              initial={{ y: 10 }}
              whileHover={{
                y: 0,
                transition: { duration: 0.5 },
              }}
            >
              <label htmlFor="change-bg" className="cursor-pointer">
                <ControlCameraOutlinedIcon style={{ color: 'currentColor' }} />
              </label>
            </motion.div>
          </motion.div>
        </div>
      </div>
      <div className="bg-white flex cursor-pointer items-center absolute w-max overflow-hidden px-2 right-2 bottom-2 rounded-md ">
        <motion.label
          whileHover={{
            transition: { duration: 0.4 },
            color: '#bfdbce',
          }}
          htmlFor="change-bg"
          className="text-slate-600 flex items-center cursor-pointer py-1.5 text-[14px] font-bold  gap-x-1.5"
        >
          <CameraAltOutlinedIcon sx={{ fontSize: 23 }} />
        </motion.label>
        <input
          type="file"
          id="change-bg"
          className="hidden outline-none border-none"
        />
      </div>
      <span className="text-[20px] w-full block text-slate-600 absolute-x-center bottom-[-100px] font-[500] text-center">
        {`${user.firstName} ${user.lastName}`}
      </span>
    </section>
  );
};

export default WallAvatar;
