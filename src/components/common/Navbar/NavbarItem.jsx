import { forwardRef } from 'react';
import cx from 'clsx';
import { NavLink, useLocation } from 'react-router-dom';
import { regexPathCreator, getFirstSegmentPath } from '@utils/helper';

/*
 * to -> /friend/
 * location: dynamic route with /friend/:id
 * -> this will match
 */

function NavbarItem({ to, title, icon, onClick }, ref) {
  const location = useLocation();
  const isActive = regexPathCreator(to).test(
    getFirstSegmentPath(location.pathname)
  );
  return (
    <li onClick={onClick} ref={ref}>
      <NavLink
        to={to}
        className={cx('nav-item hover:text-primary', {
          'text-primary': isActive,
        })}
      >
        <span className="flex-shrink-0">{icon}</span>
        <p className="nav-item-text truncate">{title}</p>
      </NavLink>
    </li>
  );
}

export default forwardRef(NavbarItem);
