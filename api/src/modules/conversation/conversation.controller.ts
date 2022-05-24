import { Request, Response } from "express";
import { Conversation } from "../../db/entities/conversation.entity";
import { User } from "../../db/entities/user.entity";

export const getAllConversationMessages = async (
  request: Request,
  response: Response
) => {
  const id = Number.parseInt(request.params.id);

  const conversation = await request.em.findOne(Conversation, id, {
    populate: ["messages", "messages.participant"],
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

export const createNewConversation = async (
  request: Request,
  response: Response
) => {
  const { participants } = request.body;

  const conversation = new Conversation();
  const references = (ids: number[]) =>
    ids.map((id) => request.em.getReference(User, id));
  conversation.participants.add(...references(participants));

  await request.em.persistAndFlush(conversation);

  response.json(conversation);
};
