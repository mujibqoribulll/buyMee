import { createSlice } from "@reduxjs/toolkit";
import { postLogin, postLogout } from "./authThunk";
import { jwtDecode } from "jwt-decode";

interface CoreState {
    auth: boolean | any;
    token: string | any;
    me: any;
}

const initialState: CoreState = {
    auth: false,
    token: '',
    me: {},
};

export const coreSlice = createSlice({
    name: 'core',
    initialState,
    reducers: {},
    extraReducers: builder => {

        builder.addCase(postLogin.fulfilled, (state, action) => {
            let me = jwtDecode(action?.payload?.accessToken)
            state.me = me;
            state.auth = true;
            state.token = action?.payload?.accessToken;
        });
        builder.addCase(postLogout.fulfilled, (state, action) => {
            state.auth = false;
            state.token = '';
            state.me = {};
        })
    }
});


export default coreSlice.reducer