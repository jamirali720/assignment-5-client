import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://assignment-4-server-bice.vercel.app/api/orders",
  }),
  tagTypes: ["orders"],
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (data) => {
        return {
          url: "/create-order",
          method: "POST",
          body: data,
        };
      },
    }),

    getSingleOrder: builder.query({
      query: (id) => {
        return {
          url: `/single-order/${id}`,
          method: "GET",
        };
      },
      providesTags: ["orders"],
    }),
    updatedSingleOrder: builder.mutation({
      query: (data) => {
        const { orderId, ...status } = data;
        return {
          url: `/update-order/${orderId}`,
          method: "PUT",
          body: status,
        };
      },
      invalidatesTags: ["orders"],
    }),

    deletedSingleOder: builder.mutation({
      query: (id) => {
        return {
          url: `/delete-order/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["orders"],
    }),
    getAllOrders: builder.query({
      query: (query) => {
        return {
          url: `/orders?email=${query?.email}`,
          method: "GET",
        };
      },
      providesTags: ["orders"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetSingleOrderQuery,
  useGetAllOrdersQuery,
  useDeletedSingleOderMutation, 
  useUpdatedSingleOrderMutation,
} = ordersApi;
