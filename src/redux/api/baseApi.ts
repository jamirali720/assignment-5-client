import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError, 
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout, setCredentials } from "../../redux/features/authSlice";
import { RefreshResult } from "types/types";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://assignment-5-server-two.vercel.app/api",
  // baseUrl: "http://localhost:5000/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // fetching to get a new access token with fetch

    // const res = await fetch("https://assignment-5-server-two.vercel.app/api/auth/refresh-token", {
    //   method: "POST",
    //   credentials: "include",
    // });

    // const refreshResult = await res.json();

    // fetching to get a new access token with base query
    const refreshResult = (await baseQuery(
      "/auth/refresh-token",
      api,
      extraOptions
    )) as RefreshResult;

    if (refreshResult.data) {
      const user = (api.getState() as RootState).auth.user;
      api.dispatch(
        setCredentials({
          user,
          token: refreshResult.data?.token,
        })
      );
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["bikes", "images", "teams", "users", "booking"],
  endpoints: () => ({}),
});
