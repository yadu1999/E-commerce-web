import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchProducts } from "../utils/fetchProducts";
import axios from "axios";

export const loadProducts = createAsyncThunk("cart/loadProducts", async () => {
  return await fetchProducts();
});

// Currently calling directly and i used .env if proper needed
export const loadCategories = createAsyncThunk("cart/loadCategories", async () => {
  const response = await axios.get("https://fakestoreapi.com/products/categories");
  console.log(response.data, 'response.data')
  return response.data;
});



const initialState = {
  cart: [],
  items: [], 
  totalQuantity: 0,
  totalPrice: 0,
  product: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      toast.success("Your product was added successfully");
      let find = state.cart.findIndex((item) => item.id === action.payload.id);
      if (find >= 0) {
        state.cart[find].quantity += 1;
      } else {
        state.cart.push(action.payload);
      }
    },

    getCartTotal: (state) => {
      let { totalQuantity, totalPrice } = state.cart.reduce(
        (cartTotal, cartItem) => {
          const { price, quantity } = cartItem;
          const itemTotal = price * quantity;
          cartTotal.totalPrice += itemTotal;
          cartTotal.totalQuantity += quantity;
          return cartTotal;
        },
        { totalPrice: 0, totalQuantity: 0 }
      );
      state.totalPrice = parseInt(totalPrice.toFixed(2));
      state.totalQuantity = totalQuantity;
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },

    increaseItemQuantity: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    },

    decreaseItemQuantity: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
    },

    productDetail: (state, action) => {
      state.product = [action.payload];
    },

    filterCategory: (state, action) => {
      state.product = state.items.filter((item) => item.category === action.payload);
    },

    // Add the clearCart action
    clearCart: (state) => {
      state.cart = []; // Empty the cart
      state.totalQuantity = 0; // Reset total quantity
      state.totalPrice = 0; // Reset total price
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadProducts.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});

export const {
  addToCart,
  clearCart,
  getCartTotal,
  removeFromCart,
  increaseItemQuantity,
  decreaseItemQuantity,
  productDetail,
  filterCategory,
} = cartSlice.actions;

export default cartSlice.reducer;


