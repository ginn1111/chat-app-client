import React from 'react';
import BiographyList from './BiographyList';
import { useSelector } from 'react-redux';
import { getUser } from '../../store/selectors';

const Biography = ({ dob, slogan, joinAt }) => {
  const user = useSelector(getUser);
  return (
    <div className=" w-full h-max text-[18px] flex flex-col">
      <h6 className="w-full block tracking-wider border-b text-sm font-bold border-solid border-b-slate-900">
        Biography
      </h6>
      <BiographyList dob={user.dob} slogan={user.slogan} joinAt={user.joinAt} />
    </div>
  );
};

export default Biography;
