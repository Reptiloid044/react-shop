import { configureStore } from '@reduxjs/toolkit';
import commentsReducer from '../features/commentReducer';
import productReducer from "../features/productReducer";


export const store = configureStore({
  reducer: {
    products: productReducer,
    comments: commentsReducer,
  }
})

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;