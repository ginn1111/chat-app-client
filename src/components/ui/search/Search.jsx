import cx from 'clsx';
import { SearchIcon } from '@components/common/icons';
import { debounce } from '@utils/helper';

const Search = ({ placeholder, onSearch, onFocus, className }) => {
  function changeHandler(e) {
    onSearch(e.target.value);
  }
  function focusHandler() {
    onFocus?.();
  }

  return (
    <div
      className={cx(
        'px-20 bg-white flex items-center text-gray-500 rounded-[6px] gap-8 box-border',
        className
      )}
    >
      <SearchIcon size={20} className="flex-shink-0" />
      <input
        className="flex-1 py-20 block w-full"
        onFocus={focusHandler}
        onChange={debounce(changeHandler, 300)}
        placeholder={placeholder}
        type="text"
      />
    </div>
  );
};

export default Search;
