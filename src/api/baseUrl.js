import axios from "axios";
import i18n from "../i18n";
import { errorToast } from "../helper/toastMessage";
// const url = "https://backend-staging.qaff.com/api";
// const token = localStorage.getItem("token");
export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-type": "application/json",
    "Accept-language": i18n.language === "ar" ? "ar" : "en",
    // Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    /**
     *  else if (error.response.status === 402) {
      throw error;
    }
     */
    if (error?.message === "Network Error") {
      errorToast("Network Error");
    }
    if (error.response.status === 401) {
      errorToast(error.response.data.message);
      window.location.reload();
      throw error;
    } else if (
      error.response.status === 406 ||
      error.response.status === 422 ||
      error.response.status === 419
    ) {
      if (
        error.response.data.message === "" ||
        error?.response?.data?.data?.account_found_nd_profile_not_created
      ) {
      } else {
        errorToast(error?.response?.data?.message);
      }
      throw error;
    } else {
      throw errorToast(error?.response?.data?.message);
    }
  }
);
