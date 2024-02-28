import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {productSlice} from "@/scripts/redux/slices/productsSlice";

export interface ProductState {
    productList: string[]; // Замените тип на фактический
}
export interface item {
    brand?: string,
    id: string,
    price?: number,
    product?: string,
}
export interface ItemListState {
    itemsList: item[]

}
const initalItemsList: ItemListState = {
    itemsList: []
}

export const productItemSlice = createSlice({
    name: 'productsItems',
    initialState: initalItemsList,
    reducers: {
        fillListOfItems: (state, action: PayloadAction<item[]>) => {
            state.itemsList = action.payload;
        }
    },
});

export const {fillListOfItems} = productItemSlice.actions


export default productItemSlice.reducer;

