import "./About.css";
import marioAndAdrianA from "../../assets/mario_adrian_a.jpg";
import marioAndAdrianB from "../../assets/mario_adrian_b.jpg";

export default function About() {
    return (
        <section className="about" id="about">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="about-heading">
                            <h2 className="h1">Little Lemon</h2>
                            <h3>Chicago</h3>
                        </div>
                        <p>
                            Our Team in Chicago is dedicated to providing an exceptional dining experience, blending traditional Mediterranean flavors with a modern twist. We take pride in our fresh ingredients, warm atmosphere, and outstanding service.
                        </p>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="about-image-container">
                            <img src={marioAndAdrianA} alt="Mario and Adrian cooking" className="img-fluid rounded" />
                            <img src={marioAndAdrianB} alt="Mario and Adrian laughing" className="img-fluid rounded" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}