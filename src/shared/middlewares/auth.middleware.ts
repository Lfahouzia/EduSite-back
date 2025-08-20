import { NextFunction, Request, Response } from "express";
import { config } from "../../environnement/env.config";
import { HTTP_STATUS, RESPONSE_MESSAGES } from "../config/httpStatus";
import jwt from "jsonwebtoken";

const JWT_SECRET = config.jwtSecret;

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;

  
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res
      .status(HTTP_STATUS.UNAUTHORIZED)
      .json({ message: RESPONSE_MESSAGES.UNAUTHORIZED });
    return;
  }
  const token = authHeader.split(" ")[1];


  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);

    req.user = {
      roles: decoded.roles,
      id: decoded.id,
    };
    next();
  } catch (err) {
    res
      .status(HTTP_STATUS.UNAUTHORIZED)
      .json({ message: RESPONSE_MESSAGES.UNAUTHORIZED });
  }
}
