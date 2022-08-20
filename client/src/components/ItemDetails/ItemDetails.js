import { useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ItemContext } from "../../contexts/ItemContext";
import { AuthContext } from "../../contexts/AuthContext";
import ItemComments from "./ItemComments/ItemComments";
import * as itemService from "../../services/itemService";

const ItemDetails = () => {
    const navigate = useNavigate();
    const { selectItem, itemRemove } = useContext(ItemContext);
    const { user } = useContext(AuthContext);
    const { itemId } = useParams();

    const currentItem = selectItem(itemId);
    const isOwner = currentItem._ownerId === user._id;

    const itemDeleteHandler = () => {
        const confirmation = window.confirm(
            "Are you sure you want to delete this item?"
        );

        if (confirmation) {
            itemService.remove(itemId).then(() => {
                itemRemove(itemId);
                navigate("/catalog");
            });
        }
    };

    return (
        <section id="detailsPage">
            <div className="details">
                <div className="movieCover">
                    <img src={currentItem.imgUrl} alt="Apologies for the error." />
                </div>
                <div className="movieInfo">
                    <div className="movieText">
                        <h1>Name: {currentItem.name}</h1>
                        <h4>Writer: {currentItem.writer}</h4>
                        <h4>Genre: {currentItem.genre}</h4>
                        <h4>Date: {currentItem.releaseDate}</h4>
                        <h4>Description: {currentItem.description}</h4>
                    </div>
                </div>
                {isOwner && (
                    <div className="actionBtn">
                        <Link
                            to={`/catalog/${itemId}/edit`}
                            className="btn btn-primary font-weight-semi-bold px-4"
                        >
                            Edit
                        </Link>
                        <button
                            onClick={itemDeleteHandler}
                            className="btn btn-primary font-weight-semi-bold px-4"
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
            <ItemComments />
        </section>
    );
};

export default ItemDetails;
