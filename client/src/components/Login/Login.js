import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";
import * as authService from "../../services/authService";

const Login = () => {
    const { userLogin } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();

        const { email, password } = Object.fromEntries(new FormData(e.target));

        authService
            .login(email, password)
            .then((authData) => {
                if (authData.code !== 403) {
                    userLogin(authData);
                    navigate("/");
                } else {
                    alert("Email and password don't match.");
                    return;
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <section id="loginPage">
            <div className="section-title">
                <h4 className="m-0 text-uppercase font-weight-bold">Login</h4>
            </div>
            <form align="center" onSubmit={onSubmit} className="login">
                <div className="label">Username</div>
                <input
                    id="email"
                    name="email"
                    type="text"
                    className="login"
                    placeholder="Username"
                    required="required"
                />
                <div className="label">Password</div>
                <input
                    id="password"
                    name="password"
                    type="password"
                    className="login"
                    placeholder="Password"
                    required="required"
                />
                <div>
                    <button
                        className="btn btn-primary font-weight-semi-bold px-4"
                        style={{ height: 50 }}
                        type="submit"
                    >
                        Login
                    </button>
                </div>
            </form>
            <p className="field">
                <span>
                    If you don't have a profile click <Link to="/register">here</Link>
                </span>
            </p>
        </section>
    );
};

export default Login;
