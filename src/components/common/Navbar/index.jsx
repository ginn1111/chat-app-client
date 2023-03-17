import { useRef } from 'react';
import clsx from 'clsx';
import { ChevronDownIcon } from '@components/common/icons';
import NavbarItem from './NavbarItem';
import { NAV_ITEMS } from '@constants';
import useIndicator from './useIndicator';

const Avatar = ({ className }) => {
  return (
    <div className={clsx('w-96 h-96 max-w-full p-12 mx-auto mt-40', className)}>
      <img
        className="w-full h-full block object-cover object-center rounded-cir"
        src="https://www.figma.com/file/cXZUlJRHi5JhnrgLdZZfvK/image/25daf6b6c9cfce0b73cb0788f056ca80336c3df5?fuid=1056603901594338444"
        alt="User avatar"
      />
    </div>
  );
};

const Information = () => {
  return (
    <div className="px-20 flex items-center justify-center">
      <div className="flex items-center gap-8 overflow-hidden">
        <h3 className="flex-1 text-20 font-medium text-gray-800 truncate">
          Ginn1111
        </h3>
        <ChevronDownIcon
          className="text-black"
          size={20}
        />
      </div>
    </div>
  );
};

const Navbar = () => {
  const indicatorRef = useRef();
  const liItemRef = useRef();
  const idxPath = useIndicator(indicatorRef, liItemRef);
  const indicatorMovingHandler = (event) => {
    indicatorRef.current.style.top = event.currentTarget.offsetTop + 'px';
    indicatorRef.current.style.height = event.currentTarget.clientHeight + 'px';
  };

  return (
    <>
      <nav className="flex flex-col navbar">
        <div className="text-center">
          <Avatar />
          <Information />
        </div>
        <ul className="h-full flex flex-col pl-20 gap-20 mt-auto relative">
          <div
            className="indicator"
            ref={indicatorRef}
          />
          {NAV_ITEMS.map(({ id, title, icon, to }, idx) => (
            <NavbarItem
              ref={idx === idxPath ? liItemRef : null}
              onClick={indicatorMovingHandler}
              key={id}
              title={title}
              icon={icon}
              to={to}
            />
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
