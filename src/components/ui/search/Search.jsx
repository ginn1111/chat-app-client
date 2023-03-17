import { ChevronDownIcon, SearchIcon } from '@components/common/icons';

const Search = ({ placeholder, onSearch, onFocus }) => {
  function changeHandler(e) {
    onSearch(e);
  }
  function focusHandler() {
    onFocus?.();
  }

  return (
    <div className="px-20 bg-white flex items-center text-gray-500 rounded-[6px] gap-8 box-border">
      <SearchIcon size={20} className="flex-shink-0" />
      <input
        className="flex-1 py-20 block w-full"
        onFocus={focusHandler}
        onChange={changeHandler}
        placeholder={placeholder}
        type="text"
      />
      <div className="flex items-center gap-8">
        <p>Messages</p>
        <ChevronDownIcon size={20} />
      </div>
    </div>
  );
};

export default Search;
