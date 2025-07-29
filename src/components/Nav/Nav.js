import {NavLink} from "react-router";

export default function Nav({ isMenuOpen }) {
  const menuClass = isMenuOpen ? 'nav-open' : '';
  
  return (
    <nav className={menuClass} data-testid="nav">
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/#about">About</NavLink></li>
        <li><NavLink to="/#menu">Menu</NavLink></li>
        <li><NavLink to="/reservations">Reservations</NavLink></li>
        <li><NavLink to="/order-online">Order Online</NavLink></li>
        <li><NavLink to="/login">Login</NavLink></li>
      </ul>
    </nav>
  );
}
