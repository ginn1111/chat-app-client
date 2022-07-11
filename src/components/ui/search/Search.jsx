import React from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const Search = ({ placeholder, bgColor }) => {
  return (
    <div
      className={`flex items-center w-full min-w-36 h-max py-1 px-2 rounded-full ${bgColor} text-black text-[16px]`}
    >
      <SearchOutlinedIcon sx={{ fontSize: 20, color: 'gray' }} />
      <input
        placeholder={placeholder}
        onClick={(e) => e.stopPropagation()}
        type="search"
        className="bg-transparent w-full border-none outline-none px-1 placeholder:text-[14px]"
      />
    </div>
  );
};

export default Search;
