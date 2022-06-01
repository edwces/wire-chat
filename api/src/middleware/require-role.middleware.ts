import { NextFunction, Request, Response } from "express";
import { User } from "../db/entities/user.entity";
import { UserRole } from "../db/entities/user.entity";

export const requireRole =
  (role: UserRole) =>
  async (request: Request, response: Response, next: NextFunction) => {
    const user = await request.em.findOne(
      User,
      response.locals.user.id! as number
    );
    if (user?.role !== role)
      return response.status(400).send("Permission denied");
    next();
  };
