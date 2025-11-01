import api from "../apiConnector";
import { API_ENDPOINTS } from "../endpoint";

export const postRequest = async (payload: any): Promise<any> => {
  const res = await api.post(API_ENDPOINTS.REQUEST.BASE, payload);
  return res.data;
};

export const getSwapRequests = async (payload: any): Promise<any> => {
  const res = await api.get(`${API_ENDPOINTS.REQUEST.BASE}?status=${payload}`);
  return res.data;
};

export const getMySwapRequests = async (payload: any): Promise<any> => {
  const res = await api.get(
    `${API_ENDPOINTS.REQUEST.MY_REQUEST}?status=${payload}`
  );
  return res.data;
};

export const acceptRequest = async (requestId: string): Promise<any> => {
  const res = await api.post(
    `${API_ENDPOINTS.REQUEST.BASE}/${requestId}/approve`
  );
  return res.data;
};

export const rejectRequest = async (requestId: string): Promise<any> => {
  const res = await api.post(
    `${API_ENDPOINTS.REQUEST.BASE}/${requestId}/reject`
  );
  return res.data;
};
