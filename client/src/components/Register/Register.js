import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

import * as authService from "../../services/authService";

const Register = () => {
    const { userLogin } = useContext(AuthContext)
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const email = formData.get("email");
        const password = formData.get("password");
        const confirmPassword = formData.get("confirm-password");

        if (password !== confirmPassword) {
            alert("Passwords don't match.");
            return;
        }

        authService.register(email, password).then((authData) => {
            userLogin(authData);
            navigate("/");
        });
    };

    return (
        <section id="registerPage" className="content auth">
            <div className="section-title">
                <h4 className="m-0 text-uppercase font-weight-bold">Register</h4>
            </div>
            <form align="center" onSubmit={onSubmit}>
                <div className="label">Email</div>
                <input
                    id="email"
                    name="email"
                    type="text"
                    placeholder="Email"
                    required="required"
                />
                <div className="label">Password</div>
                <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    required="required"
                />
                <div className="label">Confirm Password</div>
                <input
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    placeholder="Confirm Password"
                    required="required"
                />
                <div>
                    <button
                        className="btn btn-primary font-weight-semi-bold px-4"
                        style={{ height: 50 }}
                        type="submit"
                    >
                        Register
                    </button>
                </div>
            </form>
            <p className="field">
                <span>
                    If you already have profile click <Link to="/login">here</Link>
                </span>
            </p>
        </section>
    );
};

export default Register;
