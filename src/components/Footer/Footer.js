import "./Footer.css";
import logoWhite from "../../assets/logo_white.png";

import {faFacebook, faTwitter, faInstagram} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router";
import {HashLink} from "react-router-hash-link";

export default function Footer() {
    return (
        <footer className="bg-secondary">
            <div className="container">
                <div className="row">
                    <div className="col-6 col-lg-3">
                        <img src={logoWhite} alt="Little Lemon Logo" className="footer-logo" />
                    </div>
                    <div className="col-6 col-lg-3">
                        <h5>Navigation</h5>
                        <ul className="list-unstyled footer-links">
                            <li><Link to="/">Home</Link></li>
                            <li><HashLink smooth to="/#about">About</HashLink></li>
                            <li><HashLink smooth to="/#menu">Menu</HashLink></li>
                            <li><Link to="/reservations">Reservations</Link></li>
                            <li><Link to="/order-online">Order Online</Link></li>
                            <li><Link to="/login">Login</Link></li>
                        </ul>
                    </div>
                    <div className="col-12 col-md-6 col-lg-3">
                        <h5>Contact Us</h5>
                        <address>
                            <div>
                                <strong>Email</strong> <a className="btn btn-small btn-link" href="mailto:littlelemon@llchicago.com">littlelemon@llchicago.com</a>
                            </div>
                            <div>
                                <strong>Phone</strong> <a className="btn btn-small btn-link" href="tel:+1234567890">(123) 456-7890</a>
                            </div>
                            <div>
                                <strong>Address</strong>
                                123 Little Lemon St<br />Chicago, IL 60601
                            </div>
                        </address>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-3">
                        <h5>Follow Us</h5>
                        <ul className="list-unstyled-inline">
                            <li className="me-3">
                                <a className="btn btn-small btn-link btn-icon" href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faFacebook}/>
                                </a>
                            </li>
                            <li className="me-3">
                                <a className="btn btn-small btn-link btn-icon" href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faTwitter}/>
                                </a>
                            </li>
                            <li>
                                <a className="btn btn-small btn-link btn-icon" href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faInstagram}/>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 text-center">
                        <p className="mt-3">
                            &copy; {new Date().getFullYear()} Little Lemon. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}