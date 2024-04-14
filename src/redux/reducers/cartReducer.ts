import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartReducerInitialState } from "../../types/reducer-types";
import { CartItem, ShippingInfo } from "../../types/types";

const initialState: CartReducerInitialState = {
  isLoading: true,
  cartItems: [],
  total: 0,
  subtotal: 0,
  tax: 0,
  discount: 0,
  shippingCharges: 0,
  shippingInfo: {
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  },
  isRefetch:false
};

export const cartReducer = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.isLoading = true;

      const index = state.cartItems.findIndex(
        (i) => i.productId === action.payload.productId
      );

      if (index !== -1) state.cartItems[index] = action.payload;
      else {
        state.cartItems.push(action.payload);
      }

      state.isLoading = false;
    },

    removeCartItems: (state, action: PayloadAction<string>) => {
      state.isLoading = true;
      state.cartItems = state.cartItems.filter(
        (i) => i.productId !== action.payload
      );
      state.isLoading = false;
    },
    calculatePrice: (state) => {
      state.subtotal = state.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      state.shippingCharges = state.subtotal > 1000 ? 50 : 0;
      state.tax = Math.round(state.subtotal * 0.18);
      state.total =
        state.subtotal + state.shippingCharges + state.tax - state.discount;
    },
    applyDiscount: (state, action: PayloadAction<number>) => {
      state.discount = action.payload;
    },
    saveShippingInfo :(state,action: PayloadAction<ShippingInfo>) => {
          state.shippingInfo = action.payload
    },
    resetCart : () => initialState,
    
    refetchProduct: (state, action: PayloadAction<boolean>) => {
      state.isRefetch = action.payload;
 }
  },
});

export const { addToCart, removeCartItems, calculatePrice,applyDiscount,saveShippingInfo,resetCart,refetchProduct } =
  cartReducer.actions;
