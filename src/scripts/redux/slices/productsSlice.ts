import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProductState {
    productList: string[]; // Замените тип на фактический
}
export interface item {
    brand?: string,
    id: string,
    price?: number,
    product?: string,
}

const initialStateOfIds: ProductState = {
    productList: [],
};

export const productSlice = createSlice({
    name: 'products',
    initialState: initialStateOfIds,
    reducers: {
        fillListOfId: (state, action: PayloadAction<string[]>) => {
            state.productList = action.payload;
        }
    },
});

export const { fillListOfId} = productSlice.actions;


export default productSlice.reducer;
