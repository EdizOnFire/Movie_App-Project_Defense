import { Link } from "react-router-dom";

const HomeItem = ({ item }) => {

    return (
        <div className="col-md-6 px-0">
            <div
                className="position-relative overflow-hidden"
                style={{ height: 250 }}
            >
                <img
                    className="img-fluid w-100 h-100"
                    src={item.imgUrl}
                    style={{ objectFit: "cover" }}
                />
                <div className="overlay">
                    <div className="mb-2">
                        <Link to={`/catalog/${item._id}`} id="details" className="badge badge-primary text-uppercase font-weight-semi-bold p-2 mr-2">
                            Details
                        </Link>
                        <a className="text-white">
                            <small>{item.releaseDate}</small>
                        </a>
                    </div>
                    <a
                        className="h6 m-0 text-white text-uppercase font-weight-semi-bold"
                    >
                        {item.name}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default HomeItem;
