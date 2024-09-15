import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProfile: builder.query({
            query: () => ({
                url: "/users/profile",
                method: "GET",
            })
        }),
        updateProfile: builder.mutation({
            query: ({userId, data}) => ({
                url: `/users/profile/${userId}`,
                method: "PUT",
                body: data
            })
        })
    })
})


export const {useGetProfileQuery, useUpdateProfileMutation } = userApi
