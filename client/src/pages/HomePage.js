import React from "react";
import "C:\\Github Projects\\TW Proiect\\Bakery-WebApp\\client\\src\\styles\\HomePage.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 5,
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    },
};
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
                        Cristian family, our bakery stands as a testament to the
                        timeless allure of homemade goodness...
                        <em>
                            Here, each product tells a story of love, care, and
                            the joy of sharing.
                        </em>
                    </p>
                </section>

                <section className="feature text-center my-5">
                    <h2>Featured Products</h2>
                    <Carousel
                        responsive={responsive}
                        autoPlay={true}
                        autoPlaySpeed={5000}
                        infinite={true}
                    >
                        <div>
                            <img
                                src="https://via.placeholder.com/600x400"
                                alt="Product 1"
                                className="img-fluid"
                            />
                        </div>
                        <div>
                            <img
                                src="https://via.placeholder.com/600x400"
                                alt="Product 2"
                                className="img-fluid"
                            />
                        </div>
                        <div>
                            <img
                                src="https://via.placeholder.com/600x400"
                                alt="Product 3"
                                className="img-fluid"
                            />
                        </div>
                        <div>
                            <img
                                src="https://via.placeholder.com/600x400"
                                alt="Product 4"
                                className="img-fluid"
                            />
                        </div>
                        <div>
                            <img
                                src="https://via.placeholder.com/600x400"
                                alt="Product 5"
                                className="img-fluid"
                            />
                        </div>
                    </Carousel>
                    <p>
                        Discover our freshly baked, irresistible pastries and
                        breads, made with love.
                    </p>
                </section>

                <section className="testimonials text-center my-5">
                    <h2>What Our Customers Say</h2>
                    <p>
                        "Never tasted anything quite like the pastries from
                        Christian Bakery. They always have something new and
                        exciting to try!"
                    </p>
                </section>
            </main>
        </div>
    );
};

export default HomePage;
