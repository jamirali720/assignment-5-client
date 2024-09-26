import { baseApi } from "./baseApi";

// Define a service using a base URL and expected endpoints
export const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: (data) => {
        console.log(data);
        return {
          url: "/rentals",
          method: "POST",
          body: data,
        };
      },
    }),

    getAllBookings: builder.query({
      query: () => {
        return {
          url: `/rentals/all-rentals`,
          method: "GET",
        };
      },
      providesTags: ["booking"],
    }),
    
    getBookingByUserId: builder.query({
      query: () => {
        return {
          url: "/rentals",
          method: "GET",
        };
      },
      providesTags: ["booking"],
    }),
    calculateBooking: builder.mutation({
      query: ({ id, returnTime }) => {
        return {
          url: `/rentals/calculate/${id}`,
          method: "PUT",
          body: { returnTime },
        };
      },
      invalidatesTags: ["booking"],
    }),
    updatedBooking: builder.mutation({
      query: (id) => {
        return {
          url: `/rentals/${id}/return`,
          method: "PUT",
        };
      },
      invalidatesTags: ["booking"],
    }),

    refundMoney: builder.mutation({
      query: ({ id, amount }) => {
        return {
          url: `/payment/refunds/${id}`,
          method: "POST",
          body: { amount },
        };
      },
      invalidatesTags: ["booking"],
    }),
    updatedBookingAfterRefundMoney: builder.mutation({
      query: () => {
        const id = "66f14a2dc861484570767f5b";
        return {
          url: `/rentals/update-after-refund/${id}`,
          method: "PUT",
        };
      },
      invalidatesTags: ["booking"],
    }),
    deleteBookingById: builder.mutation({
      query: (id) => {
        return {
          url: `/rentals/delete-rental/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["booking"],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetAllBookingsQuery,  
  useDeleteBookingByIdMutation, 
  useUpdatedBookingMutation,  
  useGetBookingByUserIdQuery, 
  useCalculateBookingMutation,
  useRefundMoneyMutation, 
  useUpdatedBookingAfterRefundMoneyMutation,  
  
 
} = bookingApi;
