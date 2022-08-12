import { useNavigate, Link } from 'react-router-dom';

import * as authService from "../../services/authService";
import { withAuth } from "../../contexts/AuthContext";


const Register = ({ auth }) => {
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const email = formData.get('email');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirm-password');

        if (password !== confirmPassword) {
            return;
        }

        authService.register(email, password)
            .then(authData => {
                auth.userLogin(authData);
                navigate('/');
            });
    }

    return (
        <section id="registerPage" className="content auth">
            <form onSubmit={onSubmit}>
                <fieldset>
                    <div>Register</div>

                    <label htmlFor="email" className="vhide">Email</label>
                    <input id="email" className="email" name="email" type="text" placeholder="Email" />

                    <label htmlFor="password" className="vhide">Password</label>
                    <input id="password" className="password" name="password" type="password" placeholder="Password" />

                    <label htmlFor="con-pass" className="vhide">Confirm Password:</label>
                    <input type="password" name="confirm-password" id="confirm-password" placeholder="Confirm Password" />

                    <button type="submit" className="register">Register</button>
                    <p className="field">
                        <span>
                            If you already have profile click <Link to="/login">here</Link>
                        </span>
                    </p>
                </fieldset>
            </form>
        </section>
    );
};

const RegisterWithAuth = withAuth(Register);

export default RegisterWithAuth;
