import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingInfo } from "../redux/reducers/cartReducer";
import { RootState, server } from "../redux/store";

const Shipping = () => {
  const dispatch = useDispatch();
  // const { user } = useSelector((state: RootState) => state.userReducer);
  const { cartItems, total } = useSelector(
    (state: RootState) => state.cartReducer
  );
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (cartItems.length <= 0) navigate("/cart");
  }, [cartItems]);
  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setShippingInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    dispatch(saveShippingInfo(shippingInfo));
  
    try {
      const { data } = await axios.post(
        `${server}/api/v1/payments/create`,
        {
          amount: total,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log("Payment successful, clientSecret:", data.clientSecret);
      navigate("/pay", {
        state: data.clientSecret,
      });
    } catch (error) {
      console.error("Error creating payment:", error);
      toast.error("Something went wrong while processing payment");
    }
  };
  
  return (
    <div className="shipping">
      <button className="back-btn" onClick={() => navigate("/cart")}>
        <BiArrowBack />
      </button>
      <form onSubmit={submitHandler}>
        <h1>Shipping Address</h1>
        <input
          type="text"
          required
          placeholder="Name"
          name="name"
          value={shippingInfo.name}
          onChange={changeHandler}
        />
        <input
          type="text"
          required
          placeholder="Address"
          name="address"
          value={shippingInfo.address}
          onChange={changeHandler}
        />
        <input
          type="text"
          required
          placeholder="City"
          name="city"
          value={shippingInfo.city}
          onChange={changeHandler}
        />
        <input
          type="text"
          required
          placeholder="State"
          name="state"
          value={shippingInfo.state}
          onChange={changeHandler}
        />
        <select
          name="country"
          required
          value={shippingInfo.country}
          onChange={changeHandler}
        >
          <option value="">Choose Country</option>
          <option value="India">India</option>
          <option value="us">US</option>
          <option value="uk">UK</option>
        </select>
        <input
          type="text"
          required
          placeholder="Pin Code"
          name="pinCode"
          value={shippingInfo.pinCode}
          onChange={changeHandler}
        />
        <button type="submit">Pay Now</button>
      </form>
    </div>
  );
};

export default Shipping;
