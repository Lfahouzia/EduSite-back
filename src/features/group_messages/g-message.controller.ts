import { Request, Response } from "express";
import { GroupMessageService } from "./g-message.service";
import { HTTP_STATUS } from "../../shared/config/httpStatus";
import { getMissingFields } from "../../shared/utils/validators";

export class GroupMessageController {
  private service: GroupMessageService;

  constructor() {
    this.service = new GroupMessageService();
  }

  async create(req: Request, res: Response) {
    const requiredFields = ["topic", "course_id"];
    const missingFields = getMissingFields(req.body, requiredFields);
    if (missingFields.length > 0) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        error: "Missing required fields",
        missingFields,
      });
    }
    try {
      const groupMessage = await this.service.create(req.body);
      return res.status(HTTP_STATUS.CREATED).json(groupMessage);
    } catch (error) {
      return res
        .status(HTTP_STATUS.INTERNAL_ERROR)
        .json({ error: "Failed to create group message" });
    }
  }

  async list(_req: Request, res: Response) {
    const groupMessages = await this.service.list();
    return res.json({message:"Group Messages", data:groupMessages});
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const groupMessage = await this.service.getById(id);
    return groupMessage
      ? res.json(groupMessage)
      : res
          .status(HTTP_STATUS.NOT_FOUND)
          .json({ error: "Group message not found" });
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    if (id == undefined) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ error: "Invalid or missing ID parameter" });
    }

     const requiredFields = ["topic" ];
     const missingFields = getMissingFields(req.body, requiredFields);
     if (missingFields.length > 0) {
       return res.status(HTTP_STATUS.BAD_REQUEST).json({
         error: "Missing required fields",
         missingFields,
       });
     }
    const groupMessage = await this.service.update(id, req.body);
    return groupMessage
      ? res.json(groupMessage)
      : res
          .status(HTTP_STATUS.NOT_FOUND)
          .json({ error: "Group message not found" });
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const deleted = await this.service.delete(id);
    return deleted
      ? res.json({ message: "Group message deleted successfully" })
      : res
          .status(HTTP_STATUS.NOT_FOUND)
          .json({ error: "Group message not found" });
  }
}
