import { Request, Response } from "express";
import { User } from "../../db/entities/user.entity";

// TODO: Use qb
export const getAllUserConversations = async (
  request: Request,
  response: Response
) => {
  const id = Number.parseInt(request.params.id);

  const user = await request.em.findOneOrFail(User, id, {
    populate: [
      "conversations",
      "conversations.messages",
      "conversations.participants",
    ],
  });

  response.json(user?.conversations);
};

export const getUserById = async (request: Request, response: Response) => {
  const id = Number.parseInt(request.params.id);

  const user = await request.em.findOne(User, id);

  response.json(user);
};

export const getAllUsers = async (request: Request, response: Response) => {
  const { offset, limit } = request.query;
  const qb = request.em.createQueryBuilder(User);
  qb.select("*");

  if (offset) {
    qb.offset(Number.parseInt(offset as string));
  }

  if (limit) {
    qb.limit(Number.parseInt(limit as string));
  }

  const users = await qb.getResult();

  response.json(users);
};
