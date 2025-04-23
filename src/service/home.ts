import axios from "axios";
import { ENDPOINTS } from "../constant/endpoint";

export const getAllProduct = (params: any) => {
    return axios.get(ENDPOINTS.HOME.PRODUCT, { params });
};

export const getAllProductWithCategory = (params: any, name: string) => {
    return axios.get(ENDPOINTS.HOME.PRODUCT_WITH_CATEGORY.replace(':name', name), { params });
};

export const getAllCategory = () => {
    return axios.get(ENDPOINTS.HOME.CATEGORY,);
};