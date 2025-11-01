import api from "../apiConnector";
import { API_ENDPOINTS } from "../endpoint";

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  accessToken?: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

export const registerUser = async (
  payload: RegisterPayload
): Promise<AuthResponse> => {
  const res = await api.post(API_ENDPOINTS.AUTH.REGISTER, payload);
  return res.data;
};

export const loginUser = async (
  payload: LoginPayload
): Promise<AuthResponse> => {
  const res = await api.post(API_ENDPOINTS.AUTH.LOGIN, payload);
  return res.data;
};

export const logoutUserApi = async (): Promise<{
  success: boolean;
  message: string;
}> => {
  const res = await api.post(API_ENDPOINTS.AUTH.LOGOUT);
  return res.data;
};
