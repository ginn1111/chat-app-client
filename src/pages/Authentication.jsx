import { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { ChatIcon } from '@components/common/icons';
import { bgLogin } from '@constants';
import BoxesLoading from '@components/ui/loading/BoxesLoading';
import { accessTokenSelector } from '@app/selectors';

const Authentication = () => {
  const accessToken = useSelector(accessTokenSelector);
  if (accessToken) {
    return <Navigate to="/" replace />;
  }
  return (
    <section className="grid grid-cols-12 bg-primary min-h-screen">
      <div className="col-span-4 p-48 flex flex-col justify-between h-screen">
        <div className="flex items-center gap-12 text-white">
          <ChatIcon size="28" className="text-white" />
          <h1 className="text-28 font-black m-0">Echat</h1>
        </div>
        <div className="w-[50vw] relative z-1 max-h-[600px]">
          <img
            className="block w-full h-full object-contain"
            src={bgLogin}
            alt="background of login screen"
          />
        </div>
      </div>
      <div className="col-span-8 bg-white p-24 m-24 rounded-md flex flex-col items-center justify-center h-[calc(100%_-_48px)]">
        <Suspense fallback={<BoxesLoading />}>
          <Outlet />
        </Suspense>
      </div>
    </section>
  );
};
export default Authentication;
