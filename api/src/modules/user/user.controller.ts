import { Request, Response } from "express";
import { User } from "../../db/entities/user.entity";

export const getAllUserConversations = async (
  request: Request,
  response: Response
) => {
  const id = Number.parseInt(request.params.id);

  const user = await request.em.findOneOrFail(User, id, {
    populate: ["participants", "participants.conversation"],
  });

  response.json(user?.participants);
};
