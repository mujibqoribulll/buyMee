import { createSlice } from "@reduxjs/toolkit";
import { loadingType } from "../store/types";
import { getAllCategory, getAllProduct } from "./homeThunk";


type InitialState = {
    loading: loadingType;
    data?: any;
    message?: any;
}

type HomeState = {
    product: InitialState
    category: InitialState
}

const initialState: HomeState = {
    product: {
        loading: 'idle',
        data: {},
        message: ''
    },
    category: {
        loading: 'idle',
        data: [],
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
        });

        builder.addCase(getAllCategory.pending, (state, action) => {
            state.category.loading = 'pending'
        });
        builder.addCase(getAllCategory.fulfilled, (state, action) => {
            if (action.payload) {
                state.category.loading = 'succeeded';
                state.category.data = action.payload;
            } else {
                state.category.loading = 'failed'
            }
        });
        builder.addCase(getAllCategory.rejected, (state, action) => {
            state.category.loading = 'failed',
                state.category.message = 'data gagal diambil'
        })
    }
})

export const { getAllProductReset } = homeSlice.actions

export default homeSlice.reducer