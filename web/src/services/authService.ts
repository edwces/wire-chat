import { axios } from "../lib/axios";
import {
  LoginFields,
  LoginResponse,
  RegisterFields,
} from "../types/interfaces";
import { createAuthHeader } from "./tokenService";

export function login(values: LoginFields): Promise<LoginResponse> {
  return axios.post("/auth/login", values).then((response) => response.data);
}

export function register(values: RegisterFields): Promise<void> {
  return axios.post("/auth/register", values).then((response) => response.data);
}

export function refresh(token: string): Promise<LoginResponse> {
  return axios
    .get("/auth/refresh", { headers: createAuthHeader(token) })
    .then((response) => response.data);
}

export function getTicket(token: string): Promise<{ ticket: string }> {
  return axios
    .get("/auth/ticket", { headers: createAuthHeader(token) })
    .then((response) => response.data);
}
