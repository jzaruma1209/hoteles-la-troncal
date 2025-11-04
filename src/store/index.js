import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/products.slice";
import darkModeReducer from "./slices/darkMode.slice";

export default configureStore({
  reducer: {
    products: productsReducer,
    darkMode: darkModeReducer,
  },
});
