import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

import {
  getFromLocalStorage,
  removeLocalStorage,
  setToLocalStorage,
} from "./localStorage";

const API_ROOT = process.env.REACT_APP_API_URL;

const axiosClient = Axios.create({
  baseURL: API_ROOT,
  headers: {
    "Access-Control-Allow-Origin": API_ROOT || "",
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const storage = getFromLocalStorage();
    if (storage?.token) {
      config.headers!.Authorization = `Bearer ${storage.token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response: AxiosResponse<any, any>) => response,
  (error: AxiosError) => {
    const UNAUTHORIZED_STATUS_CODE = 401;
    if (error.response?.status === UNAUTHORIZED_STATUS_CODE) {
      const { token, user, ...newStorage } = getFromLocalStorage();
      removeLocalStorage();
      setToLocalStorage(newStorage);
    }

    return Promise.reject(error.response);
  }
);

export default axiosClient;
