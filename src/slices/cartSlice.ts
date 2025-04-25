import { createSlice } from "@reduxjs/toolkit";
import { InitialState } from "./homeSlice";




const initialState: InitialState = {
    loading: 'idle',
    data: [],
    message: ''
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCartStart: (state) => {
            state.loading = 'pending'
            state.message = ''
        },
        addToCartSuccess: (state, action) => {
            if (action?.payload) {
                let newDataCart = [...state.data]
                let payload: any = {}
                payload.title = action.payload?.title
                payload.id = action.payload?.id
                payload.description = action.payload?.description
                payload.price = action.payload?.price
                payload.qty = 1
                let findIndex = newDataCart?.findIndex(item => item?.id === action.payload?.id)
                console.log(findIndex)
                if (findIndex === -1) { //add it if it doesn't exist yet
                    state.data = [payload, ...newDataCart]
                    state.loading = 'succeeded'
                    state.message = 'Successfully added to your cart.'
                } else { //change if data already exists
                    let newUpdateData = newDataCart?.map(item => {
                        if (item?.id === action?.payload?.id) {
                            return { ...item, qty: item?.qty + 1 }
                        }
                        return item
                    })
                    state.data = newUpdateData
                    state.loading = 'succeeded'
                    state.message = 'Successfully added to your cart.'
                }
            }
        },
        addToCartRejected: (state) => {
            state.loading = 'failed'
            state.message = 'Unable to add product. Please try again.'
        },
        removeFromCart: (state, action) => { },
        singleUpdate: (state, action) => { }

    }
})

export const { addToCartSuccess, addToCartRejected, addToCartStart } = cartSlice.actions


export default cartSlice.reducer