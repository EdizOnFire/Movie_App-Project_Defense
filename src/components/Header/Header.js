import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";
import * as authService from "../../services/authService";

const Header = () => {
    const { user, userLogout } = useContext(AuthContext);
    const navigate = useNavigate();

    const onLogout = (e) => {
        e.preventDefault();

        authService
            .logout(user.accessToken)
            .then(() => {
                navigate("/");
                userLogout();
            })
            .catch(() => {
                navigate("/");
            });
    };

    return (
        <header>
            <nav>
                <img src="./images/movie-trans.png"></img>
                <Link to="/">Home</Link>
                <ul>
                    <Link to="/catalog">Catalog</Link>
                    {user.email ? (
                        <li>
                            <Link to="/create">Create Movie</Link>
                            <Link to="" onClick={onLogout}>
                                Logout
                            </Link>
                        </li>
                    ) : (
                        <li>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
