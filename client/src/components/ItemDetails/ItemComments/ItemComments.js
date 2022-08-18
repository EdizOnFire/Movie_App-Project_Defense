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

        const commentField = document.querySelector("textarea[name='comment']");

        commentService.create(itemId, comment).then((result) => {
            addComment(itemId, comment);
            commentField.value = "";
        });
    };

    if (currentItem.comments === undefined) {
        return;
    }

    return (
        <div className="comments">
            <h2>Comments:</h2>
            <div>
                {currentItem.comments.length !== 0 ? (
                    currentItem.comments.map((x) => (
                        <div key={Math.random(10000)} className="comment">{x}</div>
                    ))
                ) : (
                    <p className="no-comment">No comments.</p>
                )}
            </div>

            {user.email && (
                <form align="center" className="comments" onSubmit={addCommentHandler}>
                    <textarea name="comment" required="required" placeholder="Comment......" />
                    <div>
                        <button className="btn btn-primary font-weight-semi-bold px-4"
                            style={{ height: 50 }}
                            type="submit">
                            Add Comment
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default ItemComments;
