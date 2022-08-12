import { useContext } from "react";

import { ItemContext } from "../../contexts/ItemContext";
import CatalogItem from "./CatalogItem/CatalogItem";

const Catalog = () => {
    const { items } = useContext(ItemContext);
    
    return (
        <section id="catalogPage">
        <h1>All Movies</h1>

            {items.length > 0
                ? items.map(x => <CatalogItem key={x._id} item={x} />)
                : <p>No Movies in Catalog!</p>
            }
        </section>
    );
};

export default Catalog;
