import {combineReducers, configureStore} from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import productSlice from "./productsSlice";
import productItemSlice from "@/scripts/redux/slices/productItemsSlice";

const rootReducer = combineReducers({
    itemsList: productItemSlice,
    products: productSlice,
    counter: counterReducer,
})
export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>