import { IPaged, IPayment, MobileFormData } from "@/types/common";
import api from "./api";

export const getAllPayments = async (
  params?: string,
): Promise<IPaged<IPayment[]>> => {
  const queryParams = params ? params : "";
  return (await api.get(`/payment${queryParams}`)).data;
};

export const createPayment = async (data: MobileFormData): Promise<IPayment> => {
  return (await api.post("/payment", data)).data;
};

export const updatePayment = async (
  id: string,
  data: FormData,
): Promise<IPayment> => {
  return (await api.put(`/payment/${id}`, data)).data;
};


export const deletePayment = async (id: string): Promise<number> => {
  return (await api.delete(`/payment/${id}`)).data;
};