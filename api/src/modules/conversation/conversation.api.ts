import { Router } from "express";
import { getAllConversationMessages } from "./conversation.controller";

export const conversation = Router();

conversation.get("/:id/messages", getAllConversationMessages);
