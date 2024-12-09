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
        });
        builder.addCase(postLogin.fulfilled, (state, action) => {
            console.log('action', JSON.stringify(action, null, 2))
            state.login.loading = 'succeeded';
            state.login.data = action.payload
        });
        builder.addCase(postLogin.rejected, (state, action: any) => {
            let error: any = action;
            state.login.loading = 'failed';
            state.login.code = error?.response?.data?.meta?.code || '';
            state.login.data = error?.response?.data?.data || {};
            state.login.message = setErrorMessage(error);
        });
        builder.addCase(postLogout.fulfilled, (state, action) => {
            state.logout.loading = 'succeeded'
        })
    },
})

// Action creators are generated for each case reducer function
export const { postLoginReset, postLogoutReset } = authSlice.actions

export default authSlice.reducer