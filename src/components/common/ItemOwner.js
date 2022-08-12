import { useContext } from "react";
import { Outlet, useParams, Navigate } from "react-router-dom";

import { useAuthContext } from "../../contexts/AuthContext";
import { ItemContext } from "../../contexts/ItemContext";

const ItemOwner = ({ children }) => {
    const { selectItem } = useContext(ItemContext);
    const { user, isAuthenticated } = useAuthContext();
    const { itemId } = useParams();

    const currentItem = selectItem(itemId);

    if (isAuthenticated && user._id !== currentItem._ownerId) {
        return <Navigate to='/catalog' replace />
    }

    return children ? children : <Outlet />;
};

export default ItemOwner;
