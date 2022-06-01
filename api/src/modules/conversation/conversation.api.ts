import { Router } from "express";
import { requireAuth } from "../../middleware";
import {
  createNewConversation,
  getAllConversationMessages,
  getAllParticipants,
} from "./conversation.controller";

export const conversation = Router();

conversation.get("/:id/messages", requireAuth, getAllConversationMessages);
conversation.get("/:id/participants", requireAuth, getAllParticipants);
conversation.post("/", requireAuth, createNewConversation);
