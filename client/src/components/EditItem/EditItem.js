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
    for (let item of Object.values(itemData)) {
      if (item === "") {
        alert("Don't leave empty fields.");
        return;
      }
    }

    itemService.edit(itemId, itemData).then((result) => {
      itemEdit(itemId, result);
      navigate(`/catalog/${itemId}`);
    });
  };

  return (
    <section id="editPage">
      <form onSubmit={onSubmit}>
        <fieldset>
          <div>Edit Movie</div>
          <div className="container">
            <label htmlFor="name" className="vhide">
              Movie Name
            </label>
            <input
              id="name"
              name="name"
              className="name"
              type="text"
              defaultValue={currentItem.name}
            />

            <label htmlFor="imgUrl" className="vhide">
              Image Url
            </label>
            <input
              id="imgUrl"
              name="imgUrl"
              className="imgUrl"
              type="text"
              defaultValue={currentItem.imgUrl}
            />

            <label htmlFor="releaseDate" className="vhide">
              Release date
            </label>
            <input
              id="releaseDate"
              name="releaseDate"
              className="releaseDate"
              type="text"
              defaultValue={currentItem.releaseDate}
            />

            <label htmlFor="writer" className="vhide">
              Writer
            </label>
            <input
              id="writer"
              name="writer"
              className="writer"
              type="text"
              defaultValue={currentItem.writer}
            />

            <label htmlFor="genre" className="vhide">
              Genre
            </label>
            <input
              id="genre"
              name="genre"
              className="genre"
              type="text"
              defaultValue={currentItem.genre}
            />

            <label htmlFor="description" className="vhide">
              Description
            </label>
            <textarea
              name="description"
              className="description"
              rows={10}
              cols={10}
              defaultValue={currentItem.description}
            />

            <button className="edit-movie" type="submit">
              Edit Movie
            </button>
          </div>
        </fieldset>
      </form>
    </section>
  );
};

export default EditItem;
