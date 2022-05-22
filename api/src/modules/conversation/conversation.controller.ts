import { Request, Response } from "express";
import { Conversation } from "../../db/entities/conversation.entity";

export const getAllConversationMessages = async (
  request: Request,
  response: Response
) => {
  const id = Number.parseInt(request.params.id);

  const conversation = await request.em.findOne(Conversation, id, {
    populate: ["messages"],
  });

  response.json(conversation?.messages);
};

export const getAllParticipants = async (
  request: Request,
  response: Response
) => {
  const id = Number.parseInt(request.params.id);

  const conversation = await request.em.findOne(Conversation, id, {
    populate: ["participants"],
  });

  response.json(conversation?.participants);
};
