import { Request, Response } from "express";
import { User } from "../../db/entities/user.entity";

export const getAllUserConversations = async (
  request: Request,
  response: Response
) => {
  const id = Number.parseInt(request.params.id);

  const user = await request.em.findOneOrFail(User, id, {
    populate: ["conversations", "conversations.messages"],
  });

  response.json(user?.conversations);
};
