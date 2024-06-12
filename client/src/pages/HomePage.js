import React from "react";
import "../styles/HomePage.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { CONSTANTS } from "../components/Constants";
const HomePage = () => {
    return (
        <div className="container-home">
            <header className="text-center my-5">
                <div className="title"></div>
            </header>
            <main>
                <section className="about text-center my-5">
                    <h2>About Us</h2>
                    <p>
                        Nestled in the heart of Bucharest since 2002,{" "}
                        <strong>Cristian's Bakery</strong> has been a beacon of
                        culinary delight... Born from the passion of the
                        Cristian's family, our bakery stands as a testament to
                        the timeless allure of homemade goodness...
                        <em>
                            Here, each product tells a story of love, care, and
                            the joy of sharing.
                        </em>
                    </p>
                </section>

                <section className="feature text-center my-5">
                    <h2>Featured Products</h2>
                    <Carousel
                        responsive={CONSTANTS.RESPONSIVE}
                        autoPlay={true}
                        autoPlaySpeed={5000}
                        infinite={true}
                    >
                        <div>
                            <img
                                src={CONSTANTS.IMAGES.briosa}
                                alt="Briosa"
                                className="img-fluid"
                            />
                        </div>
                        <div>
                            <img
                                src={CONSTANTS.IMAGES.cinnamonRolls}
                                alt="cinnamonRolls"
                                className="img-fluid"
                            />
                        </div>
                        <div>
                            <img
                                src={CONSTANTS.IMAGES.croissant}
                                alt="croissant"
                                className="img-fluid"
                            />
                        </div>
                        <div>
                            <img
                                src={CONSTANTS.IMAGES.macarons}
                                alt="macarons"
                                className="img-fluid"
                            />
                        </div>
                        <div>
                            <img
                                src={CONSTANTS.IMAGES.tartaFructe}
                                alt="tartaFructe"
                                className="img-fluid"
                            />
                        </div>
                        <div>
                            <img
                                src={CONSTANTS.IMAGES.painAuChocolat}
                                alt="painAuChocolat"
                                className="img-fluid"
                            />
                        </div>
                    </Carousel>
                    <p>
                        <strong>
                            Discover our freshly baked, irresistible pastries
                            and breads, made with love.
                        </strong>
                    </p>
                </section>

                <section className="testimonials text-center my-5">
                    <h2>What Our Customers Say</h2>
                    <p>
                        "Never tasted anything quite like the pastries from
                        Cristian Bakery. They always have something new and
                        exciting to try!"
                    </p>
                </section>
            </main>
        </div>
    );
};

export default HomePage;
