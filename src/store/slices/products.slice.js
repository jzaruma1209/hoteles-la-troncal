import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const productsSlice = createSlice({
  name: "products",
  initialState: null,
  reducers: {
    setProducts: (state, action) => action.payload,
  },
});
export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;

export const getHotelsThunk = (url) => (dispatch) => {
  // es una función que retorna otra función
  // esto es para hacer peticiones asincronas
  axios
    .get(url)
    .then((res) => dispatch(setProducts(res.data)))
    .catch((err) => console.error(err));
};
