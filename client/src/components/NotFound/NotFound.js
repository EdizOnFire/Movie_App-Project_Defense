import { Link } from "react-router-dom"

const NotFound = () => {
    return (
        <div className="notFound" align="center">
            <h2>Error 404</h2>
            <p>The page cannot be found.</p>
            <Link to='/'>Back to the homepage...</Link>
        </div>
    )
};

export default NotFound;