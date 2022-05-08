import { Router } from "express";
import {
  getAllConversationMessages,
  getAllParticipants,
} from "./conversation.controller";

export const conversation = Router();

conversation.get("/:id/messages", getAllConversationMessages);
conversation.get("/:id/participants", getAllParticipants);
