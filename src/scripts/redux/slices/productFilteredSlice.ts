import {createSlice} from "@reduxjs/toolkit";

interface onePageFilteredIds {
    filteredOnePage: string[]
    idsFilteredLists: [][]
}
export const FilteredIds: onePageFilteredIds= {
    filteredOnePage: [],
    idsFilteredLists: [[]]
}

export const filteredSlice = createSlice({
    name: 'filteredSlice',
    initialState: FilteredIds,
    reducers: {
        filtered: (state, action) => {
            state.idsFilteredLists = action.payload
        }
    }
})

export const {filtered} = filteredSlice.actions
export default filteredSlice.reducer
