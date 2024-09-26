import { createSlice } from "@reduxjs/toolkit";


import { IBookingState } from "types/types";

const initialState: IBookingState = {
  remainingCost: 0,
  bookingId:"",
  bookingInfo: {
    bikeId: "",
    startTime: "",
    advanced: 0,
  },
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setBookingInfo: (state, action) => {
      const bookingObject = {
        bikeId: action.payload.bikeId,
        startTime: action.payload.startTime,
        advanced: action.payload.advanced
      };
      state.bookingInfo = bookingObject;
    },
    clearCartBooking: (state) => {
      state.bookingInfo = {
        bikeId: "",
        advanced: 0,
        startTime: "",
      };
      state.remainingCost = 0;
      state.bookingId = "";
    },
    setRemainingCost: (state, action) => {      
      state.remainingCost = action.payload.remainingCost;
      state.bookingId = action.payload.bookingId;
      
    },
  },
});

export const { setRemainingCost, setBookingInfo, clearCartBooking } =
  cartSlice.actions;
export default cartSlice.reducer;


