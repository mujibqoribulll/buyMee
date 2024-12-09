import axios from "axios";
import { ENDPOINTS } from "../constant/endpoint";



export const postLogin = (data: any) => {
    return axios.post(ENDPOINTS.AUTH.LOGIN, data);
  };