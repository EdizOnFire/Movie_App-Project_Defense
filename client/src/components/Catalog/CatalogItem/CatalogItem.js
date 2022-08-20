import { Link } from "react-router-dom";

const CatalogItem = ({ item }) => {
    return (
        <div className="col-lg-6">
            <div className="position-relative mb-3">
                <img
                    className="img-fluid w-100"
                    src={item.imgUrl}
                    alt='Apologies for the error.'
                    style={{ objectFit: "cover" }}
                />
                <div className="bg-white border border-top-0 p-4">
                    <div className="mb-2">
                        <Link
                            to={`/catalog/${item._id}`}
                            id="details"
                            className="badge badge-primary text-uppercase font-weight-semi-bold p-2 mr-2">
                            Details
                        </Link>
                        <small>{item.releaseDate}</small>
                    </div>
                    <div className="h4 d-block mb-3 text-secondary text-uppercase font-weight-bold">
                        {item.name}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CatalogItem;
