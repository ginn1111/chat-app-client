import Search from '@components/ui/search/Search';
import Fade from '@components/common/Effect/Fade';

const Header = ({ onSearch, isLoading }) => {
  return (
    <>
      <p className="font-bold text-20 bg-gradient-to-br from-blue-300 to-primary bg-clip-text text-transparent drop-shadow-md shadow-primary/50">
        Find new friend!
      </p>
      <div className="text-[14px] mt-12 rounded-[6px] flex items-center gap-20 bg-white">
        <Search onSearch={onSearch} placeholder="Search" />
        <Fade show={isLoading}>
          <div className="animate-spin h-20 w-20 border-4 border-t-primary/50 rounded-cir" />
        </Fade>
      </div>
    </>
  );
};

export default Header;
