import { axios } from "../lib/axios";
import { LoginFields, RegisterFields } from "../types/interfaces";

export function login(values: LoginFields) {
  return axios.post("/auth/login", values).then((response) => response.data);
}

export function register(values: RegisterFields) {
  return axios.post("/auth/register", values).then((response) => response.data);
}
