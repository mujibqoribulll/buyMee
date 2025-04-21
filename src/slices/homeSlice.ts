import { createSlice } from "@reduxjs/toolkit";
import { loadingType } from "../store/types";
import { getAllProduct } from "./homeThunk";


type InitialState = {
    loading: loadingType;
    data?: any;
    message?: any;
}

type HomeState = {
    product: InitialState
}

const initialState: HomeState = {
    product: {
        loading: 'idle',
        data: {},
        message: ''
    }
}


export const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        getAllProductReset: state => {
            state.product = initialState.product;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllProduct.pending, (state, action) => {
            state.product.loading = 'pending'
        });
        builder.addCase(getAllProduct.fulfilled, (state, action) => {
            if (action?.payload) {
                state.product.loading = 'succeeded'
                state.product.data = action.payload
            } else {
                state.product.loading = 'succeeded'
            }
        });
        builder.addCase(getAllProduct.rejected, (state, action) => {
            state.product.loading = 'failed'
            state.product.message = 'data gagal diambil'
        })
    }
})

export const { getAllProductReset } = homeSlice.actions

export default homeSlice.reducer