import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  categoriesResponse,
  deleteProductRequest,
  getAllProductsResponse,
  getSingleProductResponse,
  messageResponse,
  newProductRequest,
  searchProductsRequest,
  searchProductsResponse,
  updateProductRequest,
} from "../../types/api-types";

const server = import.meta.env.VITE_SERVER;

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/v1/products/` }),
  tagTypes: ["products","allProducts"],
  endpoints: (builder) => ({
    latest: builder.query<getAllProductsResponse, string>({
      query: () => "latest",
      providesTags: ["products","allProducts"],
    }),
    getAllProducts: builder.query<getAllProductsResponse, string>({
      query: (id) => `admin-products?id=${id}`,
      providesTags: ["products","allProducts"],
    }),

    categories: builder.query<categoriesResponse, string>({
      query: () => "category",
      providesTags: ["products"],
    }),
    getProductDetails: builder.query<getSingleProductResponse, string>({
      query: (id) => id,
      providesTags: ["products"],
    }),

    searchProducts: builder.query<
      searchProductsResponse,
      searchProductsRequest
    >({
      query: ({ search, page, sort, category, price }) => {
        let baseQuery = `all?search=${search}&page=${page}`;

        if (price) baseQuery += `&price=${price}`;

        if (category) baseQuery += `&category=${category}`;

        if (sort) baseQuery += `&sort=${sort}`;

        return baseQuery;
      },
      providesTags: ["products","allProducts"],
    }),

    createProduct: builder.mutation<messageResponse, newProductRequest>({
      query: ({ formData, id }) => ({
        url: `new?id=${id}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags:["products","allProducts"]
    }),

    updateProduct:builder.mutation<messageResponse,updateProductRequest>({query:({formData,productId,userId})=>({
      url:`${productId}?id=${userId}`,
      method:"PUT",
      body: formData
    }),
    invalidatesTags : ["products","allProducts"]
  }),
    deleteProduct:builder.mutation<messageResponse,deleteProductRequest>({query:({productId,userId})=>({
      url:`${productId}?id=${userId}`,
      method:"DELETE",
    }),
    invalidatesTags : ["allProducts"]
  })
  }),
});

export const {
  useLatestQuery,
  useGetAllProductsQuery,
  useCategoriesQuery,
  useSearchProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation
} = productsApi;
