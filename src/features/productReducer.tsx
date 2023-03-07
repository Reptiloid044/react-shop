import {  createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getProducts, } from '../api';
import { RootState } from '../app/store';
import { InitialStateForProducts, Product } from '../types/product';

const initialState: InitialStateForProducts = {
  products: [],
  productsInBasket: [],
  loading: false,
  error: '',
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addToBasket: (state, action: PayloadAction<number>) => {
      const currentProduct = state.products.find(product => product.id === action.payload);
      if (!currentProduct) {
        return;
      }
      state.productsInBasket.push(currentProduct);
    },
    takefromBasket: (state, action: PayloadAction<number>) => {
      state.productsInBasket = state.productsInBasket.filter(product => product.id !== action.payload);
     },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
  },
  
  extraReducers: (builder) => {
    builder.addCase(init.fulfilled, (state, action) => {
      state.products = action.payload;
      state.loading = false;
    });
    builder.addCase(init.pending, (state, action) => {
      state.loading = true;
      console.log('Loading Products');
     });
    builder.addCase(init.rejected, (state, action) => {
      state.loading = false;
      state.error = 'Error Products';
      console.log('Rejected Products');
    });
  },
});

export const { actions } = productsSlice;
export const {addToBasket, takefromBasket, addProduct} = productsSlice.actions;
export const selectProduct = (state: RootState) => state.products;
export const productsInBasket = (state: RootState) => state.products.productsInBasket;

export default productsSlice.reducer;

export const init = createAsyncThunk('phones/get', async () => {

  return getProducts();
});
