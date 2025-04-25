import { combineReducers } from "@reduxjs/toolkit";
import counterSlice from "../slices/dataSlice";
import authSlice from "../slices/authSlice";
import coreSlice from "../slices/coreSlice";
import homeSlice from "../slices/homeSlice";
import cartSlice from "../slices/cartSlice";

const rootReducers = combineReducers({
    counter: counterSlice,
    auth: authSlice,
    core: coreSlice,
    home: homeSlice,
    cart: cartSlice,
});

export default rootReducers