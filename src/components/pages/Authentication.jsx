import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { hasLoading } from '../../store/selectors';
import ProcessBar from '../ui/loading/ProcessBar';

const Authentication = () => {
  const isLoading = useSelector(hasLoading);
  return (
    <>
      <ProcessBar isShow={isLoading} />
      <div className="bg-primary h-full">
        <Outlet />
      </div>
    </>
  );
};
export default Authentication;
