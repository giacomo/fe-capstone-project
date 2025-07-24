import {NavLink} from "react-router";

function Nav({ isMenuOpen }) {
  const menuClass = isMenuOpen ? 'nav-open' : '';
  
  return (
    <nav className={menuClass}>
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><a href="/about">About</a></li>
        <li><a href="/menu">Menu</a></li>
        <li><NavLink to="/reservations">Reservations</NavLink></li>
        <li><a href="/order-online">Order Online</a></li>
        <li><a href="/login">Login</a></li>
      </ul>
    </nav>
  );
}

export default Nav;
