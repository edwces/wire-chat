import axiosStatic from "axios";
import { getAccessToken } from "../services";

export const axios = axiosStatic.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axios.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (!token) return config;
  config.headers!.Authorization = `Bearer ${token}`;
  return config;
});
