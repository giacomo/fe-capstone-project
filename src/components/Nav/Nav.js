import {Link, NavLink} from "react-router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";

export default function Nav({ isMenuOpen, setIsMenuOpen }) {
  const menuClass = isMenuOpen ? 'nav-open' : '';

  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  return (
    <nav className={menuClass} data-testid="nav">
      <button className="btn btn-icon nav__close-btn" aria-label="Toggle navigation menu"
              onClick={() => closeMenu()}>
        <FontAwesomeIcon icon={faTimes} className="nav__toggle-icon" />
      </button>
      <ul>
        <li><NavLink to="/" onClick={() => closeMenu()}>Home</NavLink></li>
        <li><Link to="/#about" onClick={() => closeMenu()}>About</Link></li>
        <li><Link to="/#menu" onClick={() => closeMenu()}>Menu</Link></li>
        <li><NavLink to="/reservations" onClick={() => closeMenu()}>Reservations</NavLink></li>
        <li><NavLink to="/order-online" onClick={() => closeMenu()}>Order Online</NavLink></li>
        <li><NavLink to="/login" onClick={() => closeMenu()}>Login</NavLink></li>
      </ul>
    </nav>
  );
}
