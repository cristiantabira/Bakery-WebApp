import React from "react";
import {
    MDBFooter,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBCol,
    MDBRow,
    MDBBtn,
} from "mdb-react-ui-kit";

export default function App() {
    return (
        <MDBFooter className="text-center" color="black" bgColor="light">
            <MDBContainer className="p-4">
                <section className="mb-4">
                    <MDBBtn
                        outline
                        color="dark"
                        floating
                        className="m-1"
                        href="https://www.facebook.com/"
                        role="button"
                    >
                        <MDBIcon fab icon="facebook-f" />
                    </MDBBtn>

                    <MDBBtn
                        outline
                        color="dark"
                        floating
                        className="m-1"
                        href="https://www.instagram.com/"
                        target="new"
                        role="button"
                    >
                        <MDBIcon fab icon="instagram" />
                    </MDBBtn>

                    <MDBBtn
                        outline
                        color="dark"
                        floating
                        className="m-1"
                        href="https://www.tiktok.com/"
                        target="new"
                        role="button"
                    >
                        <MDBIcon fab icon="tiktok" />
                    </MDBBtn>

                    <MDBBtn
                        outline
                        color="dark"
                        floating
                        className="m-1"
                        href="https://maps.app.goo.gl/pSfZQukTGjzMXCwJA"
                        role="button"
                    >
                        <MDBIcon fab icon="google" />
                    </MDBBtn>
                </section>

                <section className="">
                    <form action="">
                        <MDBRow className="d-flex justify-content-center">
                            <MDBCol size="auto">
                                <p className="pt-2">
                                    <strong>Sign up for our newsletter</strong>
                                </p>
                            </MDBCol>

                            <MDBCol md="5" start>
                                <MDBInput
                                    contrast
                                    type="email"
                                    placeholder="Email address"
                                    className="mb-4"
                                />
                            </MDBCol>

                            <MDBCol size="auto">
                                <MDBBtn
                                    outline
                                    color="dark"
                                    type="submit"
                                    className="mb-4"
                                >
                                    Subscribe
                                </MDBBtn>
                            </MDBCol>
                        </MDBRow>
                    </form>
                </section>

                <section className="mb-4">
                    <p></p>
                </section>
            </MDBContainer>

            <div
                className="text-center p-3"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
            >
                © 2024 Copyright: &nbsp;
                <a
                    className="text-black"
                    href="https://anp.gov.ro/penitenciarul-bucuresti-jilava/"
                    target="new"
                >
                    Cristian's Bakery. All rights reserved.
                </a>
            </div>
        </MDBFooter>
    );
}
