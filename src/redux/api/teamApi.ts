import { baseApi } from "./baseApi";

// Define a service using a base URL and expected endpoints
export const teamApi = baseApi.injectEndpoints({  
  endpoints: (builder) => ({
    addTeamMember: builder.mutation({
      query: (data) => {
        console.log(data);
        return {
          url: "/teams/create-team",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["teams"],
    }),
    getAllTeamMembers: builder.query({
      query: (query) => {
        const link = `/teams/team-members?name=${query}`;
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
          url: `/teams/single-team/${id}`,
          method: "GET",
        };
      },
      providesTags: ["teams"],
    }),
    updatedSingleTeam: builder.mutation({
      query: (data) => {
        return {
          url: `/teams/update-team`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["teams"],
    }),
    deletedSingleTeamMember: builder.mutation({
      query: (id) => {
        return {
          url: `/teams/delete-team/${id}`,
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
