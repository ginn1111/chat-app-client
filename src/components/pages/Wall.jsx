import React from 'react';
import WallAvatar from '../../components/wall/WallAvatar';
import CelebrationOutlinedIcon from '@mui/icons-material/CelebrationOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';

const Wall = () => {
  return (
    <div className="xl:w-[1280px] xl:mx-auto md:w-screen md:mx-[24px] flex mx-auto items-center flex-col">
      <WallAvatar />
      <section className="text-slate-600 mt-[100px] flex items-start gap-x-5 w-full h-max">
        <div className="w-full h-max text-[18px] flex flex-col">
          <h6 className="w-full block tracking-wider border-b text-sm font-bold border-solid border-b-slate-900">
            Biography
          </h6>
          <ul className="mt-6 w-full h-max">
            <li className="w-full h-max flex gap-x-2 items-center justify-between px-2 py-1">
              <span className="flex gap-x-2 items-center">
                <CelebrationOutlinedIcon sx={{ fontSize: 30 }} />
                Birth day
              </span>
              <p>13/09/2001</p>
            </li>
          </ul>
        </div>
        <div className="w-full h-max">
          <h6 className="w-full block border-b text-sm font-bold border-solid border-b-slate-900">
            Friends
          </h6>
        </div>
      </section>
    </div>
  );
};

export default Wall;
