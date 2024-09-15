import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const teamApi = createApi({
  reducerPath: "teamApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://assignment-4-server-bice.vercel.app/api/teams",
  }),
  tagTypes: ["teams"],
  endpoints: (builder) => ({
    addTeamMember: builder.mutation({
      query: (data) => {
        console.log(data);
        return {
          url: "/create-team",
          method: "POST",
          body: data,
        };
      },
    }),
    getAllTeamMembers: builder.query({
      query: (query) => {
        const link = `/teams?name=${query}`;
        return {
          url: link,
          method: "GET",
        };
      },
      providesTags: ["teams"],
    }),
    getSingleTeamMember: builder.query({
      query: (id) => {
        return {
          url: `/single-team/${id}`,
          method: "GET",
        };
      },
      providesTags: ["teams"],
    }),
    updatedSingleTeam: builder.mutation({
      query: (data) => {
        return {
          url: `/update-team`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["teams"],
    }),
    deletedSingleTeamMember: builder.mutation({
      query: (id) => {
        return {
          url: `/delete-team/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["teams"],
    }),
  }),
});

export const {
  useAddTeamMemberMutation,
  useGetAllTeamMembersQuery,
  useGetSingleTeamMemberQuery,
  useUpdatedSingleTeamMutation,
  useDeletedSingleTeamMemberMutation,
} = teamApi;
