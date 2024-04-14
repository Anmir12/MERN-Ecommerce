import { FaPlus } from "react-icons/fa";
import { server } from "../redux/store";
import { CartItem } from "../types/types";

type ProductProps = {
  productId: string;
  name: string;
  price: number;
  stock: number;
  photo: string;
  handler: (cartItem: CartItem) => void;
};

const ProductCard = ({
  name,
  price,
  photo,
  productId,
  stock,
  handler,
}: ProductProps) => {
  return (
    <div className="product-card">
      <img src={`${server}/${photo}`} alt={name} />
      <p>{name}</p>
      <span>{price}</span>

      <div>
        <button onClick={() => handler({
          productId,
          name,
          price,
          photo,
          quantity:1,
          stock, 
        })}>
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
