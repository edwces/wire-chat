import axiosStatic from "axios";

export const axios = axiosStatic.create({ baseURL: "http://localhost:3001" });
