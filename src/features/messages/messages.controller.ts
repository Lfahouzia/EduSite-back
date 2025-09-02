import { Request, Response } from "express";
import { MessageService } from "./messages.service";
import { HTTP_STATUS } from "../../shared/config/httpStatus";
import { getMissingFields } from "../../shared/utils/validators";

export class MessageController {
  private service: MessageService;

  constructor() {
    this.service = new MessageService();
  }

  async create(req: Request, res: Response) {
    const requiredFields = ["content", "receiver_id","group_message_id"];
    const missingFields = getMissingFields(req.body, requiredFields);
    if (missingFields.length > 0) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        error: "Missing required fields",
        missingFields,
      });
    }
    try {
      const sender_id = req.user?.id;
      req.body.sender_id = sender_id;
      if (!sender_id) {
        return res
          .status(HTTP_STATUS.UNAUTHORIZED)
          .json({ error: "User not authenticated" });
      }
      const message = await this.service.create(req.body);

      return res.status(HTTP_STATUS.CREATED).json(message);
    } catch (err) {
      return res
        .status(HTTP_STATUS.INTERNAL_ERROR)
        .json({ error: "Error creating message" });
    }
  }

  async list(_req: Request, res: Response) {
    const messages = await this.service.list();
    return res.json(messages);
  }

  async getById(req: Request, res: Response) {
    const message = await this.service.getById(req.params.id);
    return message
      ? res.json(message)
      : res.status(HTTP_STATUS.NOT_FOUND).json({ error: "Message not found" });
  }

  async update(req: Request, res: Response) {
    const message = await this.service.update(req.params.id, req.body);
    return message
      ? res.json(message)
      : res.status(HTTP_STATUS.NOT_FOUND).json({ error: "Message not found" });
  }

  async delete(req: Request, res: Response) {
    const deleted = await this.service.delete(req.params.id);
    return deleted
      ? res.json({ message: "Message deleted" })
      : res.status(HTTP_STATUS.NOT_FOUND).json({ error: "Message not found" });
  }
}
