import { createAsyncThunk } from "@reduxjs/toolkit";
import { AUTH } from "../service";

export const postLogin = createAsyncThunk(
    'auth/postLogin',
    async (data: any, { rejectWithValue }) => {
        try {
            const response = await AUTH.postLogin(data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error);
        }
    },
);


export const postLogout = createAsyncThunk(
    'auth/postLogout',
    (data: undefined, {rejectWithValue}) => {
      return {};
    },
  );