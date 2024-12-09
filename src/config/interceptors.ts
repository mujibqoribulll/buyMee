import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import CONFIGS from "./";
import { store } from "../store";
import { postLogout } from "../slices/authThunk";

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
    config.baseURL = CONFIGS.BASE_URL;
    // console.log('config44', config)
    // const {token, auth} = store.getState().core;
    // if (auth) {
    //   config.headers = {
    //     ...config.headers,
    //     Authorization: 'Bearer ' + token,
    //   };
    // }
    return config;
  };

  const onRequestError = (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  };
  
  const onResponse = (response: AxiosResponse): AxiosResponse => {
    return response;
  };
  
  const onResponseError = (error: any): Promise<AxiosError> => {
    if (error?.response?.data?.meta?.code === 403) {
      store.dispatch(postLogout());
    }
    return Promise.reject(error);
  };

  export const interceptors = () => {
    axios.interceptors.request.use(onRequest, onRequestError);
    axios.interceptors.response.use(onResponse, onResponseError);
    return axios;
  };