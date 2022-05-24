import { Router } from "express";
import {
  createNewConversation,
  getAllConversationMessages,
  getAllParticipants,
} from "./conversation.controller";

export const conversation = Router();

conversation.get("/:id/messages", getAllConversationMessages);
conversation.get("/:id/participants", getAllParticipants);
conversation.post("/", createNewConversation);
