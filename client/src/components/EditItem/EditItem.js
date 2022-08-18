import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import * as itemService from "../../services/itemService";
import { ItemContext } from "../../contexts/ItemContext";

const EditItem = () => {
  const [currentItem, setCurrentItem] = useState({});
  const { itemEdit } = useContext(ItemContext);
  const { itemId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    itemService.getOne(itemId).then((itemData) => {
      setCurrentItem(itemData);
    });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const itemData = Object.fromEntries(new FormData(e.target));

    itemService.edit(itemId, itemData).then((result) => {
      itemEdit(itemId, result);
      navigate(`/catalog/${itemId}`);
    });
  };

  return (
    <section id="editPage">
      <div className="section-title">
        <h4 className="m-0 text-uppercase font-weight-bold">Edit Movie</h4>
      </div>
      <form align="center" onSubmit={onSubmit}>
        <div className="label" htmlFor="name">
          Movie Name
        </div>
        <input
          required="required"
          id="name"
          name="name"
          className="name"
          type="text"
          defaultValue={currentItem.name}
        />
        <div className="label" htmlFor="imgUrl">
          Image Url
        </div>
        <input
          required="required"
          id="imgUrl"
          name="imgUrl"
          className="imgUrl"
          type="text"
          defaultValue={currentItem.imgUrl}
        />
        <div className="label" htmlFor="releaseDate">
          Release date
        </div>
        <input
          required="required"
          id="releaseDate"
          name="releaseDate"
          className="releaseDate"
          type="text"
          defaultValue={currentItem.releaseDate}
        />
        <div className="label" htmlFor="writer">
          Writer
        </div>
        <input
          required="required"
          id="writer"
          name="writer"
          className="writer"
          type="text"
          defaultValue={currentItem.writer}
        />
        <div className="label" htmlFor="genre">
          Genre
        </div>
        <input
          id="genre"
          required="required"
          name="genre"
          className="genre"
          type="text"
          defaultValue={currentItem.genre}
        />
        <div className="label" htmlFor="description">
          Description
        </div>
        <textarea
          name="description"
          required="required"
          className="description"
          defaultValue={currentItem.description}
        />
         <div>
        <button
          className="btn btn-primary font-weight-semi-bold px-4"
          style={{ height: 50 }}
          type="submit"
        >
          Edit Movie
        </button>
        </div>
      </form>
    </section>
  );
};

export default EditItem;
