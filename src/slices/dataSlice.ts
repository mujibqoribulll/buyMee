import { createSlice } from "@reduxjs/toolkit"

export interface CounterState {
    value: number;
    token: any;
}

const initialState: CounterState = {
    value: 0,
    token: {},
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
    },
})

// Action creators are generated for each case reducer function
// export const { setData } = counterSlice.actions

export default counterSlice.reducer