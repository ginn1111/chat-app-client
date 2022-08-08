import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { hasLoading } from '../../store/selectors';
import ProcessBar from '../ui/loading/ProcessBar';

const Authentication = () => {
  const isLoading = useSelector(hasLoading);
  return (
    <>
      <ProcessBar isShow={isLoading} />
      <div className=" flex items-center w-full h-screen relative  bg-[url('../assets/img/background.jpg')] overflow-hidden justify-center ">
        <div className="w-full h-full bg-gradient-to-tr from-slate-900 to-[#4b5563de]">
          <Outlet />
        </div>
      </div>
    </>
  );
};
export default Authentication;
