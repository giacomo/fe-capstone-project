import Header from "../components/Header/Header";
import Main from "../components/Main/Main";
import Footer from "../components/Footer/Footer";

import './HomePage.css';
import Hero from "../components/Hero/Hero";

function HomePage() {
    return (
        <>
            <Header />
            <Main>
                <Hero />
                <section className="specials">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-md-8">
                                <h3>This Weeks specials!</h3>
                            </div>
                            <div className="col-12 col-md-4">
                                <button className="btn btn-primary">Online Menu</button>
                            </div>
                        </div>
                    </div>
                </section>
            </Main>
            <Footer />
        </>
    );
}

export default HomePage;