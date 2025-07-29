import Nav from "../Nav/Nav";
import logo from "../../assets/logo.svg";
import { useState } from "react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header style={{backgroundColor: 'white', color: '#495E57'}}>
      <div className="container">
        <div className="row">
          <div className="col-6 col-md-2">
            <img src={logo} alt="Little Lemon Logo" className="header-logo" />
          </div>
          <div className="col-6 col-md-10">
            <button 
              className="hamburger-menu"
              onClick={toggleMenu}
              aria-label="Toggle navigation menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
            <Nav isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
