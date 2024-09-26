import { createSlice } from "@reduxjs/toolkit";


type TState = {
  searchTerm: string;
  rating: number;
  brand: string;
  model: string;
  year: string;
  cc: string;
};

const initialState: TState = {
  searchTerm: "",
  rating: 0, 
  brand: "All",
  model: "All",
  year: "All",
  cc: "All",
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
    setBrand: (state, action) => {
      console.log(action.payload);
      state.brand = action.payload;
    },
    setModel: (state, action) => {
      state.model = action.payload;
    },
    setYear: (state, action) => {
      state.year = action.payload;
    },
    setCc: (state, action) => {
      state.cc = action.payload;
    },
    clearFilter: (state) => {
      state.brand = "All";
      state.model = "All";
      state.year = "All";     
      state.cc = "All";
    },
  },
});

export const { setSearchTerm,clearFilter,  setModel, setCc, setYear, setBrand, setRating } =
  filterSlice.actions;

export default filterSlice.reducer;
