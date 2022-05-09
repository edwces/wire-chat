import { Router } from "express";
import { loginUser, registerUser } from "./auth.controller";

export const auth = Router();

auth.get("/register", registerUser);
auth.get("/login", loginUser);
