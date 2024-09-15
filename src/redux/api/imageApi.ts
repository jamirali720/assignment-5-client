import { baseApi } from "./baseApi";

// Define a service using a base URL and expected endpoints
export const imageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadHeroImage: builder.mutation({
      query: (data) => {
        console.log(data);
        return {
          url: "/images/upload-hero-image",
          method: "POST",
          body: data,
        };
      },
    }),
    getAllHeroImages: builder.query({
      query: () => {
        return {
          url: "/images/all-hero-images",
          method: "GET",
        };
      },
      providesTags: ["images"],
    }),
   
    deletedSingleHeroImage: builder.mutation({
      query: (id) => {
        return {
          url: `/images/delete-hero-image/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["images"],
    }),
  }),
});

export const {
  useUploadHeroImageMutation, 
  useGetAllHeroImagesQuery, 
  useDeletedSingleHeroImageMutation,  
} = imageApi;
