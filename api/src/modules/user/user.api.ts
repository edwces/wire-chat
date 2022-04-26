import { Router } from "express";
import { getAllUserConversations } from "./user.controller";

export const user = Router();

user.get("/:id/conversations", getAllUserConversations);
