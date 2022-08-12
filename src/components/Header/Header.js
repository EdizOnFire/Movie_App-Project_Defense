import { Link } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';

const Header = () => {
    const { user } = useAuthContext();

    return (
        <header>
            <nav>
                <img src='./images/movie-trans.png'></img>
                <Link to="/">Home</Link>
                <ul>
                    <Link to="/catalog">Catalog</Link>
                    {user.email
                        ? <li><Link to="/create">Create Movie</Link>
                            <Link to="/logout">Logout</Link>
                        </li>
                        : <li><Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </li>
                    }
                </ul>
            </nav>
        </header>
    );
};

export default Header;
