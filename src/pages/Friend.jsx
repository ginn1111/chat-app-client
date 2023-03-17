import FriendInformation from '@components/Friend/FriendInformation';
import FriendList from '@components/wall/FriendList';

const Friend = () => {
  return (
    <>
      <div className="col-span-4 h-full flex flex-col overflow-hidden">
        <FriendList />
      </div>
      <div className="col-span-8 h-full flex flex-col overflow-hidden">
        <FriendInformation />
      </div>
    </>
  );
};

export default Friend;
