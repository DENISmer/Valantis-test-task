import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProductState {
    productList_Id: string[]; // Замените тип на фактический
}
export interface item {
    brand?: string,
    id: string,
    price?: number,
    product?: string,
}

const initialStateOfIds: ProductState = {
    productList_Id: [],
};

export const productSlice = createSlice({
    name: 'products',
    initialState: initialStateOfIds,
    reducers: {
        fillListOfId: (state, action: PayloadAction<string[]>) => {
            state.productList_Id = action.payload;
        }
    },
});

export const { fillListOfId} = productSlice.actions;


export default productSlice.reducer;
