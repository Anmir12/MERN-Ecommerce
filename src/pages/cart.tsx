import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItemCard from "../components/cart-items";
import {
  addToCart,
  applyDiscount,
  calculatePrice,
  removeCartItems,
} from "../redux/reducers/cartReducer";
import { CartItem } from "../types/types";
import axios from "axios";
import { RootState, server } from "../redux/store";

const Cart = () => {
  const dispatch = useDispatch();
  const { total, subtotal, discount, shippingCharges, tax, cartItems } =
    useSelector((state: RootState) => state.cartReducer);
  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidCouponCode, setisValidCouPonCode] = useState<boolean>(false);

  const incrementCart = (cartItem: CartItem) => {
    if (cartItem.quantity >= cartItem.stock) return;
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
  };
  const decrementCart = (cartItem: CartItem) => {
    if (cartItem.quantity <= 1) return;
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
  };
  const removeCartItem = (productId: string) => {
    dispatch(removeCartItems(productId));
  };
  useEffect(() => {
    const { token: cancelToken, cancel } = axios.CancelToken.source();
    const timeOutID = setTimeout(() => {
      axios
        .get(`${server}/api/v1/payments/discount?code=${couponCode}`, {
          cancelToken,
        })
        .then((res) => {
          // if(cartItems.length <= 0) return;
          // console.log(res)
          dispatch(applyDiscount(parseInt(res.data.message)));
          setisValidCouPonCode(true);
          dispatch(calculatePrice());
        })
        .catch(() => {
          dispatch(applyDiscount(0));
          setisValidCouPonCode(false);
          dispatch(calculatePrice());
        });
    }, 1000);

    return () => {
      cancel();
      clearTimeout(timeOutID);
      setisValidCouPonCode(false);
    };
  }, [couponCode]);

  useEffect(() => {
    dispatch(calculatePrice());
  }, [cartItems]);
  return (
    <div className="cart">
      <main>
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <CartItemCard
              incrementHandler={incrementCart}
              decrementHandler={decrementCart}
              removeHandler={removeCartItem}
              cartItem={item}
              key={index}
            />
          ))
        ) : (
          <h1>No items Added In the cart </h1>
        )}
      </main>

      {cartItems.length > 0 && (
        <aside>
          <p>subtotal: ₹{subtotal}</p>
          <p>tax: ₹{tax}</p>
          <p>shippingCharges: ₹{shippingCharges}</p>
          <p>
            discount: <em className="red">₹{discount}</em>
          </p>
          <p>
            <b>total: ₹{total}</b>
          </p>
          <input
            type="text"
            placeholder="Enter Coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          ></input>
          {couponCode &&
            (isValidCouponCode ? (
              <span className="green">
                ₹{discount} off using <code>{couponCode}</code>
              </span>
            ) : (
              <span className="red">
                invalid coupon code <VscError />
              </span>
            ))}
          {cartItems.length > 0 && (
            <button className="link">
              <Link to="/shipping">Checkout</Link>
            </button>
          )}
        </aside>
      )}
    </div>
  );
};

export default Cart;
