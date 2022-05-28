import { Request, Response } from "express";
import { User } from "../../db/entities/user.entity";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { environment } from "../../config";

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

  response.sendStatus(201);
};

export const loginUser = async (request: Request, response: Response) => {
  const { email, password } = request.body;

  // check if user with the email was found
  const user = await request.em.findOne(User, { email });
  if (!user) return response.sendStatus(401);

  // check if password is correct
  const isValid = argon2.verify(user.password, password);
  if (!isValid) return response.sendStatus(401);

  const userDetails = {
    email: user.email,
    name: user.name,
    id: user.id,
  };

  const refreshToken = jwt.sign(userDetails, environment.jwt.refreshSecret, {
    expiresIn: 100 * 60 * 60 * 60,
  });
  const accessToken = jwt.sign(userDetails, environment.jwt.accessSecret, {
    expiresIn: 100 * 60 * 60,
  });

  response.json({ id: user.id, accessToken, refreshToken });
};

export const refreshToken = async (request: Request, response: Response) => {
  const accessToken = jwt.sign(
    response.locals.user!,
    environment.jwt.accessSecret
  );

  response.json({ id: response.locals.user.id, accessToken });
};
