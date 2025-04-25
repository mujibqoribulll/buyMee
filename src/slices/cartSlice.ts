import { createSlice } from "@reduxjs/toolkit";
import { InitialState } from "./homeSlice";

interface CartTypes {
    addToCart: InitialState
    cart: any
    removeFromCart: InitialState
    updateCart: InitialState
}


const initialState: CartTypes = {

    cart: [],
    addToCart: {
        loading: 'idle',
        message: ''
    },
    removeFromCart: {
        loading: 'idle',
        message: ''
    },
    updateCart: {
        loading: 'idle',
        message: ''
    }
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCartReset: (state) => {
            state.addToCart = initialState.addToCart
        },
        removeFromCartReset: (state) => {
            state.removeFromCart = initialState.removeFromCart
        },
        addToCartStart: (state) => {
            state.addToCart.message = ''
            state.addToCart.loading = 'pending'
        },
        addToCartSuccess: (state, action) => {
            if (action?.payload) {
                let newDataCart = [...state.cart]
                let payload: any = {}
                payload.title = action.payload?.title
                payload.id = action.payload?.id
                payload.description = action.payload?.description
                payload.price = action.payload?.price
                payload.qty = 1
                payload.image = action.payload?.image
                let findIndex = newDataCart?.findIndex(item => item?.id === action.payload?.id)
                console.log(findIndex)
                if (findIndex === -1) { //add it if it doesn't exist yet
                    state.cart = [payload, ...newDataCart]
                    state.addToCart.message = 'Successfully added to your cart.'
                    state.addToCart.loading = 'succeeded'
                } else { //change if data already exists
                    let newUpdateData = newDataCart?.map(item => {
                        if (item?.id === action?.payload?.id) {
                            return { ...item, qty: item?.qty + 1 }
                        }
                        return item
                    })
                    state.cart = newUpdateData
                    state.addToCart.message = 'Successfully added to your cart.'
                    state.addToCart.loading = 'succeeded'
                }
            }
        },
        addToCartRejected: (state) => {
            state.addToCart.loading = 'failed'
            state.addToCart.message = 'Unable to add product. Please try again.'
        },
        removeFromCartStart: (state) => {
            state.removeFromCart.loading = 'pending'
            state.removeFromCart.message = ''
        },
        removeFromCartSuccess: (state, action) => {
            if (action.payload) {
                let newDataCart = [...state.cart]
                let findIndex = newDataCart?.findIndex(item => item?.id === action.payload?.id)

                let result = newDataCart.splice(findIndex, 1)
                state.cart = newDataCart
                state.removeFromCart.loading = 'succeeded'
                state.removeFromCart.message = 'The product has been removed from your cart.'
            }
        },
        removeFromCartRejected: (state) => {
            state.removeFromCart.loading = 'failed'
            state.removeFromCart.message = 'Failed to remove item'
        },
        singleUpdate: (state, action) => { }

    }
})

export const { addToCartSuccess, addToCartRejected, addToCartStart, removeFromCartSuccess, removeFromCartStart, removeFromCartRejected, addToCartReset, removeFromCartReset } = cartSlice.actions


export default cartSlice.reducer