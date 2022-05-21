import { axios } from "../lib/axios";
import {
  LoginFields,
  LoginResponse,
  RegisterFields,
} from "../types/interfaces";

export function login(values: LoginFields): Promise<LoginResponse> {
  return axios.post("/auth/login", values).then((response) => response.data);
}

export function register(values: RegisterFields): Promise<void> {
  return axios.post("/auth/register", values).then((response) => response.data);
}
