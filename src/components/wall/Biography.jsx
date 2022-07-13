import { memo } from 'react';
import BiographyList from './BiographyList';

const Biography = ({ join, dob, slogan }) => {
  return (
    <div className=" w-full h-max text-[18px] flex flex-col">
      <h6 className="w-full block tracking-wider border-b text-sm font-bold border-solid border-b-slate-900">
        Biography
      </h6>
      <BiographyList dob={dob} slogan={slogan} joinAt={join} />
    </div>
  );
};

export default memo(Biography);
