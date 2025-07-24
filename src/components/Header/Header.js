import Nav from "../Nav/Nav";
import logo from "../../assets/logo.svg";

function Header() {
  return (
    <header>
        <img src={logo} alt="Little Lemon Logo" />
        <Nav />
      </header>
  );
}

export default Header;