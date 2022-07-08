import React from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const Search = ({ placeholder }) => {
  return (
    <div className="bg-white flex items-center w-36 h-max py-1 px-2  rounded-full border border-state-900">
      <SearchOutlinedIcon sx={{ fontSize: 20, color: 'gray' }} />
      <input
        placeholder={placeholder}
        onClick={(e) => e.stopPropagation()}
        type="search"
        className="bg-transparent w-full border-none outline-none px-1"
      />
    </div>
  );
};

export default Search;
