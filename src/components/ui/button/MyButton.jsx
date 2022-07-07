import React from 'react';

const MyButton = ({ title, bgColor, textColor, width }) => {
  console.log(width);
  return (
    <button
      className={`${bgColor} ${textColor} ${width} rounded-[25px] px-3 py-2 text-[16px] font-[400] tracking-wide`}
    >
      {title}
    </button>
  );
};

export default MyButton;
