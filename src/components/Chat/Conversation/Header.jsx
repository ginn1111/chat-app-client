import useUI from '../../../hooks/useUI';
import { useSelector } from 'react-redux';
import { getConversationsStatus, isGroup } from '../../../store/selectors';
import GroupAvatar from '../GroupAvatar';
import InfoIcon from '@mui/icons-material/Info';
import { CircularProgress } from '@mui/material';
import MenuIcon from '../../ui/MenuIcon';
import { SettingIcon, AttachIcon } from '@components/common/icons';

const HeaderControl = ({ icon }) => {
  return (
    <button className="hover:bg-primary hover:text-white transition-colors text-gray-400 p-12 w-48 h-48 bg-white rounded-cir shadow-[0_5px_25px_0_#2A8BF212] flex items-center justify-center">
      {icon}
    </button>
  );
};

const Header = ({ avatar, name }) => {
  const isGroupTab = useSelector(isGroup);
  const status = useSelector(getConversationsStatus);
  const {
    onToggleConversationList,
    sizeWindow,
    showConversationList,
    isShowInfor,
    onToggleConverInfor,
  } = useUI();

  const menuIconClickHandler = () => {
    onToggleConversationList();
  };

  return (
    <header className="flex items-center justify-between px-28 py-16 bg-white rounded-[6px_6px_0_0] border-b border-solid border-gray-200">
      <section className="flex items-center gap-20">
        <article className="w-56 h-56">
          <img
            src="https://www.figma.com/file/cXZUlJRHi5JhnrgLdZZfvK/image/25daf6b6c9cfce0b73cb0788f056ca80336c3df5?fuid=1056603901594338444"
            alt="Avatar chat"
            className="block h-full w-full object-cover object-center rounded-cir"
          />
        </article>
        <article>
          <h4 className="text-[18px] font-bold">Name for test</h4>
          <p className="text-16 text-primary">1 day ago</p>
        </article>
      </section>
      <section className="flex gap-20 items-center">
        <HeaderControl icon={<AttachIcon />} />
        <HeaderControl icon={<SettingIcon />} />
      </section>
    </header>
  );
};

export default Header;
