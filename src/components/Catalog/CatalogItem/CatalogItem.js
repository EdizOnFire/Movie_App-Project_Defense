import { Link } from 'react-router-dom';

const CatalogItem = ({ item }) => {
    return (
        <div className="card-box">
            <img src={item.imgUrl} />
            <div>
                <div className="text-center">
                    <p className="name">Name: {item.name}</p>
                    <p className="writer">Writer: {item.writer}</p>
                    <p className="genre">Genre: {item.genre}</p>
                    <p className="date">Release Date: {item.releaseDate}</p>
                </div>
                <div className="btn-group">
                    <Link to={`/catalog/${item._id}`} id="details">Details</Link>
                </div>
            </div>
        </div>
    );
};

export default CatalogItem;
