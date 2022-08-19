import { useContext } from "react";
import { ItemContext } from "../../contexts/ItemContext";
import * as itemService from "../../services/itemService";

const CreateItem = () => {
  const { itemAdd } = useContext(ItemContext);

  const onSubmit = (e) => {
    e.preventDefault();

    const itemData = Object.fromEntries(new FormData(e.target));

    itemService.create(itemData).then((result) => {
      itemAdd(result);
    });
  };

  return (
    <section className="createPage">
      <div className="section-title">
        <h4 className="m-0 text-uppercase font-weight-bold">Add Movie</h4>
      </div>
      <form align="center" onSubmit={onSubmit}>
        <div className="label" htmlFor="genre">
          Movie Name
        </div>
        <input
          required="required"
          id="name"
          name="name"
          className="name"
          type="text"
          placeholder="Movie name"
        />
        <div className="label" htmlFor="genre">
          Image Url
        </div>
        <input
          required="required"
          id="imgUrl"
          name="imgUrl"
          className="imgUrl"
          type="text"
          placeholder="Image Url"
        />
        <div className="label" htmlFor="genre">
          Release Date
        </div>
        <input
          required="required"
          id="releaseDate"
          name="releaseDate"
          className="releaseDate"
          type="text"
          placeholder="Release date"
        />
        <div className="label" htmlFor="genre">
          Writer
        </div>
        <input
          required="required"
          id="writer"
          name="writer"
          className="writer"
          type="text"
          placeholder="Writer"
        />
        <div className="label" htmlFor="genre">
          Genre
        </div>
        <input
          required="required"
          id="genre"
          name="genre"
          className="genre"
          type="text"
          placeholder="Genre"
        />
        <div className="label" htmlFor="genre">
          Description
        </div>
        <textarea
          required="required"
          name="description"
          type="text"
          className="description"
          placeholder="Description"
        />
        <div>
          <button
            className="btn btn-primary font-weight-semi-bold px-4"
            style={{ height: 50 }}
            type="submit"
          >
            Add New Movie
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreateItem;
