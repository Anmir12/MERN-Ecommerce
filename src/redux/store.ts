import { configureStore } from "@reduxjs/toolkit";
import { dashBoardApi } from "./api/dashBoardApi";
import { orderApi } from "./api/ordersApi";
import { productsApi } from "./api/productApi";
import { userApi } from "./api/userApi";
import { cartReducer } from "./reducers/cartReducer";
import { userReducer } from "./reducers/userReducer";

export const server = import.meta.env.VITE_SERVER;

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [dashBoardApi.reducerPath]: dashBoardApi.reducer,
    [userReducer.name]: userReducer.reducer,
    [cartReducer.name]: cartReducer.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      productsApi.middleware,
      orderApi.middleware,
      dashBoardApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
