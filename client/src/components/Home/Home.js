import { useContext } from "react";
import { ItemContext } from "../../contexts/ItemContext";
import HomeItem from "./HomeItem/HomeItem";

const Home = () => {
    const { items } = useContext(ItemContext);

    return (
        <section id="welcomePage">
            <div className="section-title">
                <h4 className="m-0 text-uppercase font-weight-bold">Featured Movies</h4>
            </div>
            <div className="container-fluid">
                <div className="col-lg-5 px-0">
                    <div className="row mx-0">
                        {items.length > 0 ? (
                            items.map((x) => <HomeItem key={x._id} item={x} />)
                        ) : (
                            <p>No Movies in Catalog!</p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Home;
