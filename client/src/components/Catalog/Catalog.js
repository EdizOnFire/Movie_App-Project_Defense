import { useContext } from "react";
import { ItemContext } from "../../contexts/ItemContext";
import CatalogItem from "./CatalogItem/CatalogItem";

const Catalog = () => {
    const { items } = useContext(ItemContext);

    return (
        <section id="catalogPage">
            <div className="section-title">
                <h4 className="m-0 text-uppercase font-weight-bold">All Movies</h4>
            </div>
            <div className="container-fluid">
                <div className="container">
                    <div className="row">
                        <div className="col-12"></div>
                        {items.length > 0 ? (
                            items.map((x) => <CatalogItem key={x._id} item={x} />)
                        ) : (
                            <p>No Movies in Catalog!</p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Catalog;
