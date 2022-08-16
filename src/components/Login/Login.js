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

        if (email !== '' || password !== '') {
            authService
                .login(email, password)
                .then((authData) => {
                    if (authData.code !== 403) {
                        userLogin(authData);
                        navigate("/");
                    } else {
                        alert("Email and password don't match.")
                        return;
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            alert("Don't leave an empty field.")
            return;
        }
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
                        <span>
                            If you don't have profile click <Link to="/register">here</Link>
                        </span>
                    </p>
                </fieldset>
            </form>
        </section>
    );
};

export default Login;
