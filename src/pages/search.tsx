import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Skeltonloader } from "../components/loader";
import ProductCard from "../components/product-card";
import {
  useCategoriesQuery,
  useSearchProductsQuery,
} from "../redux/api/productApi";
import { addToCart } from "../redux/reducers/cartReducer";
import { CustomError } from "../types/api-types";
import { CartItem } from "../types/types";

const Search = () => {
  const dispatch = useDispatch();
  const {
    data: categoriesResponse,
    isError,
    error,
    isLoading: loadingCategories,
  } = useCategoriesQuery("");

  const [search, setsearch] = useState("");
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");
  const [maxprice, setMaxPrice] = useState(100000);
  const [page, setPage] = useState(1);

  const {
    data: searchProducts,
    isError: searchIsError,
    error: searchError,
    isLoading: searchProductsLoading,
  } = useSearchProductsQuery({
    search,
    sort,
    category,
    price: maxprice,
    page,
  });
  
  const isPrevPage = page > 1;
  const isNextPage = page < 4;

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  if (searchIsError) {
    const err = searchError as CustomError;
    toast.error(err.data.message);
  }

  const addtoCart = (cartItem:CartItem) => {
    if(cartItem.stock < 1) {
      toast.error("Out Of Stock");
      return; // Stop execution if the product is out of stock
    }
  
    dispatch(addToCart(cartItem));
    toast.success("Added To Cart");
  };
 
  return (
    <div className="product-search-page">
      <aside>
        <h2>Filters</h2>

        <div>
          <h4>Sort</h4>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">None</option>
            <option value={"asc"}>price (Low to High)</option>
            <option value={"dsc"}>price (High to Low)</option>
          </select>
        </div>

        <div>
          <h4>MaxPrice :{maxprice || ""}</h4>
          <input
            type="range"
            min={100}
            max={100000}
            value={maxprice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>

        <div>
          <h4>Category</h4>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">ALL</option>
            {!loadingCategories &&
              categoriesResponse?.categories.map((i,idx) => (
                <option value={i} key={idx}>
                  {i.toUpperCase()}
                </option>
              ))}
          </select>
        </div>
      </aside>

      <main>
        <h1>Products</h1>
        <input
          placeholder="search by name...."
          type="text"
          value={search}
          onChange={(e) => setsearch(e.target.value)}
        />

        <div className="search-product-list"> 
          {searchProductsLoading ? (
            <Skeltonloader />
          ) : (
            searchProducts?.products.map((i) => (
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
        </div>

        {searchProducts && searchProducts.totalPages > 1 &&  ( 
          <article>
            <button
              disabled={!isPrevPage}
              onClick={() => setPage((prev) => prev - 1)}
            >
              prev
            </button>

            <span>
              {page} of {searchProducts.totalPages}
            </span>

            <button
              disabled={!isNextPage}
              onClick={() => setPage((prev) => prev + 1)}
            >
              next
            </button>
          </article>
        )}
      </main>
    </div>
  );
};

export default Search;
