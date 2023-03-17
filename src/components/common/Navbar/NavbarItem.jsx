import { forwardRef } from 'react';
import { NavLink } from 'react-router-dom';

function NavbarItem({ to, title, icon, onClick }, ref) {
  return (
    <li onClick={onClick} ref={ref}>
      <NavLink to={to} className="nav-item hover:text-primary">
        <span className="flex-shrink-0">{icon}</span>
        <p className="nav-item-text truncate">{title}</p>
      </NavLink>
    </li>
  );
}

export default forwardRef(NavbarItem);
