import cx from 'clsx';
import UserStatus from '@constants/userStatus';

import {
  UnFriendIcon,
  WarnIcon,
  AddFriendIcon,
} from '@components/common/icons';
const RequestButton = ({
  onClick,
  children,
  className,
  type = UserStatus.Strange,
}) => {
  const status = {
    [UserStatus.Strange]: {
      className: 'text-green-400 bg-green-200',
      icon: <AddFriendIcon />,
    },
    [UserStatus.Unfriend]: {
      className: 'text-red-400 bg-red-200',
      icon: <UnFriendIcon />,
    },
    [UserStatus.Waitting]: {
      className: 'text-orange-400 bg-yellow-200',
      icon: <WarnIcon />,
    },
  };
  return (
    <button
      className={cx(
        'rounded-cir box-border shadow-md shadow-grayShadow hover:brightness-105 transition-all',
        status[type].className,
        className
      )}
      onClick={onClick}
      type="button"
    >
      <div className="border-[2px] border-white p-[6px] rounded-cir">
        {children || status[type].icon}
      </div>
    </button>
  );
};

export default RequestButton;
