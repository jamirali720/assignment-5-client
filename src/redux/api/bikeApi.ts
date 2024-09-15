import { baseApi } from "./baseApi";


// Define a service using a base URL and expected endpoints
export const bikeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createNewBike: builder.mutation({
      query: (data) => {
        console.log(data);
        return {
          url: "/bikes/create-bike",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["bikes"],
    }),

    getAllBikes: builder.query({
      query: (query) => {
        console.log(query)
        const link = `/bikes/all-bikes?name=${query}`;
        return {
          url: link,
          method: "GET",
        };
      },
      providesTags: ["bikes"],
    }),
    getSingleBikes: builder.query({
      query: (id) => {
        return {
          url: `/bikes/single-bike/${id}`,
          method: "GET",
        };
      },
      providesTags: ["bikes"],
    }),
    updatedSingleBikes: builder.mutation({
      query: (data) => {
        return {
          url: `/update-sport`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["bikes"],
    }),
    deletedSingleBike: builder.mutation({
      query: (id) => {
        return {
          url: `/bikes/delete-bike/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["bikes"],
    }),

    createReview: builder.mutation({
      query: ({ id, ...data }) => {
        return {
          url: `/bikes/create-review/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["bikes"],
    }),

    contactEmailSend: builder.mutation({
      query: (data) => {
        return {
          url: "/contact",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const {
 useCreateNewBikeMutation,
  useGetAllBikesQuery,
  useCreateReviewMutation, 
  useGetSingleBikesQuery,
  useUpdatedSingleBikesMutation,
  useDeletedSingleBikeMutation,
  useContactEmailSendMutation, 
  
} = bikeApi;
