import { ChevronDownIcon, SearchIcon } from '@components/common/icons';

const Search = ({ placeholder, bgColor, onSearch, onFocus }) => {
  function changeHandler(e) {
    onSearch(e);
  }
  function focusHandler() {
    onFocus?.();
  }

  return (
    <div className="py-20 px-20 bg-white flex items-center text-gray-500 rounded-[6px]">
      <SearchIcon
        size={20}
        className="mr-8 "
      />
      <input
        className="flex-1"
        onFocus={focusHandler}
        onChange={changeHandler}
        placeholder={placeholder}
        type="text"
      />
      <div className="flex items-center gap-8 ml-8">
        <p>Messages</p>
        <ChevronDownIcon size={20} />
      </div>
    </div>
  );
};

export default Search;
