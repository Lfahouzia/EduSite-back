import { Request, Response } from "express";
import { PermissionService } from "./permission.service";
import { getMissingFields } from "../../shared/utils/validators";
import { HTTP_STATUS } from "../../shared/config/httpStatus";

const service = new PermissionService();

export class PermissionController {
  async create(req: Request, res: Response) {
    const requiredFields = ["name", "description"];
    const missingFields = getMissingFields(req.body, requiredFields);

    if (missingFields.length > 0) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        error: "Missing required fields",
      });
    }
    try {
      const permission = await service.create(req.body);
      res.status(HTTP_STATUS.CREATED).json(permission);
    } catch (err: any) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ error: err.message });
    }
  }

  async findAll(_req: Request, res: Response) {
    const permissions = await service.findAll();
    res.json({
      data: permissions,
      message: "Permissions retrieved successfully",
    });
  }

  async findById(req: Request, res: Response) {
    if (req.params.id === undefined) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        error: "Permission ID is required",
      });
    }
    const permission = await service.findById(req.params.id);
    if (!permission) {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ error: "Permission not found" });
    }
    res.json(permission);
  }

  async update(req: Request, res: Response) {
    if (req.params.id === undefined) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        error: "Permission ID is required",
      });
    }
    try {
      const permission = await service.update(req.params.id, req.body);
      if (!permission) {
        return res
          .status(HTTP_STATUS.NOT_FOUND)
          .json({ error: "Permission not found" });
      }
      res.json(permission);
    } catch (err: any) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ error: err.message });
    }
  }

  async delete(req: Request, res: Response) {
    if (req.params.id === undefined) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        error: "Permission ID is required",
      });
    }
    const success = await service.delete(req.params.id);
    if (!success) {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ success: false });
    }
    res.json({ success });
  }
}
