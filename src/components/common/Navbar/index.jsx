import { useRef } from 'react';
import clsx from 'clsx';
import { ChevronDownIcon } from '@components/common/icons';
import NavbarItem from './NavbarItem';
import { NAV_ITEMS } from '@constants';
import useIndicator from './useIndicator';

const Avatar = ({ className }) => {
  return (
    <div className={clsx('w-96 h-96 p-12 mx-auto mt-40', className)}>
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
    <div className="px-20 flex items-center gap-40 justify-center">
      <h3 className="max-w-50% text-20 font-medium text-gray-800 line-clamp-1">
        Gin
      </h3>
      <ChevronDownIcon
        className="text-black"
        size={20}
      />
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
      <nav className="flex flex-col navbar h-full">
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
