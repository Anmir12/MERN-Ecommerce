import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Skeltonloader } from "../components/loader";
import ProductCard from "../components/product-card";
import { useLatestQuery } from "../redux/api/productApi";
import { addToCart } from "../redux/reducers/cartReducer";
import { CartItem } from "../types/types";

const Home = () => {
  const { data, isLoading } = useLatestQuery("");
  const dispatch = useDispatch();

  const addtoCart = (cartItem:CartItem) => {
    if(cartItem.stock < 1) {
      toast.error("Out Of Stock");
      return; // Stop execution if the product is out of stock
    }
  
    dispatch(addToCart(cartItem));
    toast.success("Added To Cart");
  };
 
  return (
    <div className="home">
      <section></section>
      <h1>
        Latest Products
        <Link to="/search" className="findmore">
          More
        </Link>
      </h1>
      <main>
        {
        isLoading ? (
          <Skeltonloader width="80vw"/>
        ) : (
          data?.products?.map((i) => (
            <ProductCard
              key={i._id}
              productId={i._id}
              stock={i.stock}
              name={i.name}
              price={i.price}
              photo={i.photo}
              handler={addtoCart}
            />
          ))
        )}
      </main>
    </div>
  );
};

export default Home;
