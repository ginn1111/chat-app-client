import React from 'react';
import WallAvatar from '../../components/wall/WallAvatar';
import Biography from '../wall/Biography';
import Friend from '../wall/Friend';

const Wall = () => {
  return (
    <div className="format-page-size flex items-center flex-col">
      <WallAvatar />
      <section className="text-slate-600 mt-[100px] flex items-start gap-x-5 w-full h-max">
        <Biography />
        <Friend />
      </section>
    </div>
  );
};

export default Wall;
