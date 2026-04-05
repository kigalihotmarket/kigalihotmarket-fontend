import {
  IPaged,
  IDelivery,
  DeliveryFormData,
  IDeliveryRequest,
} from "../types/common";
import api from "./api";

export const getAllDelivery = async (params?: string): Promise<IPaged<IDelivery[]>> => {
  const queryParams = params ? params : "";
  return (await api.get(`/delivery${queryParams}`)).data;
};

export const createDelivery = async (
  data: DeliveryFormData
): Promise<IDelivery> => {
  return (await api.post("/delivery", data)).data;
};

export const updateDelivery = async (
  id: string,
  data: Partial<IDeliveryRequest>,
): Promise<IDelivery> => {
  return (await api.put(`/delivery/${id}`, data)).data;
};

export const deleteDelivery = async (id: string): Promise<number> => {
  return (await api.delete(`/delivery/${id}`)).data;
};