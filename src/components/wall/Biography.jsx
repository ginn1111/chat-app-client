import React from 'react';
import BiographyItem from './BiographyItem';
import BiographyList from './BiographyList';

const Biography = () => {
  return (
    <div className=" w-full h-max text-[18px] flex flex-col">
      <h6 className="w-full block tracking-wider border-b text-sm font-bold border-solid border-b-slate-900">
        Biography
      </h6>
      <BiographyList />
    </div>
  );
};

export default Biography;
