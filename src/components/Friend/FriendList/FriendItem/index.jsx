import { Link } from 'react-router-dom';
import { PrimaryHover } from '@components/common/Effect/Hover';
import PATHS from '@constants/paths';
import ControlRequestFriend from './ControlRequestFriend';

const FriendItem = ({ id, nickname, avatar, biography, userStatus }) => {
  return (
    <PrimaryHover as="li" className="rounded-[6px] bg-white">
      <Link to={PATHS.FRIEND + id} className="block px-16 py-8">
        <div className="flex items-center gap-20">
          <div className="w-56 h-56">
            <img
              className="block w-full h-full object-cover object-fit ring-2 ring-white rounded-cir"
              src={avatar}
              alt={`Avatar ${nickname}`}
            />
          </div>
          <h4 className="flex-1 truncate">{nickname}</h4>
          <ControlRequestFriend userStatus={userStatus} id={id} />
        </div>
        <p className="text mt-20 line-clamp-2">{biography}</p>
      </Link>
    </PrimaryHover>
  );
};

export default FriendItem;
