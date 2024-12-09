import { combineReducers } from "@reduxjs/toolkit";
import counterSlice from "../slices/dataSlice";
import authSlice  from "../slices/authSlice";

const rootReducers = combineReducers({
    counter: counterSlice,
    auth: authSlice,
});

export default rootReducers