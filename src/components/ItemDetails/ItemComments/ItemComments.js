import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ItemContext } from "../../../contexts/ItemContext";
import { useAuthContext } from "../../../contexts/AuthContext";

import * as itemService from "../../../services/itemService";
import * as commentService from "../../../services/commentService";

const ItemComments = () => {
    const { addComment, fetchItemDetails, selectItem } = useContext(ItemContext);
    const { user } = useAuthContext();
    const { itemId } = useParams();

    const currentItem = selectItem(itemId);

    useEffect(() => {
        (async () => {
            const itemDetails = await itemService.getOne(itemId);
            const itemComments = await commentService.getByItemId(itemId);

            fetchItemDetails(itemId, {
                ...itemDetails,
                comments: itemComments.map((x) => `${x.user.email}: ${x.text}`),
            });
        })();
    }, []);

    const addCommentHandler = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const comment = formData.get("comment");
        if (comment === "") {
            alert("You can't submit an empty field.");
            return;
        }

        const commentField = document.querySelector("textarea[name='comment']");

        commentService.create(itemId, comment).then((result) => {
            addComment(itemId, comment);
            commentField.value = "";
        });
    };

    return (
        <div className="comments">
            <h2>Comments:</h2>
            <div>
                {currentItem.comments.length !== 0 ? (
                    currentItem.comments.map((x) => (
                        <div key={Math.random(10000)} className="comment">
                            <p>{x}</p>
                        </div>
                    ))
                ) : (
                    <p className="no-comment">No comments.</p>
                )}
            </div>

            {user.email && (
                <article className="create-comment">
                    <form className="form" onSubmit={addCommentHandler}>
                        <textarea name="comment" placeholder="Comment......" />
                        <div className="actionBtn">
                            <input className="btn-group" type="submit" value="Add Comment" />
                        </div>
                    </form>
                </article>
            )}
        </div>
    );
};

export default ItemComments;
