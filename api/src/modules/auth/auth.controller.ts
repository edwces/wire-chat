import { Request, Response } from "express";
import { User } from "../../db/entities/user.entity";
import argon2 from "argon2";

export const registerUser = async (request: Request, response: Response) => {
  const { email, password, name } = request.body;

  // check if user with same email exists
  const user = await request.em.count(User, { email });
  if (user) return response.status(401);

  // create new user with hashed password
  const hashedPassword = await argon2.hash(password);
  const newUser = request.em.create(User, {
    email,
    password: hashedPassword,
    name,
  });
  await request.em.persistAndFlush(newUser);

  // TODO: create refresh and access tokens

  response.json({ success: true });
};

export const loginUser = async (request: Request, response: Response) => {
  const { email, password } = request.body;

  // check if user with the email was found
  const user = await request.em.findOne(User, { email });
  if (!user) return response.status(401);

  // check if password is correct
  const isValid = argon2.verify(user.password, password);
  if (!isValid) return response.status(401);

  // TODO: create refresh token and access token
  // TODO: return user details without password
  response.json(user);
};
