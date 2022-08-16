import { Link } from "react-router-dom";

const Home = () => {

    return (

        <section id="welcomePage">
            <div className="welcome-message">
                <h1>Welcome to Your Movie Website!</h1>
                <p>Feel free to browse our <Link to="/catalog">catalog</Link> of movies and to upload your own.</p>
                <p>If you have an account, click on "Login" on the nav bar.</p>
                <p>If you don't have an account, click on "Register" on the nav bar.</p>
            </div>
        </section>
    );
}

export default Home;
