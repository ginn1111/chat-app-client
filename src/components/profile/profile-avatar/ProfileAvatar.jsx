import React from 'react';
import { motion } from 'framer-motion';
import Avatar from '../../../assets/img/avatar2.jpeg';
import {
  UilInfoCircle,
  UilKeyholeCircle,
  UilAt,
} from '@iconscout/react-unicons';

const ProfileAvatarMenuItem = ({ isChoose, title, icon }) => {
  const hoverAnimate = {
    transition: { duration: 0.2 },
    backgroundColor: '#60A5FA',
    color: 'white',
    x: 15,
  };
  return (
    <motion.li
      whileHover={hoverAnimate}
      whileInView={isChoose ? hoverAnimate : {}}
      className="bg-white shadow-lg rounded-md my-2 py-1 px-2  flex items-center gap-x-2 text-slate-600 cursor-pointer"
    >
      {icon}
      <span>{title}</span>
    </motion.li>
  );
};

const ProfileAvatarMenu = () => {
  return (
    <ul className="text-[16px] w-5/6 h-max mx-auto">
      <ProfileAvatarMenuItem
        icon={<UilInfoCircle style={{ color: 'currentColor' }} />}
        title="Information"
        isChoose
      />
      <ProfileAvatarMenuItem icon={<UilKeyholeCircle />} title="Security" />
      <ProfileAvatarMenuItem icon={<UilAt />} title="Contact" />
    </ul>
  );
};

const ProfileAvatar = () => {
  return (
    <section className="w-5/12 bg-blue-100 py-7 px-3 rounded-md h-[75vh] ml-[-30px]">
      <div className="bg-white w-5/6 h-[55%] text-center mx-auto rounded-md overflow-hidden shadow-lg">
        <motion.img
          whileHover={{
            transition: { duration: 0.5, type: 'tween' },
            width: '100%',
            height: '100%',
            borderRadius: ['50%', '0%'],
            marginBlock: 0,
          }}
          className="w-20 h-20 rounded-full object-center mx-auto mt-5 inline-block"
          src={Avatar}
          alt="avatar"
        />
        <span className="block py-2 text-slate-600 font-bold">Gin</span>
      </div>
      {/* <ProfileAvatarMenu /> */}
    </section>
  );
};

export default ProfileAvatar;
