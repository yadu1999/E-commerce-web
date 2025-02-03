import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../feautres/cartSlice";
import userReducer from '../feautres/userSlice';
import themeReducer from "../feautres/themeSlice";

const store = configureStore({
  reducer: {
    allCart: cartReducer,
    user: userReducer,
    theme: themeReducer,
  },
});
export default store