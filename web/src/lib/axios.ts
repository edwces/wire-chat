import axiosStatic from "axios";

export const axios = axiosStatic.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
