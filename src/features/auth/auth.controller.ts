import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { HTTP_STATUS } from "../../shared/config/httpStatus";
import { getMissingFields } from "../../shared/utils/validators";

const service = new AuthService();

export class AuthController {
  async register(req: Request, res: Response) {
    const data = req.body;
    const requiredFields = ["email", "password", "last_name", "first_name"];
    const missingFields = getMissingFields(data, requiredFields);
    if (missingFields.length > 0) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        error: "Missing required fields",
      });
    }
    try {
      const user = await service.register(req.body);
      res.status(HTTP_STATUS.CREATED).json(user);
    } catch (error: any) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ error: error.message });
    }
  }

  async login(req: Request, res: Response) {
    const data = req.body;
    const requiredFields = ["email", "password"];
    const missingFields = getMissingFields(data, requiredFields);
    if (missingFields.length > 0) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        error: "Missing required fields",
      });
    }
    try {
      const { email, password } = req.body;
      const result = await service.login(email, password);
      res.json(result);
    } catch (error: any) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: error.message });
    }
  }

  async getUsers(req: Request, res: Response) {
    const users = await service.getAllUsers();
    res.json(users);
  }

  async getUser(req: Request, res: Response) {
    if (!req.params.id) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        error: "User ID is required",
      });
    }
    const user = await service.getUser(req.params.id);
    if (!user) return res.status(HTTP_STATUS.NOT_FOUND).json({ error: "User not found" });
    res.json(user);
  }

  async updateUser(req: Request, res: Response) {
    if (!req.params.id) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        error: "User ID is required",
      });
    }
    const user = await service.updateUser(req.params.id, req.body);
    if (!user)
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ error: "User not found" });
    res.json(user);
  }

  //   async deleteUser(req: Request, res: Response) {
  //     const success = await service.deleteUser(req.params.id);
  //     if (!success) return res.status(HTTP_STATUS.NOT_FOUND).json({ error: "User not found" });
  //     res.json({ message: "User deleted" });
  //   }
}
