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
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-2 py-lg-0 px-lg-5">
                <div className="navbar-nav mr-auto py-0">
                    <Link to="/" className="nav-item nav-link active">
                        Home
                    </Link>
                    <Link to="/catalog" className="nav-item nav-link">
                        Catalog
                    </Link>

                    {user.email && (
                        <Link to="/create" className="nav-item nav-link">
                            Create Movie
                        </Link>
                    )}
                    {user.email && (
                        <Link to="" className="nav-item nav-link" onClick={onLogout}>
                            Logout
                        </Link>
                    )}
                    {!user.email && (
                        <Link to="/login" className="nav-item nav-link">
                            Login
                        </Link>
                    )}
                    {!user.email && (
                        <Link to="/register" className="nav-item nav-link">
                            Register
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
