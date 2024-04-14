import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { server } from "../redux/store";
import { CartItem } from "../types/types";

 type cartitemProps ={
  cartItem:CartItem;
  incrementHandler:(cartItem:CartItem) => void;
  decrementHandler:(cartItem:CartItem) => void;
  removeHandler:(id:string) => void;
 }

const CartItems = ({ cartItem,incrementHandler,decrementHandler,removeHandler }: cartitemProps) => {
    const { name, price, quantity, photo, productId } = cartItem;
    return (
      <div className="cart-item">
        <img src={`${server}/${photo}`} alt={name}/>
        <article >
          <Link to ={`/products/${productId}`}>{name}</Link>
        <span>{price}</span>
        </article>
        <div>
        <button onClick={() => decrementHandler(cartItem)}>-</button>
        <p>{quantity}</p>
        <button onClick={() =>incrementHandler(cartItem)}>+</button>
        </div>
        <button onClick={() => removeHandler(productId)}>
        <FaTrash/>
        </button>
      </div>
   
    );
  };
  
  export default CartItems;
  