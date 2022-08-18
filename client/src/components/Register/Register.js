import { useNavigate, Link } from "react-router-dom";

import * as authService from "../../services/authService";
import { withAuth } from "../../contexts/AuthContext";

const Register = ({ auth }) => {
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
        } else if (email == "" || password == "") {
            alert("Don't leave empty fields.");
            return;
        }

        authService.register(email, password).then((authData) => {
            auth.userLogin(authData);
            navigate("/");
        });
    };

    return (
        <section id="registerPage" className="content auth">
            <div className="section-title">
                <h4 className="m-0 text-uppercase font-weight-bold">Register</h4>
            </div>
            <form align="center" onSubmit={onSubmit}>
                <div className="label">Username</div>
                <input
                    id="email"
                    name="email"
                    type="text"
                    placeholder="Username"
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

const RegisterWithAuth = withAuth(Register);

export default RegisterWithAuth;
