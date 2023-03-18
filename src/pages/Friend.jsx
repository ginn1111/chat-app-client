import { Outlet } from 'react-router-dom';
import FriendList from '@components/Friend/FriendList';
import { Suspense } from 'react';
import BoxesLoading from '@components/ui/loading/BoxesLoading';

const Friend = () => {
  return (
    <>
      <div className="col-span-4 h-full flex flex-col overflow-hidden">
        <FriendList />
      </div>
      <div className="col-span-8 h-full flex flex-col overflow-hidden">
        <Suspense fallback={<BoxesLoading />}>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
};

export default Friend;
