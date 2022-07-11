import React from 'react';
import { UilPaperclip, UilMessage, UilSmile } from '@iconscout/react-unicons';

const Send = () => {
  return (
    <div className="w-full mt-auto bg-white rounded-md bottom-0 border border-slate-400 flex py-1 px-2 text-[14px]">
      <input
        placeholder="Write a message..."
        type="text"
        className="w-full border-none outline-none text-slate-600"
      />
      <div className="flex gap-x-2 text-slate-400 text-[16px] items-center">
        <UilPaperclip className="cursor-pointer" />
        <UilSmile className="cursor-pointer" />
        <div className="w-max h-max p-1 rounded-[8px] bg-blue-300 cursor-pointer">
          <UilMessage size="20" color="white" className="" />
        </div>
      </div>
    </div>
  );
};

export default Send;
