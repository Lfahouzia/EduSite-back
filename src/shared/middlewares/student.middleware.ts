import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../config/httpStatus";

export function studentMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = req.user;

  // Vérifie qu'un des rôles de l'utilisateur est "admin"
  const isAdmin = user?.roles?.some((r) => r.name === "student");

  if (!user || !isAdmin) {
    return res.status(HTTP_STATUS.FORBIDDEN).json({
      message: "Accès réservé uniquement aux élèves",
    });
  }

  next();
}
