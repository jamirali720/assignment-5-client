import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { RootState } from "../store";

const initialState: ProductState = {
  cartItems: [],
  totalAmount: 0,
  subtotal: 0,
  shippingInfo: {
    name: "",
    email: "",
    phoneNo: "",
    address: "",
  },
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      const exists = state.cartItems.find(
        (item: Inputs) => item._id === payload._id
      );
      if (exists) {
        state.cartItems = state.cartItems.map((item: Inputs) =>
          item._id === payload._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        toast.success(
          `Cart ${payload.name} Item has been increased successfully`,
          {
            position: "top-center",
          }
        );
      } else {
        state.cartItems.push({ ...payload, quantity: 1 });
        toast.success(`${payload.name} added successfully`, {
          position: "top-center",
        });
      }
    },

    removeItem: (state, { payload }) => {
      state.cartItems = state.cartItems.filter(
        (item: Inputs) => item._id !== payload
      );
      toast.success("Cart Item has been removed successfully", {
        position: "top-center",
      });
    },
    clearCartItems: (state) => {
      state.cartItems = [];

      state.shippingInfo = {
        name: "",
        email: "",
        phoneNo: "",
        address: "",
      };     
      state.totalAmount = 0;
    },
    setTotalAmount: (state, action) => {
      state.totalAmount = action.payload.totalAmount;
      state.subtotal = action.payload.subtotal;
    },
   

    setShippingInfo: (state, action) => {
      const shippingObject = {
        name: action.payload.name,
        email: action.payload.email,       
        address: action.payload.address,       
        phoneNo: action.payload.phoneNo,       
      };
      state.shippingInfo = shippingObject;
    },
  },
});

export const {
  addToCart, 
  setTotalAmount,
  setShippingInfo,
  removeItem,
  clearCartItems,
} = cartSlice.actions;
export default cartSlice.reducer;

export const cartItems = (state: RootState) => state.cart.cartItems;
