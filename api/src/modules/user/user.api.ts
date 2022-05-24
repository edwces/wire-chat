import { Router } from "express";
import {
  getAllUserConversations,
  getUserById,
  getAllUsers,
} from "./user.controller";

export const user = Router();

user.get("/:id", getUserById);
user.get("/:id/conversations", getAllUserConversations);
user.get("/", getAllUsers);
