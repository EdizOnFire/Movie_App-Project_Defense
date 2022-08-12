import { Link } from "react-router-dom";

const Home = () => {

    return (

        <section id="welcomePage">
            <div className="welcome-message">
                <h1>Welcome to Your Movie Website!</h1>
            </div>
            <div>
            <Link to="/catalog"><button className="catalog">Go to the catalog</button></Link></div>
        </section>
    );
}

export default Home;
