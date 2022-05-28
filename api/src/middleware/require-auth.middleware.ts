import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { environment } from "../config";

export function requireAuth(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const bearer = request.headers.authorization;

  if (bearer === undefined)
    return response.status(401).send("Bearer Token was not send");

  const token = bearer.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      environment.jwt.accessSecret
    ) as JwtPayload;

    response.locals.user = {
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
    };
    next();
  } catch {
    return response.status(401).send("Send Token is invalid");
  }
}
