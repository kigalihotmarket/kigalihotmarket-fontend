import { IPaged, IProduct } from "../types/common";
import api from "./api";

export const getAllProducts = async (
  params?: string,
): Promise<IPaged<IProduct[]>> => {
  const queryParams = params ? params : "";
  return (await api.get(`/product${queryParams}`)).data;
};

export const getAllFeaturedProducts = async (
  params?: string,
): Promise<IPaged<IProduct[]>> => {
  const queryParams = params ? params : "";
  return (await api.get(`/product/featured${queryParams}`)).data;
};

export const createProduct = async (data: FormData): Promise<IProduct> => {
  return (await api.post("/product", data)).data;
};

export const updateProduct = async (
  id: string,
  data: FormData,
): Promise<IProduct> => {
  console.log("sent data:", data);
  return (await api.put(`/product/${id}`, data)).data;
};

export const deleteProduct = async (id: string): Promise<number> => {
  return (await api.delete(`/product/${id}`)).data;
};

export const getProductById = async (id: string): Promise<IProduct> => {
  const response = await api.get(`/product/${id}`);
  return response.data.data;
};

