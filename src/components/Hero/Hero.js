import './Hero.css';
import { Link } from "react-router";
import restaurantImg from "../../assets/restaurant.jpg";

export default function Hero() {
    return (
        <section className="hero bg-secondary">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="hero-heading">
                            <h1>Little Lemon</h1>
                            <h3>Chicago</h3>
                        </div>

                        <p>Welcome to Little Lemon, a charming restaurant in the heart of Chicago. We offer a delightful menu featuring a variety of dishes made with fresh, locally sourced ingredients. Whether you're here for a casual lunch or a special dinner, our warm and inviting atmosphere will make you feel right at home. Join us for a memorable dining experience that celebrates the flavors of the season.</p>
                        <Link to="/reservations" className="btn btn-primary mt-3">Reserve a table</Link>
                    </div>
                    <div className="col-12 col-md-6">
                        <img src={restaurantImg} alt="Restaurant" className="img-fluid rounded" />
                    </div>
                </div>
            </div>
        </section>
    );
}