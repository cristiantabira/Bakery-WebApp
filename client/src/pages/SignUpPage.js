import Modal from "react-modal";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "C:\\Github Projects\\TW Proiect\\Bakery-WebApp\\client\\src\\styles\\SignUpPage.css";

Modal.setAppElement("#root");

const SignUp = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
    });
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setForm({
            ...form,
            [name]: value,
        });
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (form.password !== form.confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        try {
            const response = await axios.post(
                "http://localhost:5000/auth/signup",
                {
                    name: form.name,
                    email: form.email,
                    password: form.password,
                }
            );
            setModalIsOpen(true);
        } catch (error) {
            console.error("Signup failed:", error.response.data);
            alert("Failed to sign up: " + error.response.data);
        }
    };

    const closeModal = () => {
        setModalIsOpen(false);
        navigate("/login");
    };

    return (
        <div className="signup-container">
            <form onSubmit={handleSubmit} className="signup-form">
                <h2 className="text-center">Sign Up</h2>

                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Full Name"
                        name="name"
                        value={form.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder="********"
                        value={form.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="********"
                        value={form.confirmPassword}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary btn-block">
                    Sign Up
                </button>
                <div className="mt-5">
                    Have an account allready?
                    <br /> <Link to="/login">Log in</Link>
                </div>
            </form>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Signup Successful"
                className="Modal"
                overlayClassName="Overlay"
            >
                <h2>Registration Successful!</h2>
                <button onClick={closeModal}>OK</button>
            </Modal>
        </div>
    );
};
export default SignUp;
