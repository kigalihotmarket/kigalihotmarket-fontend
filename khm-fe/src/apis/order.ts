import {
  IPaged,
  IOrder,
  IOrderRequest,
} from "../types/common";
import api from "./api";

export const getAllOrders = async (params?: string): Promise<IPaged<IOrder[]>> => {
  const queryParams = params ? params : "";
  return (await api.get(`/order${queryParams}`)).data;
};

export const createOrder = async (
  data: IOrderRequest
): Promise<IOrder> => {
  return (await api.post("/order", data)).data.data;
};

export const updateOrder = async (
  id: string,
  data: FormData,
): Promise<IOrder> => {
  return (await api.put(`/order/${id}`, data)).data;
};

export const deleteOrder = async (id: string): Promise<number> => {
  return (await api.delete(`/order/${id}`)).data;
};