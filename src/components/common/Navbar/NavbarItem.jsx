import { forwardRef } from 'react';
import { NavLink } from 'react-router-dom';
import defaultTheme from 'tailwindcss/defaultTheme';

function NavbarItem({ to, title, icon, onClick }, ref) {
  return (
    <li
      onClick={onClick}
      ref={ref}
    >
      <NavLink
        to={to}
        style={({ isActive }) =>
          isActive ? { color: defaultTheme.colors.primary } : {}
        }
        className="nav-item hover:text-primary"
      >
        {icon}
        <p className="nav-item-text">{title}</p>
      </NavLink>
    </li>
  );
}

export default forwardRef(NavbarItem);
