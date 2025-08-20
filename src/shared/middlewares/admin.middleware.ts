import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../config/httpStatus";

export function adminMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = req.user;

  // Vérifie qu'un des rôles de l'utilisateur est "admin"
  const isAdmin = user?.roles?.some((r) => r.name === "admin");

  if (!user || !isAdmin) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      message: "Accès réservé uniquement aux administrateurs",
    });
  }

  next();
}
