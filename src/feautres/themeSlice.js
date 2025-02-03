
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: localStorage.getItem("darkMode") === "true", 
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem("darkMode", state.darkMode); 
    },
  },
});

export const { toggleDarkMode } = themeSlice.actions;
export const selectDarkMode = (state) => state.theme.darkMode; 
export default themeSlice.reducer;
