import axios from "axios";
import type { AxiosInstance, AxiosResponse } from "axios";
import { store } from "../store";
import { toast } from "sonner";
import { logoutUser } from "../store/reducers/authSlice";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config: any) => {
    const state = store.getState();
    const token = state.auth?.token;
    console.log("Requesting:", config.url, token);

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    toast.error("❌ Request setup failed");
    return Promise.reject(error);
  }
);

// ⚡ Handle all API errors globally
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (!error.response) {
      // Network error / timeout
      toast.error("⚠️ Network error — please check your connection");
      return Promise.reject(error);
    }

    const { status, data } = error.response;
    const message =
      data?.message ||
      data?.error ||
      "An unexpected error occurred. Please try again.";

    switch (status) {
      case 400:
        toast.error(`Bad Request: ${message}`);
        break;

      case 401:
        toast.error(`Unauthorized: ${message}`);
        store.dispatch(logoutUser());
        break;

      case 403:
        toast.error("You don't have permission to perform this action");
        break;

      case 404:
        toast.error("Requested resource not found");
        break;

      case 500:
        toast.error("Internal Server Error — please try later");
        break;

      default:
        toast.error(`Error (${status}): ${message}`);
    }

    return Promise.reject(error);
  }
);

export default api;
