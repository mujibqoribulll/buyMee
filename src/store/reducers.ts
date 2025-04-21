import { combineReducers } from "@reduxjs/toolkit";
import counterSlice from "../slices/dataSlice";
import authSlice from "../slices/authSlice";
import coreSlice from "../slices/coreSlice";
import homeSlice from "../slices/homeSlice";

const rootReducers = combineReducers({
    counter: counterSlice,
    auth: authSlice,
    core: coreSlice,
    home: homeSlice,
});

export default rootReducers