import { TUserResponse } from "types/types";
import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<TUserResponse, void>({
      query: () => ({
        url: "/users/profile",
        method: "GET",
      }),
    }),
    updateProfile: builder.mutation({
      query: (data ) => {       
        return {
          url: `/users/update-profile`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["users"],
    }),
    updateProfileImage: builder.mutation({
      query: (data ) => {      
        return {
          url: `/users/update-profile-image`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["users"],
    }),
    changePassword: builder.mutation({
      query: (data ) => {       
        return {
          url: `/users/change-password`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["users"],
    }),

    getAllUsers: builder.query({
      query: ( ) => {        
        return {
          url: `/users/all-users`,
          method: "GET",
         
        };
      },
      providesTags: ["users"],
    }),
    updateUserRole: builder.mutation({
      query: ({userId, role}) => {                
        return {
          url: `/users/update-role/${userId}`,
          method: "PUT",
          body: {role},         
        };
      },
      invalidatesTags: ["users"],
    }),
    deleteUserFromDB: builder.mutation({
      query: (id) => {   
        console.log(id)     
        return {
          url: `/users/delete-user-from-db/${id}`,
          method: "DELETE",          
        };
      },
      invalidatesTags: ["users"],
    }),
  }),
});


export const {useGetProfileQuery, useUpdateUserRoleMutation, useDeleteUserFromDBMutation, useGetAllUsersQuery, useUpdateProfileMutation, useChangePasswordMutation, useUpdateProfileImageMutation } = userApi
