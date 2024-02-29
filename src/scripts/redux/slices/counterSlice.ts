import {createSlice} from '@reduxjs/toolkit';

export interface Filter {
    product?: string,
    price?: number,
    brand?: string,
}
interface State {
    value: number,
    max: number,
    filter: Filter,
    onFilterSubmit: number,
    isFiltered: boolean
}
// Начальное значение
const initialState: State = {
    value: 1,
    max: 0,
    onFilterSubmit: 0,
    isFiltered: false,
    filter: {
        product: null,
        price: null,
        brand: null,
    }
};

const counterSlice = createSlice({

    name: 'pages',
    initialState: initialState,

    reducers: {
        increment: (state) => {
            if(state.value < state.max) state.value += 1;
        },
        decrement: (state) => {
            if(state.value > 1) state.value -= 1;
        },
        currentPage: (state) => {
            state.value = 1
        },
        maxPages: (state,action) => {
            state.max = action.payload
        },
        filterState: (state, action) => {
            console.log('filter: ',action.payload)
          state.filter = action.payload
        },
        filterSubmit: (state) => {
          state.onFilterSubmit += 1
        },
        setFiltered: (state,action) => {
            state.isFiltered = action.payload
        }
    },
});

export const { increment, decrement,setFiltered,maxPages, filterState, filterSubmit,currentPage} = counterSlice.actions;

export default counterSlice.reducer;
