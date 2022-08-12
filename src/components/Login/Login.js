import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";
import * as authService from "../../services/authService";

const Login = () => {
    const { userLogin } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();

        const {
            email,
            password,
        } = Object.fromEntries(new FormData(e.target));

        authService.login(email, password)
            .then(authData => {
                userLogin(authData);
                navigate('/');
            })
            .catch(() => {
                navigate('/404');
            });
    };

    return (
        <section id="loginPage">
            <form onSubmit={onSubmit}>
                <fieldset>
                    <>
                        <div>Login</div>
                        <label htmlFor="email" className="vhide">
                            Email
                        </label>
                        <input
                            id="email"
                            className="email"
                            name="email"
                            type="text"
                            placeholder="Email"
                        />
                        <label htmlFor="password" className="vhide">
                            Password
                        </label>
                        <input
                            id="password"
                            className="password"
                            name="password"
                            type="password"
                            placeholder="Password"
                        />
                        <button type="submit" className="login">
                            Login
                        </button>
                    </>

                    <p className="field">
                        <span>If you don't have profile click <Link to="/register">here</Link></span>
                    </p>
                </fieldset>
            </form>
        </section>
    );
}

export default Login;
