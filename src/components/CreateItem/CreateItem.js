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
            <form onSubmit={onSubmit}>
                <fieldset>
                    <div>Add Movie</div>
                    <div className="create">
                        <>
                            <label htmlFor="name" className="vhide">
                                Movie name
                            </label>
                            <input
                                id="name"
                                name="name"
                                className="name"
                                type="text"
                                placeholder="Movie name"
                            />
                            <label htmlFor="imgUrl" className="vhide">
                                Image Url
                            </label>
                            <input
                                id="imgUrl"
                                name="imgUrl"
                                className="imgUrl"
                                type="text"
                                placeholder="Image Url"
                            />
                            <label htmlFor="releaseDate" className="vhide">
                                Release date
                            </label>
                            <input
                                id="releaseDate"
                                name="releaseDate"
                                className="releaseDate"
                                type="text"
                                placeholder="Release date"
                            />
                            <label htmlFor="writer" className="vhide">
                                Writer
                            </label>
                            <input
                                id="writer"
                                name="writer"
                                className="writer"
                                type="text"
                                placeholder="Writer"
                            />
                            <label htmlFor="genre" className="vhide">
                                Genre
                            </label>
                            <input
                                id="genre"
                                name="genre"
                                className="genre"
                                type="text"
                                placeholder="Genre"
                            />
                            <label htmlFor="description" className="vhide">
                                Description
                            </label>
                            <textarea
                                name="description"
                                type="text"
                                className="description"
                                placeholder="Description"
                                defaultValue={""}
                            />
                            <button className="add-movie" type="submit">
                                Add New Movie
                            </button>
                        </>
                    </div>
                </fieldset>
            </form>
        </section>
    );
};

export default CreateItem;
