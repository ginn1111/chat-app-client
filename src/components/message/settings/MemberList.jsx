import React from 'react';
import Avatar from '../../../assets/img/avatar2.jpeg';
import MemberItem from './MemberItem';

const MemberList = () => {
  return (
    <>
      <span className=" text-[18px] text-end w-full block px-5">Members</span>
      <ul className="flex flex-col gap-y-0.5 w-full h-max overflow-auto pr-2">
        <MemberItem avatar={Avatar} name="Shin" linkProfile="/abc" />
        <MemberItem avatar={Avatar} name="Ned" linkProfile="/abc" />
        <MemberItem avatar={Avatar} name="Gin" linkProfile="/abc" />
      </ul>
    </>
  );
};

export default MemberList;
