import { Request, Response } from "express";
import { RoleServiceProxy } from "./role.service";
import { HTTP_STATUS } from "../../shared/config/httpStatus";
import { getMissingFields } from "../../shared/utils/validators";

const service = new RoleServiceProxy();

export class RoleController {
  async create(req: Request, res: Response) {
    const data = req.body;
    const requiredFields = ["name", "description"];
    const missingFields = getMissingFields(data, requiredFields);

    if (missingFields.length > 0) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        error: "Missing required fields",
      });
    }

    try {
      const role = await service.create(req.body);
      res.status(HTTP_STATUS.CREATED).json(role);
    } catch (err: any) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ error: err.message });
    }
  }

  async findAll(_req: Request, res: Response) {
    const roles = await service.findAll();
    res.json({ data: roles, message: "Roles retrieved successfully" });
  }

  async update(req: Request, res: Response) {
    if (req.params.id === undefined) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        error: "Role ID is required",
      });
    }
    try {
      const role = await service.update(req.params.id, req.body);
      res.json(role);
    } catch (error: any) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    const success = await service.delete(req.params.id);
    res.json({ success });
  }

  // -------------------------
  // 🔹 Permissions <-> Roles
  // -------------------------
  async assignPermissionsBulk(req: Request, res: Response) {
    const requiredFields = ["role_id", "permission_ids"];
    const missingFields = getMissingFields(req.body, requiredFields);

    if (missingFields.length > 0) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        error: "Missing required fields",
      });
    }
    const { role_id, permission_ids } = req.body; // JSON { roleId, permissionIds: [] }
    try {
      await service.assignPermissions(role_id, permission_ids);
      res.json({
        message: "Permissions assigned in bulk",
        count: permission_ids.length,
      });
    } catch (error: any) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: error.message });
    }
  }

  async revokePermissionsBulk(req: Request, res: Response) {
    const requiredFields = ["role_id", "permission_ids"];
    const missingFields = getMissingFields(req.body, requiredFields);

    if (missingFields.length > 0) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        error: "Missing required fields",
      });
    }
    const { role_id, permission_ids } = req.body;
    try {
      await service.revokePermissions(role_id, permission_ids);
      res.json({
        message: "Permissions revoked in bulk",
        count: permission_ids.length,
      });
    } catch (error: any) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: error.message });
    }
  }

  // -------------------------
  // 🔹 Roles <-> Users
  // -------------------------
  async assignRolesToUserBulk(req: Request, res: Response) {
    const requiredFields = ["user_id", "roles"];
    const missingFields = getMissingFields(req.body, requiredFields);

    if (missingFields.length > 0) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        error: "Missing required fields",
      });
    }
    const { user_id, roles } = req.body; // JSON { userId, roleIds: [] }
    await service.assignRolesToUser(user_id, roles);
    res.json({
      message: "Roles assigned to user in bulk",
      count: roles.length,
    });
  }

  async revokeRolesFromUserBulk(req: Request, res: Response) {
    const requiredFields = ["user_id", "roles"];
    const missingFields = getMissingFields(req.body, requiredFields);

    if (missingFields.length > 0) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        error: "Missing required fields",
      });
    }
    const { user_id, roles } = req.body;
    await service.revokeRolesFromUser(user_id, roles);
    res.json({
      message: "Roles revoked from user in bulk",
      count: roles.length,
    });
  }
}
