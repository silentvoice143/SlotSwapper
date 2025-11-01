import api from "../apiConnector";
import { API_ENDPOINTS } from "../endpoint";

export const postEvent = async (payload: any): Promise<any> => {
  const res = await api.post(API_ENDPOINTS.EVENT.CREATE, payload);
  return res.data;
};

export const getEventsByDate = async (payload: any): Promise<any> => {
  const res = await api.get(API_ENDPOINTS.EVENT.GET_ALL, { params: payload });
  return res.data;
};

export const getSwappableEvents = async (): Promise<any> => {
  const res = await api.get(API_ENDPOINTS.EVENT.GET_SWAPPABLE);
  return res.data;
};

export const changeEventStatus = async (
  eventId: string,
  status: string
): Promise<any> => {
  const res = await api.patch(
    `${API_ENDPOINTS.EVENT.BASE}/${eventId}/status/${status}`
  );
  return res.data;
};
