import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "redux/store";


const initialState  = {
  user: null,
  token: null,
  role: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, {payload}) => {     
      state.user = payload.user;
      state.token = payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null; 
    },
    setUserRole: (state, {payload}) => {
      state.role = payload.role;      
    },
  },
});

export const { setCredentials, logout, setUserRole } = authSlice.actions;
export default authSlice.reducer;


export const userToken = (state:RootState) => state.auth.token;
export const userInfo = (state:RootState) => state.auth.user;
export const userRole = (state:RootState) => state.auth.role;