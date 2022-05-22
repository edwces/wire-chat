import { Request, Response } from "express";
import { User } from "../../db/entities/user.entity";

// TODO: Use qb
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

export const getUserById = async (request: Request, response: Response) => {
  const id = Number.parseInt(request.params.id);

  const user = await request.em.findOne(User, id);

  response.json(user);
};
