import {
  HomeIcon,
  ProfileIcon,
  ChatNavItemIcon as ChatIcon,
  LogoutIcon,
} from '@components/common/icons';
import { PATHS } from '@/constants/routers';

const NAV_ITEMS = [
  { id: 0, title: 'Home', icon: <HomeIcon />, to: PATHS.LOGIN },
  { id: 1, title: 'Profile', icon: <ProfileIcon />, to: PATHS.PROFILE },
  { id: 2, title: 'Chat', icon: <ChatIcon />, to: PATHS.CHAT },
  { id: 3, title: 'Log out', icon: <LogoutIcon />, to: PATHS.LOGIN },
];

export default NAV_ITEMS;
