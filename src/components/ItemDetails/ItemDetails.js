import { useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ItemContext } from '../../contexts/ItemContext';
import { useAuthContext } from '../../contexts/AuthContext';

import * as itemService from '../../services/itemService';

const ItemDetails = () => {
    const navigate = useNavigate();
    const { fetchItemDetails, selectItem, itemRemove } = useContext(ItemContext);
    const { user } = useAuthContext();
    const { itemId } = useParams();

    const currentItem = selectItem(itemId);

    const isOwner = currentItem._ownerId === user._id;

    useEffect(() => {
        (async () => {
            const itemDetails = await itemService.getOne(itemId);
            fetchItemDetails(itemId, { ...itemDetails, });
        })();
    }, [])

    const itemDeleteHandler = () => {
        const confirmation = window.confirm('Are you sure you want to delete this item?');

        if (confirmation) {
            itemService.remove(itemId)
                .then(() => {
                    itemRemove(itemId);
                    navigate('/catalog');
                })
        }
    }

    return (
        <section id="detailsPage">
            <div className="wrapper">
                <div className="movieCover">
                    <img src={currentItem.imgUrl} />
                </div>

                <div className="movieInfo">
                    <div className="movieText">
                        <h1>Name: {currentItem.name}</h1>
                        <h3>Writer: {currentItem.writer}</h3>
                        <h4>Genre: {currentItem.genre}</h4>
                        <h4>Date: {currentItem.releaseDate}</h4>
                        <p>Description: {currentItem.description}</p>
                    </div>
                </div>
                {isOwner &&
                    <div className="actionBtn">
                        <Link to={`/items/${itemId}/edit`} className="edit">Edit</Link>
                        <a onClick={itemDeleteHandler} className="remove">Delete</a>
                    </div>
                }
            </div>
        </section>
    );
};

export default ItemDetails;
