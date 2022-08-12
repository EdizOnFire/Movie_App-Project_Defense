import { Link } from "react-router-dom";

const Home = () => {

    return (

        <section id="welcomePage">
            <div className="welcome-message">
                <h1>Welcome to Your Movie Website!</h1>
                <p>Feel free to browse our <Link to="/catalog">catalog</Link> of movies.</p>
                <p>Login by clicking on <Link to="/login">this link</Link>.</p>
                <p>If you don't have a registration, please follow <Link to="/register">this link</Link>.</p>
            </div>
        </section>
    );
}

export default Home;
