import { Router } from "express";
import { loginUser, registerUser } from "./auth.controller";

export const auth = Router();

auth.post("/register", registerUser);
auth.post("/login", loginUser);
