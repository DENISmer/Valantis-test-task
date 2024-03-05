import {combineReducers, configureStore} from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import productSlice from "./productsSlice";
import productItemSlice from "@/scripts/redux/slices/productItemsSlice";
import filteredSlice from "@/scripts/redux/slices/productFilteredSlice";

const rootReducer = combineReducers({
    filterLists: filteredSlice,
    itemsList: productItemSlice,
    products: productSlice,
    counter: counterReducer,
})
export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>
