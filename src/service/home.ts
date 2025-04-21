import axios from "axios";
import { ENDPOINTS } from "../constant/endpoint";

export const getAllProduct = (params: any) => {
    return axios.get(ENDPOINTS.HOME.PRODUCT, {params});
};