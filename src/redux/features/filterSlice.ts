import { createSlice } from "@reduxjs/toolkit";

type TState = {
  searchTerm: string;
  rating: number;
};

const initialState: TState = {
  searchTerm: "",
  rating: 0
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setRating: (state, action) => {
      state.rating = action.payload;
    },
  },
});

export const { setSearchTerm, setRating } = filterSlice.actions;

export default filterSlice.reducer;
