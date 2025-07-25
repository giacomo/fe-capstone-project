import Main from "../components/Main/Main";

import './HomePage.css';
import Hero from "../components/Hero/Hero";
import Specials from "../components/Specials/Specials";
import Testimonials from "../components/Testimonials/Testimonials";
import About from "../components/About/About";

function HomePage() {
    return (
        <Main>
            <Hero />
            <Specials />
            <Testimonials />
            <About />
        </Main>
    );
}

export default HomePage;