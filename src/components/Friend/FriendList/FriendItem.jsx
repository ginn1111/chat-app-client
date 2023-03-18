import { Link } from 'react-router-dom';
import { PrimaryHover } from '@components/common/Effect/Hover';
import PATHS from '@constants/paths';
import { UserStatus } from '../hooks/useFriend';
import {
  UnFriendIcon,
  WarnIcon,
  AddFriendIcon,
} from '@components/common/icons';

const FriendItem = ({ id, nickname, avatar, biography, userStatus }) => {
  return (
    <PrimaryHover as="li" className="rounded-[6px] bg-white">
      <Link to={PATHS.FRIEND + id} className="block px-16 py-8">
        <div className="flex items-center gap-20">
          <article className="w-56 h-56 overflow-hidden rounded-cir">
            <img
              className="block w-full h-full object-cover object-fit"
              src={avatar}
              alt={`Avatar ${nickname}`}
            />
          </article>
          <h4 className="flex-1 truncate">{nickname}</h4>
          <div>
            {userStatus === UserStatus.Waitting && <WarnIcon />}
            {userStatus === UserStatus.Strange && <AddFriendIcon />}
            {userStatus === UserStatus.Unfriend && <UnFriendIcon />}
          </div>
        </div>
        <p className="text mt-20 line-clamp-2">{biography}</p>
      </Link>
    </PrimaryHover>
  );
};

export default FriendItem;
