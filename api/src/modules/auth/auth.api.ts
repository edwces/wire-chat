import { Router } from "express";
import { requireAuth } from "../../middleware";
import {
  loginUser,
  registerUser,
  refreshToken,
  getAuthTicket,
} from "./auth.controller";

export const auth = Router();

auth.post("/register", registerUser);
auth.post("/login", loginUser);
auth.get("/refresh", requireAuth, refreshToken);
auth.get("/ticket", requireAuth, getAuthTicket);
