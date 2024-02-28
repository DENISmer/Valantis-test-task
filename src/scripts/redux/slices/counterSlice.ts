import {createEntityAdapter, createSlice} from '@reduxjs/toolkit';
import {fetchUserById} from "@/scripts/redux/thunk/requests";

// Начальное значение
const initialState = {
    value: 0,
};

const usersAdapter = createEntityAdapter();

const counterSlice = createSlice({

    name: 'users',
    initialState: usersAdapter.getInitialState({loadingStatus: 'idle', error: null}),

    reducers: {
        // increment: (state) => {
        //     state.value += 1;
        // },
        // decrement: (state) => {
        //     state.value -= 1;
        // },
        // incrementByAmount: (state, action) => {
        //     state.value += action.payload;
        // },
    },

    extraReducers: (builder) => {
        builder
            // Вызывается прямо перед выполнением запроса
            .addCase(fetchUserById.pending, (state) => {
                state.loadingStatus = 'loading';
                state.error = null;
            })
            // Вызывается, если запрос успешно выполнился
            .addCase(fetchUserById.fulfilled, (state, action) => {
                // Добавляем пользователя
                console.log(state)
                usersAdapter.addOne(state, action);
                state.loadingStatus = 'idle';
                state.error = null;
            })
            // Вызывается в случае ошибки
            .addCase(fetchUserById.rejected, (state, action) => {
                state.loadingStatus = 'failed';
                // https://redux-toolkit.js.org/api/createAsyncThunk#handling-thunk-errors
                state.error = action.error;
            });
    },
});

// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
