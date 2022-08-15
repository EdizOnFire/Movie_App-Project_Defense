import { useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ItemContext } from '../../contexts/ItemContext';
import { useAuthContext } from '../../contexts/AuthContext';

import * as itemService from '../../services/itemService';
import * as commentService from '../../services/commentService';

const ItemDetails = () => {
    const navigate = useNavigate();
    const { addComment, fetchItemDetails, selectItem, itemRemove } = useContext(ItemContext);
    const { user } = useAuthContext();
    const { itemId } = useParams();

    const currentItem = selectItem(itemId);
    const isOwner = currentItem._ownerId === user._id;

    useEffect(() => {
        (async () => {
            const itemDetails = await itemService.getOne(itemId);
            const itemComments = await commentService.getByItemId(itemId);

            fetchItemDetails(itemId, { ...itemDetails, comments: itemComments.map(x => `${x.user.email}: ${x.text}`) });
        })();
    }, [])

    const addCommentHandler = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const comment = formData.get('comment');

        commentService.create(itemId, comment)
            .then(result => {
                addComment(itemId, comment);
            });
    };

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
            <div className="details">
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

            <div className="comments">
                <h2>Comments:</h2>
                <div>
                    {currentItem.comments?.map(x =>
                        <div key={x} className="comment">
                            <p>{x}</p>
                        </div>
                    )}
                    {!currentItem.comments &&
                        <p className="no-comment">No comments.</p>
                    }
                </div>

                {user.email
                    ? <article className="create-comment">
                        <form className="form" onSubmit={addCommentHandler}>
                            <textarea
                                name="comment"
                                placeholder="Comment......"
                            />
                            <div className="actionBtn">
                                <input
                                    className="btn-group"
                                    type="submit"
                                    value="Add Comment"
                                />
                            </div>
                        </form>
                    </article>
                    : <></>}
            </div>
        </section>
    );
};

export default ItemDetails;
