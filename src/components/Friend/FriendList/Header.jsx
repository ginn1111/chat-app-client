import Search from '@components/ui/search/Search';
import Fade from '@components/common/Effect/Fade';

const Header = ({ onSearch, isLoading }) => {
  return (
    <>
      <p className="font-bold text-20 bg-gradient-to-br from-blue-300 to-primary bg-clip-text text-transparent drop-shadow-md shadow-primary/50">
        Find new friend!
      </p>
      <div className="text mt-12 rounded flex items-center bg-white">
        <Search
          onSearch={onSearch}
          placeholder="Search"
          className="flex-1 pl-20 pr-0 mr-20"
        />
        <Fade show={isLoading} className="mr-20" as="div">
          <div className="animate-spin h-20 w-20 border-4 border-t-primary/50 rounded-cir" />
        </Fade>
      </div>
    </>
  );
};

export default Header;
