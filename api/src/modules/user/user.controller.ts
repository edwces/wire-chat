import { Request, Response } from "express";
import { User } from "../../db/entities/user.entity";
import sharp from "sharp";
import { wrap } from "@mikro-orm/core";
import { v4 } from "uuid";
import path from "node:path";

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

export const uploadAvatarImage = async (
  request: Request,
  response: Response
) => {
  const id = Number.parseInt(request.params.id);
  const pictureUuid = v4();
  await sharp(request.file?.buffer)
    .resize(100, 100)
    .jpeg({ quality: 50 })
    .toFile(
      path.resolve(__dirname, `../../../public/image/${pictureUuid}.jpeg`)
    );

  const user = await request.em.findOne(User, id);
  wrap(user).assign({ avatar: `${pictureUuid}.jpeg` });
  await request.em.flush();

  response.json(user);
};
