import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AllOrdersResponse,
  SingleOrdersResponse,
  UpdateOrderRequest,
  messageResponse,
  newOrderRequest,
} from "../../types/api-types";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/orders/` }),
  tagTypes: ["orders"],
  endpoints: (builder) => ({
    newOrder: builder.mutation<messageResponse, newOrderRequest>({
      query: (order) => ({
        url: "new",
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["orders"],
    }),
    myOrders: builder.query<AllOrdersResponse, string>({
      query: (id) => `my?id=${id}`,
      providesTags: ["orders"],
    }),
    allOrders: builder.query<AllOrdersResponse, string>({
      query: (id) => `all?id=${id}`,
      providesTags: ["orders"],
    }),
    getOrderDetails: builder.query<SingleOrdersResponse, string>({
      query: (id) =>  id,
      providesTags: ["orders"],
    }),
    
    updateOrder: builder.mutation<messageResponse, UpdateOrderRequest>({
      query: ({userId,orderId}) => ({
        url: `${orderId}?id=${userId}`,
        method: "PUT",
      }),
      invalidatesTags: ["orders"],
    }),
    deleteOrder: builder.mutation<messageResponse, UpdateOrderRequest>({
      query: ({userId,orderId}) => ({
        url: `${orderId}?id=${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["orders"],
    }),
  }),
});

export const {
  useNewOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useAllOrdersQuery,
  useMyOrdersQuery,
  useGetOrderDetailsQuery,
} = orderApi;
