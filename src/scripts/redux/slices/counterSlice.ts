import {createSlice} from '@reduxjs/toolkit';

// Начальное значение
const initialState = {
    value: 1,
    max: 0,
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
        maxPages: (state,action) => {
            state.max = action.payload
        }
    },
});

export const { increment, decrement,maxPages} = counterSlice.actions;

export default counterSlice.reducer;
