import {NavLink} from "react-router";
import {HashLink} from "react-router-hash-link";

function Nav({ isMenuOpen }) {
  const menuClass = isMenuOpen ? 'nav-open' : '';
  
  return (
    <nav className={menuClass}>
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><HashLink smooth to="/#about">About</HashLink></li>
        <li><HashLink smooth to="/#menu">Menu</HashLink></li>
        <li><NavLink to="/reservations">Reservations</NavLink></li>
        <li><NavLink to="/order-online">Order Online</NavLink></li>
        <li><NavLink to="/login">Login</NavLink></li>
      </ul>
    </nav>
  );
}

export default Nav;
