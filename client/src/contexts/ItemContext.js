import { createContext, useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import * as itemService from "../services/itemService";

export const ItemContext = createContext();

const itemReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEMS":
      return action.payload.map((x) => ({ ...x, comments: [] }));
    case "ADD_ITEM":
      return [...state, action.payload];
    case "FETCH_ITEM_DETAILS":
    case "EDIT_ITEM":
      return state.map((x) => (x._id === action.itemId ? action.payload : x));
    case "ADD_COMMENT":
      return state.map((x) =>
        x._id === action.itemId
          ? { ...x, comments: [...x.comments, action.payload] }
          : x
      );
    case "REMOVE_ITEM":
      return state.filter((x) => x._id !== action.itemId);
    default:
      return state;
  }
};

export const ItemProvider = ({ children }) => {
  const navigate = useNavigate();
  const [items, dispatch] = useReducer(itemReducer, []);

  useEffect(() => {
    itemService.getAll().then((result) => {
      const action = {
        type: "ADD_ITEMS",
        payload: result,
      };

      dispatch(action);
    });
  }, []);

  const selectItem = (itemId) => {
    return items.find((x) => x._id === itemId) || {};
  };

  const fetchItemDetails = (itemId, itemDetails) => {
    dispatch({
      type: "FETCH_ITEM_DETAILS",
      payload: itemDetails,
      itemId,
    });
  };
  const addComment = (itemId, comment) => {
    dispatch({
      type: "ADD_COMMENT",
      payload: comment,
      itemId,
    });
  };

  const itemAdd = (itemData) => {
    dispatch({
      type: "ADD_ITEM",
      payload: itemData,
    });

    navigate("/catalog");
  };

  const itemEdit = (itemId, itemData) => {
    dispatch({
      type: "EDIT_ITEM",
      payload: itemData,
      itemId,
    });
  };

  const itemRemove = (itemId) => {
    dispatch({
      type: "REMOVE_ITEM",
      itemId,
    });
  };
  return (
    <ItemContext.Provider
      value={{
        items,
        itemAdd,
        itemEdit,
        addComment,
        fetchItemDetails,
        selectItem,
        itemRemove,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};
