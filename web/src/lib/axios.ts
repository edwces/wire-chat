import axiosStatic from "axios";

export const axios = axiosStatic.create({ baseURL: process.env.NEXT_API_URL });
