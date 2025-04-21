import { createSlice } from "@reduxjs/toolkit"
import InitialState from "../store/types"
import { postLogin, postLogout } from "./authThunk";
import { setErrorMessage } from "../helper/validation";

export interface AuthState {
    login: InitialState;
    logout: InitialState,

}

const initialState: AuthState = {
    login: {
        loading: 'idle',
        message: '',
        code: '',
        data: {},
        isLogin: false,
    },
    logout: {
        loading: 'idle',
        message: '',
    },
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        postLoginReset: state => {
            state.login = initialState.login;
        },
        postLogoutReset: state => {
            state.logout = initialState.logout;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(postLogin.pending, (state, action) => {
            state.login.loading = 'pending';
            state.login.isLogin = false;
        });
        builder.addCase(postLogin.fulfilled, (state, action) => {
            state.login.loading = 'succeeded';
            state.login.data = action.payload
            state.login.isLogin = true;
        });
        builder.addCase(postLogin.rejected, (state, action: any) => {
            let error: any = action;
            state.login.loading = 'failed';
            state.login.code = error?.response?.data?.meta?.code || '';
            state.login.data = error?.response?.data?.data || {};
            state.login.message = setErrorMessage(error);
            state.login.isLogin = false;
        });
        builder.addCase(postLogout.fulfilled, (state, action) => {
            state.logout.loading = 'succeeded'
        })
    },
})

// Action creators are generated for each case reducer function
export const { postLoginReset, postLogoutReset } = authSlice.actions

export default authSlice.reducer