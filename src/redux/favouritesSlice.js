import { createSlice } from "@reduxjs/toolkit";

const favouriteSlice = createSlice({
  name: "favourites",
  initialState: {
    favourites: [],
    search: "",
  },
  reducers: {
    addToFavourite: (state, action) => {
      const alreadyExists = state.favourites.some(
        (prod) => prod.id === action.payload.id
      );
      if (!alreadyExists) {
        state.favourites.push(action.payload);
      }
    },
    removeFromFavourites: (state, action) => {
      state.favourites = state.favourites.filter(
        (prod) => prod.id !== action.payload.id
      );
    },
    searchText: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { addToFavourite, removeFromFavourites, searchText } =
  favouriteSlice.actions;
export default favouriteSlice.reducer;
