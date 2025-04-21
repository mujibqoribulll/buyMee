import { createAsyncThunk } from "@reduxjs/toolkit";
import { HOME } from "../service";
import { RootState } from "../store";
import { setErrorMessage } from "../helper/validation";
import { ServiceGetParams, setPaginationData, setPaginationParams } from "../helper";


export const getAllProduct = createAsyncThunk(
    'home/getAllProduct',
    async ({ params, paginate }: ServiceGetParams, { rejectWithValue, getState }) => {

        try {
            const { home } = getState() as RootState
            if (home?.product?.data?.skip < home?.product?.data?.total || paginate === 'reset') {
                
                params = setPaginationParams(params, home?.product?.data, paginate)
                let response = await HOME.getAllProduct(params);
                response.data.skip =  response?.data?.skip
                response.data.limit = response?.data?.limit
                response.data.total = response?.data?.total
                response.data.products = setPaginationData(
                    home?.product?.data?.products,
                    response.data?.products,
                    paginate,
                )
                return response.data;
            } else {
                return null
            }


        } catch (error: any) {
            return rejectWithValue(setErrorMessage(error));
        }
    },
);